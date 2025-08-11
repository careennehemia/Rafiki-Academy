const mongoose = require('mongoose');
const Question = require('../models/Question');
const sampleQuestions = require('../data/sampleQuestions');
require('dotenv').config();

const setupMongoDB = async () => {
  try {
    console.log('🔧 Setting up MongoDB for SAT Academy...');
    
    // Try to connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sat-academy';
    console.log(`📡 Attempting to connect to: ${mongoURI}`);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected Successfully!');

    // Check if questions already exist
    const existingQuestions = await Question.countDocuments();
    console.log(`📊 Found ${existingQuestions} existing questions`);

    if (existingQuestions === 0) {
      console.log('📝 Seeding database with sample questions...');
      
      // Insert sample questions
      await Question.insertMany(sampleQuestions);
      console.log(`✅ Inserted ${sampleQuestions.length} sample questions`);
    } else {
      console.log('📋 Database already has questions, skipping seed');
    }

    // Display database summary
    const totalQuestions = await Question.countDocuments();
    const rwQuestions = await Question.countDocuments({ section: 'reading-writing' });
    const mathQuestions = await Question.countDocuments({ section: 'math' });

    console.log('\n📊 Database Summary:');
    console.log(`Total Questions: ${totalQuestions}`);
    console.log(`Reading & Writing: ${rwQuestions}`);
    console.log(`Math: ${mathQuestions}`);

    // Show questions by difficulty
    const easyCount = await Question.countDocuments({ difficulty: 'easy' });
    const mediumCount = await Question.countDocuments({ difficulty: 'medium' });
    const hardCount = await Question.countDocuments({ difficulty: 'hard' });

    console.log('\n📈 By Difficulty:');
    console.log(`Easy: ${easyCount}`);
    console.log(`Medium: ${mediumCount}`);
    console.log(`Hard: ${hardCount}`);

    console.log('\n🎉 MongoDB setup completed successfully!');
    console.log('🚀 SAT Chatbot Academy is ready for production!');
    
    return true;

  } catch (error) {
    console.error('❌ MongoDB Setup Error:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 MongoDB Connection Failed - Options:');
      console.log('1. Install MongoDB locally:');
      console.log('   - macOS: brew install mongodb-community');
      console.log('   - Ubuntu: sudo apt install mongodb');
      console.log('   - Windows: Download from mongodb.com');
      console.log('\n2. Use MongoDB Atlas (Cloud):');
      console.log('   - Sign up at mongodb.com/atlas');
      console.log('   - Create cluster and get connection string');
      console.log('   - Update MONGODB_URI in .env file');
      console.log('\n3. Continue with mock data (current setup works)');
    }
    
    return false;
  }
};

// Run setup if called directly
if (require.main === module) {
  setupMongoDB().then(() => {
    process.exit(0);
  }).catch(() => {
    process.exit(1);
  });
}

module.exports = setupMongoDB;
