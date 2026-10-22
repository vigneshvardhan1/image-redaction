/**
 * Builds the two-page invoice sample used by the PDF redaction demo.
 * Run with `node scripts/make-pdf-sample.mjs`.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const output = join(process.cwd(), 'public', 'samples', 'invoice.pdf');
const ink = rgb(0.08, 0.08, 0.08);
const muted = rgb(0.42, 0.42, 0.42);
const faint = rgb(0.72, 0.72, 0.7);
const paper = rgb(0.99, 0.985, 0.97);
const accent = rgb(0.13, 0.2, 0.33);

const doc = await PDFDocument.create();
doc.setTitle('Northwind Studio — Invoice INV-2026-1042');
doc.setAuthor('Northwind Studio');
doc.setSubject('Sample invoice for the Redact PDF demo');
doc.setKeywords(['sample', 'invoice', 'redaction', 'pdf']);
doc.setCreator('Redact sample generator');

const helvetica = await doc.embedFont(StandardFonts.Helvetica);
const bold = await doc.embedFont(StandardFonts.HelveticaBold);
const mono = await doc.embedFont(StandardFonts.Courier);

const width = 595.28;
const height = 841.89;

function text(page, value, options) {
  page.drawText(value, {
    font: helvetica,
    size: 10,
    color: ink,
    ...options,
  });
}

function rule(page, y, color = faint) {
  page.drawRectangle({ x: 54, y, width: width - 108, height: 0.8, color });
}

// --- Page one: invoice ----------------------------------------------------
{
  const page = doc.addPage([width, height]);
  page.drawRectangle({ x: 0, y: 0, width, height, color: paper });
  page.drawRectangle({ x: 0, y: height - 8, width, height: 8, color: accent });

  text(page, 'NORTHWIND STUDIO', { x: 54, y: height - 72, size: 20, font: bold, color: accent });
  text(page, 'Brand systems and product design', { x: 54, y: height - 90, size: 9, color: muted });

  text(page, 'INVOICE', { x: width - 160, y: height - 70, size: 24, font: bold, color: ink });
  text(page, 'INV-2026-1042', { x: width - 160, y: height - 92, size: 10, font: mono, color: muted });

  rule(page, height - 118);

  text(page, 'BILLED TO', { x: 54, y: height - 148, size: 8, font: bold, color: muted });
  text(page, 'Meera Kapoor', { x: 54, y: height - 170, size: 12, font: bold });
  text(page, 'meera.kapoor@example.com', { x: 54, y: height - 188 });
  text(page, '+91 98200 41122', { x: 54, y: height - 204 });
  text(page, '88 Harbor Street, Apt 5C', { x: 54, y: height - 220, color: muted });
  text(page, 'Mumbai 400001, India', { x: 54, y: height - 236, color: muted });

  text(page, 'ISSUED', { x: width - 220, y: height - 148, size: 8, font: bold, color: muted });
  text(page, '12 October 2026', { x: width - 220, y: height - 170 });
  text(page, 'DUE', { x: width - 220, y: height - 196, size: 8, font: bold, color: muted });
  text(page, '11 November 2026', { x: width - 220, y: height - 218 });

  rule(page, height - 270);

  const rows = [
    ['Design system audit', '1', '2,400.00'],
    ['Component library, 14 screens', '1', '3,150.00'],
    ['Motion tokens and handoff', '1', '980.00'],
  ];

  text(page, 'DESCRIPTION', { x: 54, y: height - 292, size: 8, font: bold, color: muted });
  text(page, 'QTY', { x: width - 210, y: height - 292, size: 8, font: bold, color: muted });
  text(page, 'AMOUNT', { x: width - 130, y: height - 292, size: 8, font: bold, color: muted });

  let rowY = height - 320;
  for (const [label, qty, amount] of rows) {
    text(page, label, { x: 54, y: rowY, size: 11 });
    text(page, qty, { x: width - 198, y: rowY, size: 11 });
    text(page, amount, { x: width - 130, y: rowY, size: 11, font: mono });
    rowY -= 34;
    rule(page, rowY + 12, rgb(0.9, 0.9, 0.88));
  }

  text(page, 'Subtotal', { x: width - 210, y: rowY - 12, size: 10, color: muted });
  text(page, '6,530.00', { x: width - 130, y: rowY - 12, size: 10, font: mono });
  text(page, 'Tax (18%)', { x: width - 210, y: rowY - 32, size: 10, color: muted });
  text(page, '1,175.40', { x: width - 130, y: rowY - 32, size: 10, font: mono });
  text(page, 'Total due', { x: width - 210, y: rowY - 62, size: 12, font: bold });
  text(page, '7,705.40', { x: width - 130, y: rowY - 62, size: 12, font: bold, font: mono });
  page.drawRectangle({ x: width - 214, y: rowY - 76, width: 160, height: 0.8, color: ink });

  rule(page, rowY - 112, rgb(0.9, 0.9, 0.88));
  text(page, 'PAYMENT', { x: 54, y: rowY - 140, size: 8, font: bold, color: muted });
  text(page, 'Visa ending 4821  ·  Expiry 08/29', { x: 54, y: rowY - 162 });
  text(page, 'Paid in full on 12 October 2026', { x: 54, y: rowY - 178, color: muted });

  rule(page, rowY - 208, rgb(0.9, 0.9, 0.88));
  text(page, 'TAX ID', { x: 54, y: rowY - 236, size: 8, font: bold, color: muted });
  text(page, 'GSTIN 27AABCU9603R1ZX', { x: 54, y: rowY - 258, font: mono });
  text(page, 'SUPPORT', { x: width - 220, y: rowY - 236, size: 8, font: bold, color: muted });
  text(page, '+91 22 4000 8899', { x: width - 220, y: rowY - 258 });
  text(page, 'billing@northwind.example', { x: width - 220, y: rowY - 274, color: muted });

  text(page, 'Thank you for working with Northwind Studio.', {
    x: 54,
    y: 82,
    size: 9,
    color: muted,
  });
  text(page, 'Sample document — all names and numbers are fictional.', {
    x: 54,
    y: 66,
    size: 8,
    color: faint,
  });
}

// --- Page two: account statement -----------------------------------------
{
  const page = doc.addPage([width, height]);
  page.drawRectangle({ x: 0, y: 0, width, height, color: paper });
  page.drawRectangle({ x: 0, y: height - 8, width, height: 8, color: accent });

  text(page, 'NORTHWIND STUDIO', { x: 54, y: height - 72, size: 20, font: bold, color: accent });
  text(page, 'STATEMENT OF ACCOUNT', { x: width - 220, y: height - 70, size: 14, font: bold });
  text(page, 'October 2026', { x: width - 220, y: height - 88, size: 10, color: muted });

  rule(page, height - 118);

  text(page, 'ACCOUNT HOLDER', { x: 54, y: height - 148, size: 8, font: bold, color: muted });
  text(page, 'Meera Kapoor', { x: 54, y: height - 170, size: 12, font: bold });
  text(page, 'meera.kapoor@example.com', { x: 54, y: height - 188 });
  text(page, '+91 98200 41122', { x: 54, y: height - 204 });
  text(page, '88 Harbor Street, Apt 5C, Mumbai 400001', { x: 54, y: height - 220, color: muted });

  text(page, 'ACCOUNT DETAILS', { x: width - 240, y: height - 148, size: 8, font: bold, color: muted });
  text(page, 'IBAN  GB29 NWBK 6016 1331 9268 19', { x: width - 240, y: height - 170, size: 9, font: mono });
  text(page, 'SWIFT  NWBKGB2L', { x: width - 240, y: height - 186, size: 9, font: mono });
  text(page, 'Account  4091 8820 7742', { x: width - 240, y: height - 202, size: 9, font: mono });

  rule(page, height - 250);

  text(page, 'DATE', { x: 54, y: height - 274, size: 8, font: bold, color: muted });
  text(page, 'REFERENCE', { x: 150, y: height - 274, size: 8, font: bold, color: muted });
  text(page, 'DEBIT', { x: width - 220, y: height - 274, size: 8, font: bold, color: muted });
  text(page, 'CREDIT', { x: width - 130, y: height - 274, size: 8, font: bold, color: muted });

  const entries = [
    ['01 Oct 2026', 'Opening balance', '', '12,480.00'],
    ['04 Oct 2026', 'INV-2026-0981 settlement', '', '8,240.00'],
    ['09 Oct 2026', 'Cloud hosting', '1,284.50', ''],
    ['12 Oct 2026', 'INV-2026-1042 payment', '', '7,705.40'],
    ['17 Oct 2026', 'Contractor — R. Shah', '3,600.00', ''],
    ['21 Oct 2026', 'Office rent', '2,150.00', ''],
    ['28 Oct 2026', 'Card ending 4821', '684.20', ''],
  ];

  let y = height - 300;
  for (const [date, reference, debit, credit] of entries) {
    text(page, date, { x: 54, y, size: 9, color: muted });
    text(page, reference, { x: 150, y, size: 9 });
    if (debit) text(page, debit, { x: width - 220, y, size: 9, font: mono });
    if (credit) text(page, credit, { x: width - 130, y, size: 9, font: mono });
    y -= 26;
    rule(page, y + 9, rgb(0.92, 0.92, 0.9));
  }

  text(page, 'Closing balance', { x: width - 220, y: y - 18, size: 11, font: bold });
  text(page, '20,707.70', { x: width - 130, y: y - 18, size: 11, font: mono, font: bold });
  page.drawRectangle({ x: width - 224, y: y - 30, width: 170, height: 0.8, color: ink });

  text(page, 'Keep this statement for your records.', { x: 54, y: y - 70, size: 9, color: muted });
  text(page, 'Questions? support@northwind.example · +91 22 4000 8899', {
    x: 54,
    y: y - 88,
    size: 9,
    color: muted,
  });

  // A machine-readable strip, deliberately left as a redaction target.
  let x = 54;
  while (x < width - 54) {
    const barWidth = 1 + ((x * 7) % 4);
    page.drawRectangle({
      x,
      y: 92,
      width: barWidth,
      height: 42,
      color: ink,
    });
    x += barWidth + 2 + ((x * 3) % 3);
  }
  text(page, 'NW-409188207742-1026', { x: 54, y: 74, size: 8, font: mono, color: muted });
}

await mkdir(dirname(output), { recursive: true });
await writeFile(output, await doc.save());
console.log(`Wrote ${output}`);
