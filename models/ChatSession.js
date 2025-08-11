const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  questionId: {
    type: String,
    required: true
  },
  userAnswer: String,
  correctAnswer: String,
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    explanationLevel: {
      type: String,
      enum: ['basic', 'detailed', 'expert', 'custom']
    }
  }],
  context: {
    section: String,
    category: String,
    concepts: [String],
    userConfusion: [String],
    alternativeApproaches: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ChatSession', chatSessionSchema);
