const Quotation = require('../models/Quotation');

exports.getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find({ user: req.user.id });
    res.json(quotations);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.downloadQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });

    const pdfBuffer = await generatePDF(quotation);  // Implement generatePDF in utils

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=invoice.pdf',
      'Content-Length': pdfBuffer.length
    });

    res.send(pdfBuffer);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};
