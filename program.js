const questions = [
    {
        question: "When did Yablokostan first appear on the Pixel Map?",
        options: ["Late July 2024", "September 2025", "June 2026", "January 2022"],
        answer: 0
    },
    {
        question: "Who announced at 1:00 AM on June 25, 2026, that part of Yablokostan was captured?",
        options: ["Veseloe Yabloko", "Potuzhniy Mopsik", "The King and leader of Latvia", "The NBP Communists"],
        answer: 2
    },
    {
        question: "What platform did Yablokostan officially switch to on July 29?",
        options: ["TikTok", "Discord", "Pixel Universe", "Reddit"],
        answer: 2
    },
    {
        question: "Which player rapidly increased Yablokostan's influence by inviting their friends?",
        options: ["Veseloe Yabloko", "Potuzhniy Mopsik", "St. Yablokovsk", "The King of Latvia"],
        answer: 1
    },
    {
        question: "Which city, acting as the capital of Yablokostan, was partially liberated on August 5?",
        options: ["Moscow", "Novgorod", "St. Yablokovsk", "Pskov"],
        answer: 3
    },
    {
        question: "During the Great Raid on August 7, where did the initial offensive begin?",
        options: ["Novgorod", "Pskov", "Ingria", "St. Yablokovsk"],
        answer: 0
    },
    {
        question: "What was the name of the massive communist faction that Yablokostan fought against?",
        options: ["The Red Apple", "NBP Pixel", "The Soviet Union", "Latvian Communists"],
        answer: 1
    },
    {
        question: "Which major city (the 2nd largest in Russia) was liberated and renamed St. Yablokovsk?",
        options: ["Moscow", "Novgorod", "St. Petersburg", "Kyiv"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let canAnswer = true;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-display');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const resultMessage = document.getElementById('result-message');
const rankMessage = document.getElementById('rank-message');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    canAnswer = true;
    startScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    quizScreen.classList.add('active');
    showQuestion();
}

function showQuestion() {
    canAnswer = true;
    const q = questions[currentQuestionIndex];
    
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
    scoreDisplay.textContent = `Score: ${score}`;
    questionText.textContent = q.question;
    
    optionsContainer.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option-btn');
        btn.addEventListener('click', () => selectAnswer(index, btn));
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(selectedIndex, selectedBtn) {
    if (!canAnswer) return;
    canAnswer = false;

    const q = questions[currentQuestionIndex];
    const allBtns = optionsContainer.querySelectorAll('.option-btn');

    if (selectedIndex === q.answer) {
        selectedBtn.classList.add('correct');
        score += 10;
    } else {
        selectedBtn.classList.add('wrong');
        // Highlight the correct answer in green
        allBtns[q.answer].classList.add('correct');
    }

    // Disable all buttons after answering
    allBtns.forEach(btn => btn.disabled = true);

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500); // Wait 1.5 seconds before moving to next question
}

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    resultMessage.textContent = `You scored ${score} out of ${questions.length * 10} points!`;

    if (score === questions.length * 10) {
        rankMessage.textContent = "🏆 PERFECT! You are Veseloe Yabloko's top general!";
    } else if (score >= (questions.length * 10) * 0.7) {
        rankMessage.textContent = "🍏 Great job! You are a true Yablokostan patriot.";
    } else if (score >= (questions.length * 10) * 0.4) {
        rankMessage.textContent = "🔴 Not bad, but the NBP Communists might still capture you.";
    } else {
        rankMessage.textContent = "💀 You were captured by the NBP. Study the Chronicle!";
    }
}

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);