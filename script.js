let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
let playerName = '';
let score = 0;
let answers = [];

// Correct answers
const correctAnswers = {
    2: "a) School", // Where did the parents-to-be first meet?
    3: "a) Watching movies", // What is the couple's favorite date night activity?
    4: "a) A beach vacation", // What was the first trip the parents-to-be took together?
    5: "c) Milk", // What is one thing the mom-to-be craved during pregnancy?
    8: "d) all of the above", // What childhood nickname did the dad-to-be have?
    9: "a) Tennis", // What sport do the parents hope their baby will play?
    10: "d) \"I'm Just Ken\" by Ryan Gosling", // What was the parents-to-be's wedding song?
    11: "c) Both equally!", // Which parent is predicted to spoil the baby the most?
    12: "c) They'll share the responsibility equally", // Who's more likely to wake up for nighttime baby feedings?
    13: "a) Paris", // What is the couple's dream vacation spot?
    14: "b) Cute baby clothes" // What is the one baby item the couple is most excited about?
};

// Show the first slide initially
slides[currentSlide].classList.add('active');

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Ensure index stays within bounds
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    
    // Show the current slide
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

function startGame() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    
    if (!firstName || !lastName) {
        alert('Please enter both your first and last name');
        return;
    }
    
    playerName = `${firstName} ${lastName}`;
    showSlide(2); // Start with first question
}

function restartGame() {
    score = 0;
    answers = [];
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    showSlide(1); // Go back to signup
}

// Add click handlers for option buttons
document.querySelectorAll('.options button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove selected class from all buttons in this question
        const parentOptions = this.closest('.options');
        parentOptions.querySelectorAll('button').forEach(btn => {
            btn.style.background = '#fff';
            btn.style.color = '#3498db';
        });
        
        // Highlight selected button
        this.style.background = '#3498db';
        this.style.color = '#fff';
        
        // Store the answer
        const questionIndex = Array.from(slides).indexOf(this.closest('.slide'));
        answers[questionIndex] = this.textContent;
        
        // Check if this is the last question
        if (questionIndex === 14) {
            calculateScore();
        }
    });
});

function calculateScore() {
    score = 0;
    const answerSummary = document.getElementById('answerSummary');
    answerSummary.innerHTML = '';
    
    Object.entries(correctAnswers).forEach(([index, correctAnswer]) => {
        const playerAnswer = answers[index];
        const isCorrect = playerAnswer === correctAnswer;
        
        if (isCorrect) {
            score++;
        }
        
        const answerItem = document.createElement('div');
        answerItem.className = `answer-item ${isCorrect ? 'correct' : 'incorrect'}`;
        answerItem.innerHTML = `
            <p><strong>Question ${parseInt(index) - 1}:</strong> ${slides[index].querySelector('h2').textContent}</p>
            <p>Your answer: ${playerAnswer || 'No answer'}</p>
            <p>Correct answer: ${correctAnswer}</p>
        `;
        answerSummary.appendChild(answerItem);
    });
    
    // Update results display
    document.getElementById('playerName').textContent = playerName;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('totalQuestions').textContent = Object.keys(correctAnswers).length;
    
    // Show results slide
    showSlide(15);
}

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        previousSlide();
    }
}); 
