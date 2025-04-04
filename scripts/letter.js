// Palabras relacionadas a tecnología con pistas
const technologyWords = [
    { word: "SOFTWARE", hint: "Programs and applications that run on computers" },
    { word: "LOGIN", hint: "Enter your username and password to access a system" },
    { word: "LOGOUT", hint: "Exit securely from your account" },
    { word: "HARDWARE", hint: "Physical components of computers and devices" },
    { word: "TECHNOLOGY", hint: "Application of scientific knowledge for practical purposes" }
];

// Variables de estado del juego
let currentWordIndex = 0;
let score = 0;
let letters = [];

// Elementos del DOM
const lettersContainer = document.getElementById('letters-container');
const hintText = document.getElementById('hint-text');
const checkBtn = document.getElementById('check-btn');
const nextBtn = document.getElementById('next-btn');
const resultMessage = document.getElementById('result-message');
const gameContainer = document.getElementById('game-container');

// Función para mezclar letras 
function shuffleArray(array) {
    const newArray = [...array];
    let shuffled = false;
    
    // Asegurarse que el array queda realmente desordenado
    while (!shuffled) {
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        // Verificar que no quede en el orden original
        shuffled = array.some((val, idx) => val !== newArray[idx]);
    }
    return newArray;
}

// Iniciar juego 
function initGame() {
    const currentWord = technologyWords[currentWordIndex];
    hintText.textContent = currentWord.hint;
    
    // Mezclar letras (asegurando que siempre queden desordenadas)
    letters = shuffleArray(currentWord.word.split(''));
    renderLetters();
    resultMessage.textContent = '';
    nextBtn.disabled = true;
}

// Renderizar letras
function renderLetters() {
    lettersContainer.innerHTML = '';
    letters.forEach((letter, index) => {
        const letterBox = document.createElement('div');
        letterBox.className = 'letter-box';
        letterBox.textContent = letter;
        letterBox.dataset.index = index;
        letterBox.draggable = true;
        letterBox.addEventListener('dragstart', dragStart);
        lettersContainer.appendChild(letterBox);
    });
}

// Funciones para drag and drop
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.index);
}

lettersContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

lettersContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const fromIndex = e.dataTransfer.getData('text/plain');
    const toElement = e.target.closest('.letter-box');
    
    if (toElement) {
        const toIndex = toElement.dataset.index;
        swapLetters(fromIndex, toIndex);
    }
});

function swapLetters(fromIndex, toIndex) {
    [letters[fromIndex], letters[toIndex]] = [letters[toIndex], letters[fromIndex]];
    renderLetters();
}

// Verificar respuesta
checkBtn.addEventListener('click', () => {
    const currentWord = technologyWords[currentWordIndex];
    const userAnswer = letters.join('');
    
    if (userAnswer === currentWord.word) {
        resultMessage.textContent = 'Correct! Well done!';
        resultMessage.style.color = '#4CAF50';
        nextBtn.disabled = false;
        score++;
    } else {
        resultMessage.textContent = 'Try again!';
        resultMessage.style.color = '#f44336';
    }
});

// Siguiente palabra
nextBtn.addEventListener('click', () => {
    currentWordIndex++;
    
    if (currentWordIndex < technologyWords.length) {
        initGame();
    } else {
        showFinalResults();
    }
});

// Mostrar resultados finales
function showFinalResults() {
    gameContainer.innerHTML = `
        <div class="results-container">
            <h2>GAME OVER</h2>
            <p class="score">FINAL SCORE: ${score}/${technologyWords.length}</p>
            <div class="results-buttons">
                <button onclick="goToNextActivity()" class="green-btn">NEXT ACTIVITY</button>
            </div>
        </div>
    `;
}

// Ir a siguiente actividad
function goToNextActivity() {
    window.location.href = "idioms.html";
}

// Iniciar el juego al cargar
window.addEventListener('DOMContentLoaded', initGame);
// Modificar función dragStart
function dragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.index);
}

// Modificar función drop
function drop(e) {
    e.preventDefault();
    const fromIndex = e.dataTransfer.getData('text/plain');
    const toElement = e.target.closest('.letter-box');
    
    if (toElement) {
        // Animación de destino
        toElement.classList.add('drop-target');
        setTimeout(() => toElement.classList.remove('drop-target'), 200);
        
        const toIndex = toElement.dataset.index;
        swapLetters(fromIndex, toIndex);
        
        // Animación de caída
        document.querySelectorAll('.letter-box').forEach(box => {
            box.classList.add('dropping');
            setTimeout(() => box.classList.remove('dropping'), 200);
        });
    }
    
    document.querySelectorAll('.letter-box').forEach(box => {
        box.classList.remove('dragging');
    });
    
}

// JavaScript Ajustado
function dragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.index);
    
    // Forzar redibujado para suavizar animación
    void e.target.offsetWidth;
}

function dragEnd(e) {
    document.querySelectorAll('.letter-box').forEach(box => {
        box.classList.remove('dragging');
    });
}

// Añadir event listeners
document.querySelectorAll('.letter-box').forEach(box => {
    box.addEventListener('dragstart', dragStart);
    box.addEventListener('dragend', dragEnd);
});
