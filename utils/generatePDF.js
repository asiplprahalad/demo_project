const puppeteer = require('puppeteer');

async function generatePDF(quotation) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const content = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 80%;
            margin: auto;
          }
          h1, h2 {
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px 12px;
            border: 1px solid #ddd;
            text-align: center;
          }
          th {
            background-color: #f4f4f4;
          }
          .total-row {
            font-weight: bold;
          }
          .gst {
            font-size: 1.2em;
          }
          .grand-total {
            font-size: 1.5em;
            color: #007bff;
          }
          .footer {
            text-align: right;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Invoice</h1>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${quotation.products.map(product => `
                <tr>
                  <td>${product.name}</td>
                  <td>${product.qty}</td>
                  <td>${product.rate}</td>
                  <td>INR ${(product.qty * product.rate).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="footer">
            <p>Total: INR ${quotation.products.reduce((total, product) => total + (product.qty * product.rate), 0).toFixed(2)}</p>
            <p class="gst">GST: 18%</p>
            <p class="grand-total">Grand Total: INR ${(quotation.products.reduce((total, product) => total + (product.qty * product.rate), 0) * 1.18).toFixed(2)}</p>
            <p>Valid until: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(content);
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdfBuffer;
}

module.exports = generatePDF;
