const express = require('express');
const router = express.Router();

// SAT Topics structure based on official Digital SAT format
const satTopics = {
  "reading-writing": {
    name: "Reading & Writing",
    duration: 64,
    questions: 54,
    categories: {
      "craft-structure": {
        name: "Craft and Structure",
        weight: "28%",
        questions: "13-15",
        topics: [
          "Words in Context",
          "Text Structure and Purpose", 
          "Cross-Text Connections"
        ],
        description: "Understanding how authors craft and structure texts to achieve specific purposes"
      },
      "information-ideas": {
        name: "Information and Ideas", 
        weight: "26%",
        questions: "12-14",
        topics: [
          "Central Ideas and Details",
          "Command of Evidence (Textual)",
          "Command of Evidence (Quantitative)",
          "Inferences"
        ],
        description: "Comprehending and using information and ideas in texts"
      },
      "expression-ideas": {
        name: "Expression of Ideas",
        weight: "20%", 
        questions: "8-12",
        topics: [
          "Rhetorical Synthesis",
          "Transitions"
        ],
        description: "Revising texts to improve the expression of ideas"
      },
      "standard-conventions": {
        name: "Standard English Conventions",
        weight: "26%",
        questions: "11-15", 
        topics: [
          "Boundaries",
          "Form, Structure, and Sense"
        ],
        description: "Editing texts to conform to the conventions of Standard English"
      }
    }
  },
  "math": {
    name: "Math",
    duration: 70,
    questions: 44,
    categories: {
      "algebra": {
        name: "Algebra",
        weight: "35%",
        questions: "13-15",
        topics: [
          "Linear equations in one variable",
          "Linear equations in two variables", 
          "Linear functions",
          "Systems of two linear equations in two variables",
          "Linear inequalities in one or two variables"
        ],
        description: "Analyzing and fluently solving equations and systems of equations"
      },
      "advanced-math": {
        name: "Advanced Math", 
        weight: "35%",
        questions: "13-15",
        topics: [
          "Equivalent expressions",
          "Nonlinear equations in one variable",
          "Systems of equations in two variables",
          "Nonlinear functions"
        ],
        description: "Progressing to more advanced equations, expressions, functions, and geometry concepts"
      },
      "problem-solving-data": {
        name: "Problem-Solving and Data Analysis",
        weight: "15%",
        questions: "5-7", 
        topics: [
          "Ratios, rates, proportional relationships, and units",
          "Percentages", 
          "One-variable data: distributions and measures of center and spread",
          "Two-variable data: models and scatterplots",
          "Probability and conditional probability",
          "Inference from sample statistics and margin of error",
          "Evaluating statistical claims: observational studies and experiments"
        ],
        description: "Using ratios, percentages, and proportional reasoning to solve problems in science, social science, and career contexts"
      },
      "geometry-trigonometry": {
        name: "Geometry and Trigonometry",
        weight: "15%",
        questions: "5-7",
        topics: [
          "Area and volume",
          "Lines, angles, and triangles", 
          "Right triangles and trigonometry",
          "Circles"
        ],
        description: "Solving problems involving area, volume, and trigonometry"
      }
    }
  }
};

// Get all topics structure
router.get('/', (req, res) => {
  res.json(satTopics);
});

// Get specific section topics
router.get('/:section', (req, res) => {
  const { section } = req.params;
  
  if (!satTopics[section]) {
    return res.status(404).json({ error: 'Section not found' });
  }
  
  res.json(satTopics[section]);
});

// Get specific category within a section
router.get('/:section/:category', (req, res) => {
  const { section, category } = req.params;
  
  if (!satTopics[section] || !satTopics[section].categories[category]) {
    return res.status(404).json({ error: 'Category not found' });
  }
  
  res.json(satTopics[section].categories[category]);
});

module.exports = router;
