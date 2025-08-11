const mongoose = require('mongoose');
const Question = require('../models/Question');
const sampleQuestions = require('../data/sampleQuestions');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sat-academy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('🗑️  Cleared existing questions');

    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log(`✅ Inserted ${sampleQuestions.length} sample questions`);

    // Display summary
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

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
