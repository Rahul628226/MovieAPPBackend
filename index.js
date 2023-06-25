const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Movie = require('./Models/Movie');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3500;
const uri = process.env.DB_CONNECT;

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Database connected');
    return client;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
};

const startServer = async () => {
  try {
    // Establish MongoDB connection
    const client = await connectToMongoDB();

    // Perform any additional setup or configuration

    // Serve static files
    app.use(express.static(path.join(__dirname, '/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, './build/index.html'));
    });

    // Start the server
    app.listen(PORT, () => {
      console.log('Server connected on port', PORT);
    });
  } catch (error) {
    console.error('Failed to start the server', error);
    process.exit(1);
  }
};

// Call the startServer function to initiate the server
startServer();

// Router
const MovieRouter = require('./Routes/Movie');
app.use('/', MovieRouter);
