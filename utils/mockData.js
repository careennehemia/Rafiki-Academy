// Mock data store for development without MongoDB
const sampleQuestions = require('../data/sampleQuestions');

class MockDataStore {
  constructor() {
    this.questions = sampleQuestions;
    this.chatSessions = new Map();
  }

  // Question methods
  async findQuestions(filter = {}, options = {}) {
    let filtered = this.questions;
    
    if (filter.section) {
      filtered = filtered.filter(q => q.section === filter.section);
    }
    if (filter.category) {
      filtered = filtered.filter(q => q.category === filter.category);
    }
    if (filter.difficulty) {
      filtered = filtered.filter(q => q.difficulty === filter.difficulty);
    }

    const limit = options.limit || 20;
    const page = options.page || 1;
    const skip = (page - 1) * limit;

    return {
      questions: filtered.slice(skip, skip + limit),
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
      currentPage: page
    };
  }

  async findQuestionById(id) {
    return this.questions.find(q => q.id === id) || null;
  }

  async createQuestion(questionData) {
    // Check if question already exists
    const existingQuestion = this.questions.find(q => q.id === questionData.id);
    if (existingQuestion) {
      throw new Error(`Question with id ${questionData.id} already exists`);
    }
    
    // Add the question to the array
    this.questions.push(questionData);
    return questionData;
  }

  async getRandomQuestions(filter = {}, count = 10) {
    let filtered = this.questions;
    
    if (filter.section) {
      filtered = filtered.filter(q => q.section === filter.section);
    }
    if (filter.category) {
      filtered = filtered.filter(q => q.category === filter.category);
    }
    if (filter.difficulty) {
      filtered = filtered.filter(q => q.difficulty === filter.difficulty);
    }

    // Shuffle and take count
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Chat session methods
  async createChatSession(sessionData) {
    this.chatSessions.set(sessionData.sessionId, {
      ...sessionData,
      messages: sessionData.messages || [],
      createdAt: new Date(),
      lastActivity: new Date()
    });
    return this.chatSessions.get(sessionData.sessionId);
  }

  async findChatSession(sessionId) {
    return this.chatSessions.get(sessionId);
  }

  async updateChatSession(sessionId, updates) {
    const session = this.chatSessions.get(sessionId);
    if (session) {
      Object.assign(session, updates, { lastActivity: new Date() });
      return session;
    }
    return null;
  }

  async addMessageToSession(sessionId, message) {
    const session = this.chatSessions.get(sessionId);
    if (session) {
      session.messages.push({
        ...message,
        timestamp: new Date()
      });
      session.lastActivity = new Date();
      return session;
    }
    return null;
  }
}

module.exports = new MockDataStore();
