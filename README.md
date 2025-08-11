# Rafiki Academy

An interactive SAT prep platform with AI-powered explanations that allows students to have deep, conversational learning experiences. Named after the wise mentor Rafiki, guiding students on their educational journey.

## 🚀 Key Features

### **Interactive Chatbot Explanations**
- **Layered Learning**: Students can ask for deeper explanations repeatedly
- **Conversational Interface**: Natural back-and-forth dialogue about concepts
- **Context-Aware Responses**: AI understands the specific question and student's confusion
- **Alternative Approaches**: Explore different ways to solve problems

### **Comprehensive SAT Coverage**
- **Reading & Writing**: All 4 categories with 54 questions (64 minutes)
- **Math**: All 4 categories with 44 questions (70 minutes)
- **Adaptive Difficulty**: Easy, medium, and hard questions
- **Complete Topic Coverage**: Based on official Digital SAT structure

### **Smart Practice System**
- **Question Visualization**: Clean, interactive question display
- **Instant Feedback**: Immediate results with basic explanations
- **Custom Practice**: Filter by section, category, difficulty
- **Progress Tracking**: Performance analytics and recommendations

## 🎯 What Makes This Different

Unlike traditional SAT apps that just show "Wrong. Here's the answer," our chatbot provides:

1. **Student answers incorrectly** → Gets basic explanation
2. **Clicks "Give me more explanation"** → Detailed breakdown
3. **Asks "What about this approach?"** → Alternative methods
4. **Continues asking questions** → Deeper understanding

## 🛠 Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js/Express with RESTful APIs
- **Database**: MongoDB for questions and chat sessions
- **AI**: OpenAI GPT-4 for conversational explanations
- **UI**: Modern, responsive design with Lucide icons

## 📚 SAT Structure Covered

### Reading & Writing (64 min, 54 questions)
- **Craft & Structure** (28%): Main ideas, text structure, connections
- **Information & Ideas** (26%): Evidence, inferences, central ideas
- **Expression of Ideas** (20%): Rhetorical synthesis, transitions
- **Standard English Conventions** (26%): Grammar, punctuation, structure

### Math (70 min, 44 questions)
- **Algebra** (35%): Linear equations, systems, inequalities
- **Advanced Math** (35%): Quadratics, functions, expressions
- **Problem-Solving & Data Analysis** (15%): Ratios, percentages, statistics
- **Geometry & Trigonometry** (15%): Area, volume, triangles, circles

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- OpenAI API key

### Setup

1. **Clone and install dependencies**:
```bash
cd SAT-BOT
npm install
cd client && npm install --legacy-peer-deps
```

2. **Configure environment**:
```bash
# Edit .env file
MONGODB_URI=mongodb://localhost:27017/sat-academy
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_here
```

3. **Seed the database**:
```bash
node scripts/seedDatabase.js
```

4. **Start the servers**:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run client
```

5. **Open your browser**: http://localhost:3000

## 💡 Usage Flow

1. **Browse Topics**: Explore all SAT categories and learning materials
2. **Start Practice**: Choose questions by section, difficulty, or category
3. **Answer Questions**: Interactive multiple-choice interface
4. **Get Explanations**: Basic explanation provided immediately
5. **Chat for More**: Click "Give me more explanation" to start conversation
6. **Ask Follow-ups**: "Why is this wrong?", "Show me another way", etc.
7. **Deep Learning**: Continue asking until you fully understand

## 🎨 Sample Questions Included

- **Reading & Writing**: Main ideas, grammar, rhetorical analysis
- **Math**: Linear equations, quadratics, geometry problems
- **Multiple Difficulties**: Easy to hard across all topics
- **Rich Explanations**: Basic, detailed, and expert-level explanations

## 🔧 API Endpoints

### Questions
- `GET /api/questions` - Get filtered questions
- `GET /api/questions/:id` - Get specific question
- `POST /api/questions/:id/answer` - Submit answer

### Chat
- `POST /api/chat/start` - Start chat session
- `POST /api/chat/message` - Send chat message
- `GET /api/chat/history/:sessionId` - Get chat history

### Topics & Practice
- `GET /api/topics` - Get SAT topic structure
- `POST /api/practice/generate` - Generate practice test

## 🎯 Future Enhancements

- **Full Practice Tests**: Complete timed exams
- **Performance Analytics**: Detailed progress tracking
- **Adaptive Learning**: Personalized question recommendations

## 🤝 Contributing

Your Rafiki Academy is now running! The interactive chatbot system allows students to truly understand concepts rather than just memorize answers.

---

**Built with ❤️ for better SAT preparation**
