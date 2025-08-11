const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const database = require('./utils/database');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/questions', require('./routes/questions'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/topics', require('./routes/topics'));
app.use('/api/practice', require('./routes/practice'));

// Serve static files from React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Initialize Database (MongoDB or Mock Data)
database.initialize().then((connected) => {
  if (connected) {
    console.log('✅ Database initialized successfully');
  } else {
    console.log('⚠️  Using mock data for development');
  }
}).catch(err => console.log('❌ Database initialization error:', err));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Database status: ${database.getStatus().type}`);
  console.log(`🤖 OpenAI API: ${process.env.OPENAI_API_KEY ? 'Configured' : 'Not configured'}`);
  console.log(`🎯 SAT Chatbot Academy ready!`);
});
