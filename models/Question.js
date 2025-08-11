const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  section: {
    type: String,
    required: true,
    enum: ['reading-writing', 'math']
  },
  category: {
    type: String,
    required: true,
    // Reading & Writing: craft-structure, information-ideas, expression-ideas, standard-conventions
    // Math: algebra, advanced-math, geometry-trigonometry, problem-solving-data
  },
  subcategory: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  questionText: {
    type: String,
    required: true
  },
  passage: {
    type: String,
    default: ''
  },
  options: [{
    label: String,
    text: String
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  explanation: {
    basic: String,
    detailed: String,
    expert: String
  },
  concepts: [String],
  tags: [String],
  source: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Question', questionSchema);
