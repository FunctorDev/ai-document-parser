# AI Document Parser

Automate invoice and document processing with AI. Effortlessly extract structured data from PDF invoices—no templates or manual data entry required.

## Features

- **No Templates Needed:** Instantly parse invoices and extract data without predefining layouts.
- **Structured Output:** Returns standardized JSON, regardless of invoice format.
- **Fast & Accurate:** AI-powered extraction delivers quick, error-free results.
- **Flexible Input:** Upload files or provide URLs for remote documents.
- **Detailed Output:** Extracts vendor, customer, invoice details, payment info, line items, and more.

## How It Works

1. **Upload or Link a Document:** Supports PDF uploads and remote URLs.
2. **AI Extraction:** The parser automatically detects and extracts key data fields.
3. **Get Results:** Receive structured JSON output for easy integration with your workflows.

## Example API Response

```json
{
  "status": "ok",
  "body": {
    "vendor": { "name": "...", "address": "...", ... },
    "customer": { "billTo": {...}, "shipTo": {...}, ... },
    "invoice": { "invoiceNo": "...", "invoiceDate": "...", ... },
    "paymentDetails": { "total": "...", "bankingInformation": {...}, ... },
    "others": { "notes": "..." },
    "lineItems": [ { "description": "...", "quantity": 1, "price": 100 } ]
  }
}
```