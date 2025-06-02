require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const Pet = require('./models/Pet'); // Correct import for the backend model

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/petAdoption')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Multer Setup for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
// GET /pets - Fetch all pets
app.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

// POST /pets - Add a new pet
app.post('/pets', upload.single('picture'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { name, type, age, area, justification, email, phone } = req.body;
    const picture = req.file ? req.file.filename : null;

    const pet = new Pet({ name, type, age, area, justification, email, phone, picture });
    const savedPet = await pet.save();

    console.log('Saved Pet:', savedPet); // Log the saved pet
    res.status(201).json({ message: 'Pet added successfully', pet: savedPet });
  } catch (err) {
    console.error('Error adding pet:', err);
    res.status(500).json({ error: 'Failed to add pet' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});