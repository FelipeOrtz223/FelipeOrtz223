// Variables del juego
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// Preguntas del quiz
const questions = [
    {
        question: "Spill the tea significa:",
        answers: [
            { text: "Derramar una bebida caliente", correct: false },
            { text: "Lavar tazas de té", correct: false },
            { text: "Contar chismes o secretos", correct: true },
            { text: "Comprar té en el supermercado", correct: false }
        ]
    },
    {
        question: "Bug in someones ear se refiere a:",
        answers: [
            { text: "Tener un insecto en el oído", correct: false },
            { text: "Insistirle una idea a alguien", correct: true },
            { text: "Escuchar música con audífonos", correct: false },
            { text: "Hablar por teléfono", correct: false }
        ]
    },
    {
        question: "A bug in the system describe:",
        answers: [
            { text: "Un insecto en el jardín", correct: false },
            { text: "Un virus medico", correct: false },
            { text: "Un error técnico en una computadora", correct: true },
            { text: "Un animal en el zoológico", correct: false }
        ]
    },
    {
        question: "Si alguien te dice Spill the tea about the party!, quiere:",
        answers: [
            { text: "Que lleves té a la fiesta", correct: false },
            { text: "Que limpies los derrames de bebidas", correct: false },
            { text: "Que cuentes los chismes de la fiesta", correct: true },
            { text: "Que hables sobre tipos de té", correct: false }
        ]
    },
    {
        question: "Log out significa:",
        answers: [
            { text: "Talar un árbol", correct: false },
            { text: "Cerrar sesión en una cuenta", correct: true },
            { text: "Resolver un problema", correct: false },
            { text: "Salir a caminar", correct: false }
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
    window.location.href = ""; // Cambia esto por la ruta de tu página de login
}