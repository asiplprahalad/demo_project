const puppeteer = require('puppeteer');

async function testPuppeteer() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();
  require('fs').writeFileSync('test.pdf', pdfBuffer);
  console.log('PDF generated successfully');
}

testPuppeteer().catch(console.error);
