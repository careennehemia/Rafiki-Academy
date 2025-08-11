// Database adapter that can switch between MongoDB and mock data
const mongoose = require('mongoose');
const Question = require('../models/Question');
const ChatSession = require('../models/ChatSession');
const mockData = require('./mockData');

class DatabaseAdapter {
  constructor() {
    this.isConnected = false;
    this.useMockData = true;
  }

  async initialize() {
    try {
      // Try to connect to MongoDB
      const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sat-academy';
      
      if (mongoURI.includes('mongodb+srv://') || mongoURI.includes('mongodb://')) {
        await mongoose.connect(mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        
        this.isConnected = true;
        this.useMockData = false;
        console.log('✅ Connected to MongoDB - Using database');
        
        // Seed database if empty
        const questionCount = await Question.countDocuments();
        if (questionCount === 0) {
          const sampleQuestions = require('../data/sampleQuestions');
          await Question.insertMany(sampleQuestions);
          console.log(`✅ Seeded database with ${sampleQuestions.length} questions`);
        }
        
        return true;
      }
    } catch (error) {
      console.log('⚠️  MongoDB connection failed, using mock data:', error.message);
      this.isConnected = false;
      this.useMockData = true;
    }
    
    return false;
  }

  // Question methods
  async findQuestions(filter = {}, options = {}) {
    if (this.useMockData) {
      return await mockData.findQuestions(filter, options);
    }

    const limit = parseInt(options.limit) || 20;
    const page = parseInt(options.page) || 1;
    const skip = (page - 1) * limit;

    const mongoFilter = {};
    if (filter.section) mongoFilter.section = filter.section;
    if (filter.category) mongoFilter.category = filter.category;
    if (filter.difficulty) mongoFilter.difficulty = filter.difficulty;

    const questions = await Question.find(mongoFilter)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Question.countDocuments(mongoFilter);

    return {
      questions,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  async findQuestionById(id) {
    if (this.useMockData) {
      return await mockData.findQuestionById(id);
    }

    try {
      const Question = require('../models/Question');
      return await Question.findOne({ id });
    } catch (error) {
      console.error('Database findQuestionById error:', error);
      throw error;
    }
  }

  async createQuestion(questionData) {
    if (this.useMockData) {
      return await mockData.createQuestion(questionData);
    }

    try {
      const Question = require('../models/Question');
      const question = new Question(questionData);
      return await question.save();
    } catch (error) {
      console.error('Database createQuestion error:', error);
      throw error;
    }
  }

  async getRandomQuestions(filter = {}, count = 10) {
    if (this.useMockData) {
      return await mockData.getRandomQuestions(filter, count);
    }

    const mongoFilter = {};
    if (filter.section) mongoFilter.section = filter.section;
    if (filter.category) mongoFilter.category = filter.category;
    if (filter.difficulty) mongoFilter.difficulty = filter.difficulty;

    return await Question.aggregate([
      { $match: mongoFilter },
      { $sample: { size: count } }
    ]);
  }

  // Chat session methods
  async createChatSession(sessionData) {
    if (this.useMockData) {
      return await mockData.createChatSession(sessionData);
    }

    const chatSession = new ChatSession(sessionData);
    await chatSession.save();
    return chatSession;
  }

  async findChatSession(sessionId) {
    if (this.useMockData) {
      return await mockData.findChatSession(sessionId);
    }
    return await ChatSession.findOne({ sessionId });
  }

  async addMessageToSession(sessionId, message) {
    if (this.useMockData) {
      return await mockData.addMessageToSession(sessionId, message);
    }

    const session = await ChatSession.findOne({ sessionId });
    if (session) {
      session.messages.push({
        ...message,
        timestamp: new Date()
      });
      session.lastActivity = new Date();
      await session.save();
      return session;
    }
    return null;
  }

  getStatus() {
    return {
      connected: this.isConnected,
      usingMockData: this.useMockData,
      type: this.useMockData ? 'Mock Data' : 'MongoDB'
    };
  }
}

// Create singleton instance
const database = new DatabaseAdapter();

module.exports = database;
