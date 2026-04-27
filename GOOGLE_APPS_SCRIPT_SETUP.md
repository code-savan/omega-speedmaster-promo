# Google Apps Script Setup (Simple Method)

No Google Cloud Console needed. Just copy-paste a script into your sheet.

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.new) and create a new spreadsheet
2. Add these headers in row 1:
   ```
   Timestamp | Full Name | Phone | Email | Color | Address
   ```
3. **Important**: Go to File → Share → Share with anyone (with the link) → Set to "Editor"

## Step 2: Add the Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any code in the editor
3. Copy-paste this entire script:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add the data to the next row
    sheet.appendRow([
      new Date(),           // Timestamp
      data.fullName,        // Full Name
      data.phone,           // Phone
      data.email || '',     // Email (optional)
      data.color,           // Color
      data.address          // Address
    ]);
    
    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Order API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ and select **Web app**
3. Fill in the form:
   - **Description**: `Order Form API`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. Authorize the script (click through the permissions)
6. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/xxxxx/exec`)

## Step 4: Add URL to Your Project

1. Open `.env.local` in your project
2. Add the Web App URL:
   ```
   GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

## Step 5: Restart Dev Server

```bash
npm run dev
```

That's it! Orders will now save to your Google Sheet automatically.

---

## Troubleshooting

**"You do not have permission to call..."**
- Make sure you authorized the script (Step 3, click through all permission dialogs)

**Sheet not updating**
- Check that the sheet is shared publicly (or at least accessible by the script owner)
- Make sure headers are in row 1

**Need to update the script?**
- Make changes in the Apps Script editor
- Click **Deploy** → **Manage deployments** → **Edit** (pencil icon) → **New version** → **Deploy**
