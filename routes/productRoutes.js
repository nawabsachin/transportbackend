// const express = require('express');
// const multer = require('multer');
// const Product = require('../models/Product');
// const auth = require('../middleware/prouctauthMiddleware');

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });
// const upload = multer({ storage });

// router.post('/', auth, upload.single('image'), async (req, res) => {
//   try {
//     const { name, price, description } = req.body;
//     const image = req.file?.filename;

//     if (!name || !price || !description) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const product = new Product({ name, price, description, image });
//     await product.save();

//     res.status(201).json(product);
//   } catch (err) {
//     console.error('Error saving product:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.put('/:id', auth, upload.single('image'), async (req, res) => {
//   try {
//     const { name, price, description } = req.body;
//     const image = req.file?.filename;

//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       { name, price, description, ...(image && { image }) },
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     console.error('Error updating product:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.delete('/:id', auth, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(204).send();
//   } catch (err) {
//     console.error('Error deleting product:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const Product = require('../models/Product');
const { authenticateToken, authenticateAdmin } = require('../middleware/authenticateToken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

const router = express.Router();

// Protected Routes for Admin Only
router.post('/', authenticateToken, authenticateAdmin, upload.single('image'), async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newProduct = new Product({ name, price, description, image });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// Update Product
router.put('/:id', authenticateToken, authenticateAdmin, upload.single('image'), async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, ...(image && { image }) },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// Delete Product
router.delete('/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
