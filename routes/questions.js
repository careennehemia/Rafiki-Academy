const express = require('express');
const router = express.Router();
const database = require('../utils/database');

// Get all questions with filtering
router.get('/', async (req, res) => {
  try {
    const { section, category, difficulty, limit = 20, page = 1 } = req.query;
    
    const filter = {};
    if (section) filter.section = section;
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const result = await database.findQuestions(filter, { limit: parseInt(limit), page: parseInt(page) });

    res.json(result);

  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Get single question by ID
router.get('/:id', async (req, res) => {
  try {
    const question = await database.findQuestionById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(question);

  } catch (error) {
    console.error('Get question error:', error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

// Submit answer and get initial feedback
router.post('/:id/answer', async (req, res) => {
  try {
    const { answer } = req.body;
    const question = await database.findQuestionById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const isCorrect = answer === question.correctAnswer;
    
    res.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      userAnswer: answer,
      basicExplanation: question.explanation.basic,
      questionId: question.id
    });

  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

// Get random questions for practice
router.get('/practice/random', async (req, res) => {
  try {
    const { section, category, difficulty, count = 10 } = req.query;
    
    const filter = {};
    if (section) filter.section = section;
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await database.getRandomQuestions(filter, parseInt(count));

    res.json(questions);

  } catch (error) {
    console.error('Random questions error:', error);
    res.status(500).json({ error: 'Failed to fetch random questions' });
  }
});

module.exports = router;
