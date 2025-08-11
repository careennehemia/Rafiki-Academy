const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const database = require('../utils/database');

async function processPDF(pdfPath) {
  try {
    console.log('Reading PDF file:', pdfPath);
    
    // Read the PDF file
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    
    console.log('PDF Pages:', data.numpages);
    console.log('PDF Text Length:', data.text.length);
    
    // Extract questions from the text
    const questions = extractQuestions(data.text);
    
    console.log(`Extracted ${questions.length} questions from PDF`);
    
    // Initialize database
    await database.initialize();
    
    // Save questions to database
    let savedCount = 0;
    for (const question of questions) {
      try {
        await database.createQuestion(question);
        savedCount++;
        console.log(`Saved question ${savedCount}/${questions.length}: ${question.id}`);
      } catch (error) {
        console.error(`Error saving question ${question.id}:`, error.message);
      }
    }
    
    console.log(`\n✅ Successfully processed PDF!`);
    console.log(`📊 Total questions extracted: ${questions.length}`);
    console.log(`💾 Questions saved to database: ${savedCount}`);
    
    return { total: questions.length, saved: savedCount, questions };
    
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
}

function extractQuestions(text) {
  const questions = [];
  let questionCounter = 1;
  
  // Split text into lines and clean up
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  console.log('Processing', lines.length, 'lines of text...');
  
  // Look for question patterns
  let currentQuestion = null;
  let currentOptions = [];
  let isInQuestion = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect question start (usually starts with a number or question text)
    if (isQuestionStart(line)) {
      // Save previous question if exists
      if (currentQuestion && currentOptions.length >= 4) {
        questions.push(createQuestionObject(currentQuestion, currentOptions, questionCounter));
        questionCounter++;
      }
      
      // Start new question
      currentQuestion = cleanQuestionText(line);
      currentOptions = [];
      isInQuestion = true;
      continue;
    }
    
    // Detect answer options (A), (B), (C), (D) or A), B), C), D)
    if (isInQuestion && isAnswerOption(line)) {
      currentOptions.push(cleanOptionText(line));
      continue;
    }
    
    // Continue building question text if we're in a question
    if (isInQuestion && currentQuestion && !isAnswerOption(line) && !isQuestionStart(line)) {
      // Add to question text if it seems like part of the question
      if (line.length > 10 && !line.match(/^(Answer|Explanation|Correct)/i)) {
        currentQuestion += ' ' + line;
      }
    }
  }
  
  // Don't forget the last question
  if (currentQuestion && currentOptions.length >= 4) {
    questions.push(createQuestionObject(currentQuestion, currentOptions, questionCounter));
  }
  
  return questions;
}

function isQuestionStart(line) {
  // Look for patterns that indicate a new question
  return (
    /^\d+\./.test(line) || // Starts with number and period
    /^Question \d+/i.test(line) || // Starts with "Question"
    /Which of the following/i.test(line) || // Common SAT question starter
    /The passage suggests/i.test(line) || // Reading comprehension starter
    /According to the passage/i.test(line) || // Reading comprehension starter
    /What is the main/i.test(line) || // Main idea question
    /The author's purpose/i.test(line) // Author purpose question
  );
}

function isAnswerOption(line) {
  // Look for answer option patterns
  return (
    /^[A-D]\)/.test(line) || // A), B), C), D)
    /^\([A-D]\)/.test(line) || // (A), (B), (C), (D)
    /^[A-D]\./.test(line) || // A., B., C., D.
    /^\([A-D]\s/.test(line) // (A something
  );
}

function cleanQuestionText(text) {
  // Remove question numbers and clean up
  return text
    .replace(/^\d+\.\s*/, '') // Remove leading numbers
    .replace(/^Question \d+:?\s*/i, '') // Remove "Question X:"
    .trim();
}

function cleanOptionText(text) {
  // Extract just the option text, removing the letter prefix
  return text
    .replace(/^[A-D]\)\s*/, '') // Remove A), B), etc.
    .replace(/^\([A-D]\)\s*/, '') // Remove (A), (B), etc.
    .replace(/^[A-D]\.\s*/, '') // Remove A., B., etc.
    .replace(/^\([A-D]\s*/, '') // Remove (A, (B, etc.
    .trim();
}

function createQuestionObject(questionText, options, questionNumber) {
  // Generate a unique ID
  const id = `info_ideas_${String(questionNumber).padStart(3, '0')}`;
  
  // Create options array with proper format
  const formattedOptions = options.slice(0, 4).map((text, index) => ({
    letter: String.fromCharCode(65 + index), // A, B, C, D
    text: text
  }));
  
  // For now, assume A is correct (we'll need to enhance this)
  const correctAnswer = 'A';
  
  return {
    id,
    section: 'reading-writing',
    category: 'information-ideas',
    subcategory: 'main-ideas',
    difficulty: 'easy', // Based on filename "EASY"
    questionText: questionText,
    passage: '', // Will be empty for now, can be enhanced
    options: formattedOptions,
    correctAnswer,
    explanation: {
      basic: `The correct answer is ${correctAnswer}. This question tests your understanding of main ideas and information analysis.`,
      detailed: `This question requires you to identify the main idea or key information from the passage. Look for the central theme or primary message being conveyed.`,
      expert: `This is an Information and Ideas question that tests reading comprehension. Focus on identifying the author's main argument, supporting evidence, and logical structure of the text.`
    },
    concepts: ['main ideas', 'reading comprehension', 'information analysis'],
    tags: ['information-ideas', 'reading-writing', 'easy'],
    source: 'INFO AND IDEAS EASY PDF'
  };
}

// Run the script if called directly
if (require.main === module) {
  const pdfPath = process.argv[2] || path.join(__dirname, '../client/public/INFO AND IDEAS EASY.pdf');
  
  processPDF(pdfPath)
    .then(result => {
      console.log('\n🎉 PDF processing complete!');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ PDF processing failed:', error);
      process.exit(1);
    });
}

module.exports = { processPDF };
