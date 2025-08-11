const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const ChatSession = require('../models/ChatSession');
const Question = require('../models/Question');
const mockData = require('../utils/mockData');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Start a new chat session for a question
router.post('/start', async (req, res) => {
  try {
    const { questionId, userAnswer } = req.body;
    
    const question = await mockData.findQuestionById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const sessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const chatSession = await mockData.createChatSession({
      sessionId,
      questionId,
      userAnswer,
      correctAnswer: question.correctAnswer,
      context: {
        section: question.section,
        category: question.category,
        concepts: question.concepts
      }
    });

    // Initial response based on whether answer was correct
    const isCorrect = userAnswer === question.correctAnswer;
    let initialMessage;

    if (isCorrect) {
      initialMessage = {
        role: 'assistant',
        content: `Great job! You got it right. The correct answer is ${question.correctAnswer}. ${question.explanation.basic}`,
        explanationLevel: 'basic'
      };
    } else {
      initialMessage = {
        role: 'assistant',
        content: `Not quite right. The correct answer is ${question.correctAnswer}. ${question.explanation.basic}\n\nWould you like me to explain this in more detail?`,
        explanationLevel: 'basic'
      };
    }

    await mockData.addMessageToSession(sessionId, initialMessage);

    res.json({
      sessionId,
      isCorrect,
      message: initialMessage,
      question: {
        text: question.questionText,
        options: question.options,
        correctAnswer: question.correctAnswer
      }
    });

  } catch (error) {
    console.error('Chat start error:', error);
    res.status(500).json({ error: 'Failed to start chat session' });
  }
});

// Continue chat conversation
router.post('/message', async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    const chatSession = await ChatSession.findOne({ sessionId });
    if (!chatSession) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    const question = await Question.findOne({ id: chatSession.questionId });
    
    // Add user message
    await mockData.addMessageToSession(sessionId, {
      role: 'user',
      content: message
    });

    // Generate AI response using OpenAI
    const systemPrompt = `You are an expert SAT tutor helping a student understand a ${question.section} question. 

Question: ${question.questionText}
Correct Answer: ${question.correctAnswer}
Student's Answer: ${chatSession.userAnswer}
Category: ${question.category}
Concepts: ${question.concepts.join(', ')}

The student is asking for help understanding this question. Provide clear, educational explanations that help them learn the underlying concepts. You can:
1. Explain why their answer was wrong (if applicable)
2. Break down the correct solution step by step
3. Explain alternative approaches
4. Clarify confusing concepts
5. Provide similar examples

Be conversational and encouraging. Adapt your explanation level based on their questions.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatSession.messages.slice(-10).map(msg => ({ // Last 10 messages for context
        role: msg.role,
        content: msg.content
      }))
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    });

    const aiResponse = {
      role: 'assistant',
      content: completion.choices[0].message.content,
      explanationLevel: 'custom'
    };

    await mockData.addMessageToSession(sessionId, aiResponse);

    res.json({
      message: aiResponse,
      sessionId
    });

  } catch (error) {
    console.error('Chat message error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Get chat history
router.get('/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const chatSession = await ChatSession.findOne({ sessionId });
    if (!chatSession) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    res.json({
      messages: chatSession.messages,
      context: chatSession.context
    });

  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({ error: 'Failed to get chat history' });
  }
});

// Request specific explanation level
router.post('/explain', async (req, res) => {
  try {
    const { sessionId, level } = req.body; // level: 'basic', 'detailed', 'expert'

    const chatSession = await ChatSession.findOne({ sessionId });
    if (!chatSession) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    const question = await Question.findOne({ id: chatSession.questionId });
    let explanation;

    switch (level) {
      case 'detailed':
        explanation = question.explanation.detailed || question.explanation.basic;
        break;
      case 'expert':
        explanation = question.explanation.expert || question.explanation.detailed || question.explanation.basic;
        break;
      default:
        explanation = question.explanation.basic;
    }

    const responseMessage = {
      role: 'assistant',
      content: explanation,
      explanationLevel: level
    };

    await mockData.addMessageToSession(sessionId, responseMessage);

    res.json({
      message: responseMessage,
      level
    });

  } catch (error) {
    console.error('Explanation error:', error);
    res.status(500).json({ error: 'Failed to get explanation' });
  }
});

module.exports = router;
