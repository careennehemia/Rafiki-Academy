const sampleQuestions = [
  {
    id: "rw_001",
    section: "reading-writing",
    category: "craft-structure",
    subcategory: "main-ideas",
    difficulty: "medium",
    questionText: "The following text is adapted from a 1918 speech by President Woodrow Wilson. Which choice best states the main purpose of the text?",
    passage: "The world must be made safe for democracy. Its peace must be planted upon the tested foundations of political liberty. We have no selfish ends to serve. We desire no conquest, no dominion. We seek no indemnities for ourselves, no material compensation for the sacrifices we shall freely make. We are but one of the champions of the rights of mankind.",
    options: [
      { label: "A", text: "To justify America's entry into World War I" },
      { label: "B", text: "To outline specific war strategies" },
      { label: "C", text: "To request financial support from allies" },
      { label: "D", text: "To describe the aftermath of the war" }
    ],
    correctAnswer: "A",
    explanation: {
      basic: "Wilson is explaining why America must enter the war - to make the world safe for democracy and protect human rights, not for selfish gain.",
      detailed: "The passage shows Wilson justifying American involvement in WWI by emphasizing moral imperatives rather than material gain. Key phrases like 'world must be made safe for democracy' and 'we have no selfish ends to serve' indicate he's explaining the righteous reasons for war entry.",
      expert: "This is a classic rhetorical justification text. Wilson uses idealistic language ('champions of the rights of mankind') and explicitly denies selfish motives to frame America's war entry as morally necessary. The structure moves from general principle (democracy/liberty) to specific denial of material motives, creating a moral imperative for action."
    },
    concepts: ["main idea", "author's purpose", "rhetorical analysis"],
    tags: ["world-war-1", "wilson", "democracy", "main-purpose"],
    source: "Official SAT Practice"
  },
  {
    id: "math_001", 
    section: "math",
    category: "algebra",
    subcategory: "linear-equations",
    difficulty: "easy",
    questionText: "If 3x + 7 = 22, what is the value of x?",
    passage: "",
    options: [
      { label: "A", text: "3" },
      { label: "B", text: "5" },
      { label: "C", text: "7" },
      { label: "D", text: "15" }
    ],
    correctAnswer: "B",
    explanation: {
      basic: "Solve for x by subtracting 7 from both sides, then dividing by 3. 3x + 7 = 22 → 3x = 15 → x = 5",
      detailed: "Step 1: Subtract 7 from both sides: 3x + 7 - 7 = 22 - 7, so 3x = 15. Step 2: Divide both sides by 3: 3x ÷ 3 = 15 ÷ 3, so x = 5. Check: 3(5) + 7 = 15 + 7 = 22 ✓",
      expert: "This is a standard one-step linear equation. The key is applying inverse operations in the correct order (addition/subtraction before multiplication/division). Always verify your answer by substituting back into the original equation."
    },
    concepts: ["linear equations", "solving equations", "inverse operations"],
    tags: ["basic-algebra", "one-variable", "linear"],
    source: "SAT Practice"
  },
  {
    id: "rw_002",
    section: "reading-writing", 
    category: "standard-conventions",
    subcategory: "punctuation",
    difficulty: "medium",
    questionText: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    passage: "The scientist's research focused on three main areas: renewable energy sources, sustainable agriculture practices, and ______ waste management systems.",
    options: [
      { label: "A", text: "efficient" },
      { label: "B", text: "efficient," },
      { label: "C", text: "efficient;" },
      { label: "D", text: "efficient:" }
    ],
    correctAnswer: "A",
    explanation: {
      basic: "In a series of three items, the last item doesn't need a comma before it when it ends the sentence.",
      detailed: "This is a parallel series: 'renewable energy sources, sustainable agriculture practices, and efficient waste management systems.' The word 'efficient' modifies 'waste management systems' and doesn't require additional punctuation since it's the final item in the series.",
      expert: "This tests understanding of parallel structure in series. The three items are: (1) renewable energy sources, (2) sustainable agriculture practices, and (3) efficient waste management systems. Each item follows the same pattern: adjective + noun + noun, maintaining parallelism without extra punctuation."
    },
    concepts: ["punctuation", "parallel structure", "series"],
    tags: ["grammar", "punctuation", "parallelism"],
    source: "SAT Practice"
  },
  {
    id: "math_002",
    section: "math",
    category: "advanced-math", 
    subcategory: "quadratic-equations",
    difficulty: "hard",
    questionText: "If f(x) = x² - 4x + 3, what is the minimum value of f(x)?",
    passage: "",
    options: [
      { label: "A", text: "-1" },
      { label: "B", text: "0" },
      { label: "C", text: "1" },
      { label: "D", text: "3" }
    ],
    correctAnswer: "A",
    explanation: {
      basic: "The minimum occurs at the vertex. Using x = -b/2a: x = 4/2 = 2. Then f(2) = 4 - 8 + 3 = -1.",
      detailed: "For a quadratic f(x) = ax² + bx + c with a > 0, the minimum occurs at x = -b/2a. Here a = 1, b = -4, so x = -(-4)/(2×1) = 2. Substituting: f(2) = 2² - 4(2) + 3 = 4 - 8 + 3 = -1.",
      expert: "Method 1 (Vertex formula): x = -b/2a = 4/2 = 2, f(2) = -1. Method 2 (Completing the square): f(x) = x² - 4x + 3 = (x-2)² - 4 + 3 = (x-2)² - 1. Since (x-2)² ≥ 0, minimum value is -1. Method 3 (Calculus): f'(x) = 2x - 4 = 0 → x = 2, f''(x) = 2 > 0 confirms minimum."
    },
    concepts: ["quadratic functions", "vertex form", "minimum/maximum"],
    tags: ["parabola", "vertex", "optimization"],
    source: "SAT Practice"
  },
  {
    id: "rw_003",
    section: "reading-writing",
    category: "information-ideas",
    subcategory: "central-ideas",
    difficulty: "easy",
    questionText: "Which choice best states the main idea of the text?",
    passage: "Bees are essential pollinators that help plants reproduce. Without bees, many of the fruits and vegetables we eat would not exist. Scientists estimate that one-third of the food we consume depends on bee pollination. However, bee populations have been declining due to habitat loss, pesticide use, and climate change.",
    options: [
      { label: "A", text: "Bees are interesting insects that live in hives" },
      { label: "B", text: "Bees are crucial for food production but face serious threats" },
      { label: "C", text: "Scientists study bee behavior extensively" },
      { label: "D", text: "Climate change affects many species" }
    ],
    correctAnswer: "B",
    explanation: {
      basic: "The passage explains that bees are essential for food production (one-third of our food depends on them) but are facing threats like habitat loss and pesticides.",
      detailed: "The text has two main parts: (1) bees are essential pollinators that help create much of our food, and (2) bee populations are declining due to various threats. Choice B captures both aspects - their importance and the dangers they face.",
      expert: "This is a classic main idea question that requires synthesizing multiple pieces of information. The passage follows a problem-solution structure: establishes importance (bees pollinate 1/3 of food) then presents the problem (population decline). The main idea must encompass both the significance and the threat."
    },
    concepts: ["main idea", "central ideas", "reading comprehension"],
    tags: ["environment", "bees", "pollination", "main-idea"],
    source: "SAT Practice"
  },
  {
    id: "math_003",
    section: "math",
    category: "problem-solving-data",
    subcategory: "percentages",
    difficulty: "medium",
    questionText: "A store marks up the price of an item by 25%. If the marked-up price is $60, what was the original price?",
    passage: "",
    options: [
      { label: "A", text: "$45" },
      { label: "B", text: "$48" },
      { label: "C", text: "$50" },
      { label: "D", text: "$55" }
    ],
    correctAnswer: "B",
    explanation: {
      basic: "If original price is x, then x + 25% of x = $60. So 1.25x = $60, which means x = $60 ÷ 1.25 = $48.",
      detailed: "Let the original price be x. A 25% markup means the new price is x + 0.25x = 1.25x. Since the marked-up price is $60: 1.25x = 60. Solving: x = 60 ÷ 1.25 = 60 × (4/5) = 48.",
      expert: "This is a reverse percentage problem. Key insight: if something increases by 25%, the new amount is 125% of the original. So if 125% = $60, then 100% = $60 ÷ 1.25. Alternative: $60 × (100/125) = $60 × 0.8 = $48."
    },
    concepts: ["percentages", "markup", "reverse calculations"],
    tags: ["percent", "markup", "word-problems"],
    source: "SAT Practice"
  },
  {
    id: "rw_004",
    section: "reading-writing",
    category: "expression-ideas",
    subcategory: "transitions",
    difficulty: "medium",
    questionText: "Which choice completes the text with the most logical transition?",
    passage: "Solar energy has become increasingly affordable in recent years. The cost of solar panels has dropped by over 80% since 2010. ______ many homeowners are still hesitant to install solar systems due to high upfront costs.",
    options: [
      { label: "A", text: "Therefore," },
      { label: "B", text: "However," },
      { label: "C", text: "Similarly," },
      { label: "D", text: "For example," }
    ],
    correctAnswer: "B",
    explanation: {
      basic: "The text shows a contrast: solar energy is more affordable, BUT homeowners are still hesitant. 'However' signals this contrast.",
      detailed: "The passage sets up a contradiction: despite solar becoming more affordable (positive), homeowners remain hesitant (negative). This requires a contrasting transition. 'However' is the only choice that signals opposition between ideas.",
      expert: "This tests understanding of logical relationships between sentences. The structure is: [Positive development] + [Contrasting transition] + [Negative reality]. 'Therefore' would suggest causation, 'Similarly' would show agreement, 'For example' would introduce an illustration - none fit the contrast needed here."
    },
    concepts: ["transitions", "logical relationships", "contrast"],
    tags: ["transitions", "contrast", "solar-energy"],
    source: "SAT Practice"
  },
  {
    id: "math_004",
    section: "math",
    category: "geometry-trigonometry",
    subcategory: "area",
    difficulty: "medium",
    questionText: "A rectangular garden has a length that is 3 meters longer than its width. If the area is 40 square meters, what is the width?",
    passage: "",
    options: [
      { label: "A", text: "5 meters" },
      { label: "B", text: "6 meters" },
      { label: "C", text: "7 meters" },
      { label: "D", text: "8 meters" }
    ],
    correctAnswer: "A",
    explanation: {
      basic: "Let width = w, then length = w + 3. Area = w(w + 3) = 40. Solving: w² + 3w = 40, so w² + 3w - 40 = 0. Factoring: (w + 8)(w - 5) = 0. Since width must be positive, w = 5.",
      detailed: "Set up the equation: width × length = area. If w = width, then length = w + 3. So w(w + 3) = 40. Expanding: w² + 3w = 40. Rearranging: w² + 3w - 40 = 0. Factor: (w + 8)(w - 5) = 0. Solutions: w = -8 or w = 5. Since width cannot be negative, w = 5 meters.",
      expert: "This is a quadratic word problem. Key steps: (1) Define variable (w = width), (2) Express length in terms of width (w + 3), (3) Set up area equation w(w + 3) = 40, (4) Solve quadratic w² + 3w - 40 = 0. Factoring tip: find two numbers that multiply to -40 and add to 3, which are 8 and -5."
    },
    concepts: ["quadratic equations", "area", "word problems", "factoring"],
    tags: ["geometry", "quadratic", "area", "rectangle"],
    source: "SAT Practice"
  },
  {
    id: "rw_005",
    section: "reading-writing",
    category: "craft-structure",
    subcategory: "text-structure",
    difficulty: "hard",
    questionText: "Which choice best describes the overall structure of the text?",
    passage: "The concept of artificial intelligence has evolved dramatically since the 1950s. Early researchers believed that human-level AI was just around the corner, predicting it would arrive by the 1970s. These optimistic forecasts proved premature. Progress stalled due to computational limitations and the complexity of human cognition. However, recent advances in machine learning and neural networks have renewed excitement about AI's potential. Today's AI systems can perform tasks once thought impossible, from recognizing images to generating human-like text.",
    options: [
      { label: "A", text: "It presents a problem and proposes multiple solutions" },
      { label: "B", text: "It traces the historical development of a concept" },
      { label: "C", text: "It compares two competing theories" },
      { label: "D", text: "It argues for a particular viewpoint" }
    ],
    correctAnswer: "B",
    explanation: {
      basic: "The passage follows AI development through time: 1950s origins → 1970s predictions → stalled progress → recent advances. This is chronological/historical structure.",
      detailed: "The text is organized chronologically, tracing AI from its 1950s beginnings through early optimistic predictions, subsequent setbacks, and current renaissance. Each sentence advances the timeline, showing how the field has evolved over decades.",
      expert: "This is a chronological narrative structure. Key temporal markers: '1950s,' 'by the 1970s,' 'progress stalled,' 'recent advances,' 'today's.' The passage doesn't argue for a position or compare theories - it simply traces historical development. The structure is: origin → early expectations → setbacks → current progress."
    },
    concepts: ["text structure", "chronological organization", "historical development"],
    tags: ["text-structure", "AI", "chronological", "history"],
    source: "SAT Practice"
  },
  {
    id: "math_005",
    section: "math",
    category: "advanced-math",
    subcategory: "functions",
    difficulty: "hard",
    questionText: "If f(x) = 2x² - 3x + 1, what is the value of f(3) - f(1)?",
    passage: "",
    options: [
      { label: "A", text: "8" },
      { label: "B", text: "10" },
      { label: "C", text: "12" },
      { label: "D", text: "14" }
    ],
    correctAnswer: "B",
    explanation: {
      basic: "f(3) = 2(3)² - 3(3) + 1 = 18 - 9 + 1 = 10. f(1) = 2(1)² - 3(1) + 1 = 2 - 3 + 1 = 0. So f(3) - f(1) = 10 - 0 = 10.",
      detailed: "Calculate each function value separately: f(3) = 2(9) - 3(3) + 1 = 18 - 9 + 1 = 10. f(1) = 2(1) - 3(1) + 1 = 2 - 3 + 1 = 0. Therefore: f(3) - f(1) = 10 - 0 = 10.",
      expert: "Function evaluation problem. Substitute x = 3: f(3) = 2(3²) - 3(3) + 1 = 2(9) - 9 + 1 = 18 - 9 + 1 = 10. Substitute x = 1: f(1) = 2(1²) - 3(1) + 1 = 2 - 3 + 1 = 0. The difference is 10 - 0 = 10. Alternative: f(3) - f(1) = [2(9) - 9 + 1] - [2 - 3 + 1] = 10 - 0 = 10."
    },
    concepts: ["function evaluation", "quadratic functions", "substitution"],
    tags: ["functions", "quadratic", "evaluation"],
    source: "SAT Practice"
  },
  {
    id: "rw_006",
    section: "reading-writing",
    category: "standard-conventions",
    subcategory: "subject-verb-agreement",
    difficulty: "easy",
    questionText: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    passage: "The team of researchers ______ working on a groundbreaking study about climate change.",
    options: [
      { label: "A", text: "are" },
      { label: "B", text: "is" },
      { label: "C", text: "were" },
      { label: "D", text: "have been" }
    ],
    correctAnswer: "B",
    explanation: {
      basic: "The subject is 'team' (singular), not 'researchers.' A team is one unit, so it takes a singular verb: 'is.'",
      detailed: "'Team' is a collective noun that's treated as singular in American English. Even though it contains multiple people ('researchers'), the team itself is one entity. The prepositional phrase 'of researchers' doesn't affect the verb agreement.",
      expert: "Subject-verb agreement with collective nouns. The subject is 'team' (singular collective noun), not 'researchers' (object of preposition). In American English, collective nouns typically take singular verbs when referring to the group as a unit. The phrase 'of researchers' is a prepositional phrase that doesn't determine the verb form."
    },
    concepts: ["subject-verb agreement", "collective nouns", "prepositional phrases"],
    tags: ["grammar", "subject-verb", "collective-nouns"],
    source: "SAT Practice"
  },
  {
    id: "math_006",
    section: "math",
    category: "algebra",
    subcategory: "systems-equations",
    difficulty: "medium",
    questionText: "If 2x + 3y = 12 and x - y = 1, what is the value of x?",
    passage: "",
    options: [
      { label: "A", text: "2" },
      { label: "B", text: "3" },
      { label: "C", text: "4" },
      { label: "D", text: "5" }
    ],
    correctAnswer: "B",
    explanation: {
      basic: "From the second equation: x = y + 1. Substitute into the first: 2(y + 1) + 3y = 12. So 2y + 2 + 3y = 12, which gives 5y = 10, so y = 2. Then x = 2 + 1 = 3.",
      detailed: "Use substitution method. From x - y = 1, solve for x: x = y + 1. Substitute into 2x + 3y = 12: 2(y + 1) + 3y = 12. Expand: 2y + 2 + 3y = 12. Combine: 5y + 2 = 12. Solve: 5y = 10, so y = 2. Back-substitute: x = 2 + 1 = 3.",
      expert: "System of linear equations solved by substitution. Alternative elimination method: multiply second equation by 2: 2x - 2y = 2. Subtract from first equation: (2x + 3y) - (2x - 2y) = 12 - 2, giving 5y = 10, so y = 2. Then x = 1 + 2 = 3. Check: 2(3) + 3(2) = 12 ✓ and 3 - 2 = 1 ✓"
    },
    concepts: ["systems of equations", "substitution method", "linear equations"],
    tags: ["systems", "algebra", "substitution"],
    source: "SAT Practice"
  }
];

module.exports = sampleQuestions;
