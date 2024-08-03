 const puppeteer = require('puppeteer');

async function generatePDF(quotation) {
    console.log(quotation)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const content = `
    <html>
      <body>
        <h2>Products</h2>
        <ul>
          ${quotation.products.map(p => `<li>${p.name} - ${p.qty} x ${p.rate}</li>`).join('')}
        </ul>
      </body>
    </html>
  `;

  await page.setContent(content);
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdfBuffer;
}

module.exports = generatePDF;
