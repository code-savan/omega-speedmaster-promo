import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, email, color, address } = body;

    // Validate required fields
    if (!fullName || !phone || !color || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the Google Apps Script Web App URL
    const webAppUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;

    if (!webAppUrl) {
      console.error('Missing GOOGLE_SHEETS_WEB_APP_URL in environment');
      // Still return success to user, but log error for admin
      return NextResponse.json({
        success: true,
        warning: 'Sheet URL not configured - order not saved to sheet'
      });
    }

    // Send data to Google Apps Script with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        phone,
        email: email || '',
        color,
        address,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Apps Script returned ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Unknown error from Apps Script');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    // Return success to user even if sheet fails, so WhatsApp still opens
    return NextResponse.json({
      success: true,
      warning: 'Order saved but sheet backup failed'
    });
  }
}
