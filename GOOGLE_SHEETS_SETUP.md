# Google Sheets Setup Guide

## Step 1: Get Your Google Sheet ID

1. Open your Google Sheet in the browser
2. Copy the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
3. The `SHEET_ID` is the long string between `/d/` and `/edit`
4. Add this to `.env.local` as `GOOGLE_SHEET_ID`

## Step 2: Create a Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create a Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Give it a name (e.g., "omega-speedmaster-orders")
   - Click "Create and Continue"
   - Skip optional steps, click "Done"

5. Generate a Key:
   - Click on your new service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create New Key"
   - Choose "JSON" format
   - Download the JSON file

6. Share Your Google Sheet:
   - Open your Google Sheet
   - Click "Share" button
   - Add the service account email (from the JSON file, looks like: `xxx@xxx.iam.gserviceaccount.com`)
   - Give "Editor" permissions

## Step 3: Encode the Service Account

Run this command in your terminal to encode the JSON file:

```bash
base64 -w 0 path/to/downloaded-service-account.json
```

Or on macOS:
```bash
base64 -i path/to/downloaded-service-account.json | tr -d '\n'
```

Copy the output and add it to `.env.local` as `GOOGLE_SERVICE_ACCOUNT_BASE64`

## Step 4: Add Headers to Your Sheet

Add these headers in row 1 of your Google Sheet:
```
Timestamp | Full Name | Phone | Email | Color | Address
```

## Step 5: Restart Your Dev Server

```bash
npm run dev
```

Your orders will now be saved to Google Sheets when the form is submitted!
