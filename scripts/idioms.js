// Variables del juego
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// Preguntas del quiz
const questions = [
    {
        question: "Spill the tea means:",
        answers: [
            { text: "To accidentally drop your drink", correct: false },
            { text: "To brew herbal tea", correct: false },
            { text: "To share gossip or secrets", correct: true },
            { text: "To clean tea cups", correct: false }
        ]
    },
    {
        question: "Bug in someones ear se refiere a:",
        answers: [
            { text: "A literal insect in someone's ear", correct: false },
            { text: "To persistently suggest an idea ", correct: true },
            { text: "A hearing aid device", correct: false },
            { text: "A telephone conversation", correct: false }
        ]
    },
    {
        question: "A bug in the system refers to",
        answers: [
            { text: "An insect in the garden", correct: false },
            { text: "A medical virus", correct: false },
            { text: "A technical computer error ", correct: true },
            { text: "A zoo animal", correct: false }
        ]
    },
    {
        question: "Log out means:",
        answers: [
            { text: "To exit your account", correct: true },
            { text: "To chop down a tree", correct: false },
            { text: "To solve a math problem", correct: false },
            { text: "To go for a walk", correct: false }
        ]
    },
    {
        question: "If someone says Spill the tea about the party!, they want:",
        answers: [
            { text: "You to bring tea to the party", correct: false },
            { text: "You to share party gossip", correct: true },
            { text: "You to clean up spills", correct: false },
            { text: "You to discuss tea varieties", correct: false }
        ]
    }
];

// Elementos del DOM
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const questionCounter = document.getElementById("question-counter");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreMessage = document.getElementById("score-message");
const questionContainer = document.getElementById("question-container");

// Iniciar el juego
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    questionContainer.style.display = "block";
    resultContainer.style.display = "none";
}

// Mostrar pregunta actual
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("div");
        button.classList.add("answer-option");
        button.textContent = answer.text;
        button.addEventListener("click", () => selectAnswer(answer));
        answersContainer.appendChild(button);
    });
}

// Resetear estado entre preguntas
function resetState() {
    selectedAnswer = null;
    nextButton.style.display = "none";
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

// Seleccionar respuesta
function selectAnswer(answer) {
    selectedAnswer = answer;
    const allButtons = document.querySelectorAll(".answer-option");
    
    allButtons.forEach(button => {
        button.classList.remove("selected");
        if (button.textContent === answer.text) {
            button.classList.add("selected");
        }
    });
    
    nextButton.style.display = "block";
}

// Mostrar resultado final
function showResult() {
    questionContainer.style.display = "none";
    nextButton.style.display = "none";
    resultContainer.style.display = "block";
    scoreMessage.textContent = `Sacaste ${score}/${questions.length} puntos`;
}

// Siguiente pregunta o mostrar resultados
function nextQuestion() {
    if (selectedAnswer && selectedAnswer.correct) {
        score++;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Reiniciar el juego
function restartQuiz() {
    startQuiz();
}

// Event listeners
nextButton.addEventListener("click", nextQuestion);

// Iniciar el juego al cargar
startQuiz();

// Función para cerrar sesión y redirigir al login
function logout() {
    // Aquí puedes agregar lógica adicional de limpieza si es necesario
    window.location.href = "index.html"; // Cambia esto por la ruta de tu página de login
}
