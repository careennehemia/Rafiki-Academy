const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Generate practice test
router.post('/generate', async (req, res) => {
  try {
    const { 
      sections = ['reading-writing', 'math'],
      difficulty = 'mixed',
      categories = [],
      questionCount = 20
    } = req.body;

    let filter = {};
    
    if (sections.length > 0) {
      filter.section = { $in: sections };
    }
    
    if (categories.length > 0) {
      filter.category = { $in: categories };
    }
    
    if (difficulty !== 'mixed') {
      filter.difficulty = difficulty;
    }

    // Get questions with proper distribution
    const questions = await Question.aggregate([
      { $match: filter },
      { $sample: { size: questionCount } }
    ]);

    // Create practice test session
    const testId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    res.json({
      testId,
      questions: questions.map(q => ({
        id: q.id,
        section: q.section,
        category: q.category,
        difficulty: q.difficulty,
        questionText: q.questionText,
        passage: q.passage,
        options: q.options,
        concepts: q.concepts
      })),
      metadata: {
        totalQuestions: questions.length,
        sections: [...new Set(questions.map(q => q.section))],
        categories: [...new Set(questions.map(q => q.category))],
        difficulties: [...new Set(questions.map(q => q.difficulty))]
      }
    });

  } catch (error) {
    console.error('Generate practice test error:', error);
    res.status(500).json({ error: 'Failed to generate practice test' });
  }
});

// Submit practice test results
router.post('/submit', async (req, res) => {
  try {
    const { testId, answers } = req.body;
    
    // Get correct answers for submitted questions
    const questionIds = Object.keys(answers);
    const questions = await Question.find({ id: { $in: questionIds } });
    
    const results = {
      testId,
      totalQuestions: questions.length,
      correctAnswers: 0,
      incorrectAnswers: 0,
      score: 0,
      breakdown: {
        'reading-writing': { correct: 0, total: 0 },
        'math': { correct: 0, total: 0 }
      },
      categoryBreakdown: {},
      detailedResults: []
    };

    questions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        results.correctAnswers++;
        results.breakdown[question.section].correct++;
      } else {
        results.incorrectAnswers++;
      }
      
      results.breakdown[question.section].total++;
      
      // Category breakdown
      if (!results.categoryBreakdown[question.category]) {
        results.categoryBreakdown[question.category] = { correct: 0, total: 0 };
      }
      results.categoryBreakdown[question.category].total++;
      if (isCorrect) {
        results.categoryBreakdown[question.category].correct++;
      }
      
      results.detailedResults.push({
        questionId: question.id,
        section: question.section,
        category: question.category,
        difficulty: question.difficulty,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        concepts: question.concepts,
        basicExplanation: question.explanation.basic
      });
    });

    results.score = Math.round((results.correctAnswers / results.totalQuestions) * 100);

    res.json(results);

  } catch (error) {
    console.error('Submit practice test error:', error);
    res.status(500).json({ error: 'Failed to submit practice test' });
  }
});

// Get practice test recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const { weakCategories = [], targetScore = 1400 } = req.query;
    
    const recommendations = {
      focusAreas: [],
      suggestedPractice: [],
      studyPlan: []
    };

    // Focus on weak categories
    if (weakCategories.length > 0) {
      const categories = weakCategories.split(',');
      
      for (const category of categories) {
        const questionCount = await Question.countDocuments({ category });
        
        recommendations.focusAreas.push({
          category,
          availableQuestions: questionCount,
          priority: 'high'
        });
        
        recommendations.suggestedPractice.push({
          type: 'targeted',
          category,
          questionCount: Math.min(20, questionCount),
          description: `Focus practice on ${category.replace('-', ' ')} questions`
        });
      }
    }

    // General study plan based on target score
    if (targetScore >= 1500) {
      recommendations.studyPlan.push({
        phase: 'Advanced Practice',
        duration: '2-4 weeks',
        focus: 'Hard difficulty questions, timing practice',
        dailyQuestions: 25
      });
    } else if (targetScore >= 1300) {
      recommendations.studyPlan.push({
        phase: 'Intermediate Practice', 
        duration: '4-6 weeks',
        focus: 'Medium to hard questions, concept reinforcement',
        dailyQuestions: 20
      });
    } else {
      recommendations.studyPlan.push({
        phase: 'Foundation Building',
        duration: '6-8 weeks', 
        focus: 'Easy to medium questions, basic concepts',
        dailyQuestions: 15
      });
    }

    res.json(recommendations);

  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

module.exports = router;
