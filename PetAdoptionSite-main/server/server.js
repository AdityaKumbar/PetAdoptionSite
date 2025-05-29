require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const petRouter = require('./Routes/PetRoute');
const AdoptFormRoute = require('./Routes/AdoptFormRoute');
const AdminRoute = require('./Routes/AdminRoute');
const authRouter = require('./Routes/auth');

const app = express();

app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(petRouter); // Register all pet routes at root
app.use('/form', AdoptFormRoute);
app.use('/admin', AdminRoute);
app.use('/auth', authRouter);

const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to DB');
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});