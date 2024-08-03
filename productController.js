const Quotation = require('../models/Quotation');
const generatePDF = require('../utils/generatePDF');

exports.addProducts = async (req, res) => {
    console.log('req.body-------->>',req.body);
  const { products } = req.body;
  try {
    const newQuotation = new Quotation({
      user: req.user.id,
      products,
      date: new Date()
    });

    await newQuotation.save();
    const pdfBuffer = await generatePDF(newQuotation);  // Implement generatePDF in utils

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=invoice.pdf',
      'Content-Length': pdfBuffer.length
    });

    res.send(pdfBuffer);
  } catch (e) {
    console.log('e-------->>',e);
    res.status(500).json({ message: 'Server error' });
  }
};
