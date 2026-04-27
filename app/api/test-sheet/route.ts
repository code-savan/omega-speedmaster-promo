import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const webAppUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;

    if (!webAppUrl) {
      return NextResponse.json({
        success: false,
        error: 'GOOGLE_SHEETS_WEB_APP_URL not configured in .env.local'
      }, { status: 500 });
    }

    // Test the connection with a simple GET request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(webAppUrl, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `Apps Script returned HTTP ${response.status}`,
        url: webAppUrl.substring(0, 50) + '...'
      }, { status: 500 });
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Connection to Google Sheets is working',
      appsScriptResponse: result,
      urlConfigured: true
    });

  } catch (error: any) {
    console.error('Test connection error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to connect to Google Apps Script',
      details: error.name === 'AbortError' ? 'Request timed out (10s)' : error.name,
      troubleshooting: [
        '1. Make sure the Apps Script is deployed as a Web App',
        '2. Check that "Who has access" is set to "Anyone"',
        '3. Verify the URL in .env.local matches the Web App URL',
        '4. Ensure the script was authorized (click through permission dialogs)'
      ]
    }, { status: 500 });
  }
}
