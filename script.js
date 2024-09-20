const quizData = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: 0
    },
    {
        id: 2,
        question: "Who is the CEO of Tesla?",
        options: ["Elon Musk", "Jeff Bezos", "Bill Gates", "Mark Zuckerberg"],
        answer: 0
    },
    {
        id: 3,
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Uranus"],
        answer: 2
    },
    {
        id: 4,
        question: "Which programming language is used for web development?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: 2
    },
    {
        id: 5,
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Caravaggio"],
        answer: 0
    },
    {
        id: 6,
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: 2
    },
    {
        id: 7,
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1
    },
    {
        id: 8,
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Osmium", "Oganesson"],
        answer: 0
    },
    {
        id: 9,
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        answer: 0
    },
    {
        id: 10,
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Graphite"],
        answer: 2
    }
];


let score = 0;
let currentQuestion = 0;
let selectedAnswers = [];
let hasAnswered = false;

const renderQuestion = () => {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const submitButton = document.getElementById("submit");
    const resultElement = document.getElementById("result");
    const scoreElement = document.getElementById("score");

    optionsElement.innerHTML = "";
    resultElement.textContent = "";
    scoreElement.textContent = `Score: ${score}`;
    submitButton.disabled = true;
    hasAnswered = false;

    const currentQuestionData = quizData[currentQuestion];
    questionElement.textContent = `${currentQuestion + 1}. ${currentQuestionData.question}`;

    if (currentQuestion < quizData.length - 1) {
        submitButton.innerHTML = "Next";
    } else {
        submitButton.innerHTML = "Submit";
    }

    // Render options
    currentQuestionData.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${option}`;
        li.classList.add("option");
        li.addEventListener("click", () => selectOption(index, li));
        optionsElement.appendChild(li);
    });
};

//  option selection
const selectOption = (selectedIndex, li) => {
    if (hasAnswered) return;

    const correctAnswer = quizData[currentQuestion].answer;

    document.querySelectorAll("#options li").forEach(item => {
        item.classList.remove("selected");
        item.style.backgroundColor = "";
        item.style.color = "";
    });

    li.style.backgroundColor = selectedIndex === correctAnswer ? "green" : "red";
    li.style.color = "white";
    li.classList.add("selected");

    selectedAnswers[currentQuestion] = selectedIndex;
    document.querySelectorAll("#options li").forEach(item => {
        item.style.pointerEvents = "none";
    });
    hasAnswered = true;
    document.getElementById("submit").disabled = false;
};

//handle the next button click
const handleNext = () => {
    if (!hasAnswered) {
        return;
    }

    const selectedOption = selectedAnswers[currentQuestion];
    const correctAnswer = quizData[currentQuestion].answer;

    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById("result").textContent = "Correct!";
    } else {
        document.getElementById("result").textContent = "Incorrect!";
    }

    currentQuestion++;
    document.getElementById("score").textContent = `Score: ${score}`;

    if (currentQuestion >= quizData.length) {
        showAllAnswers();
    } else {
        renderQuestion();
    }
};

//  reset the quiz
const resetQuiz = () => {
    score = 0;
    currentQuestion = 0;
    selectedAnswers = [];
    
    
    const queAns = document.querySelector(".que-ans");
    queAns.style.display = "none";
    queAns.innerHTML = '<h2>All Answers:</h2>'; 

    // Recreate the restart button
    const restartButton = document.createElement("button");
    restartButton.id = "restart";
    restartButton.textContent = "Restart Quiz";
    restartButton.addEventListener("click", resetQuiz);
    queAns.appendChild(restartButton);

    document.querySelector(".que-opt").style.display = "block";
    renderQuestion();
};

// all answers at the end of the quiz
const showAllAnswers = () => {
    const queAns = document.querySelector(".que-ans");
    const queOpt = document.querySelector(".que-opt");

    queOpt.style.display = "none";
    queAns.style.display = "block";

    quizData.forEach((item, index) => {
        const questionElement = document.createElement("p");
        questionElement.classList.add("que");
        questionElement.textContent = `${index + 1}. ${item.question}`;

        const userAnswer = selectedAnswers[index] !== undefined ? selectedAnswers[index] : null;
        const isCorrect = userAnswer !== null && userAnswer === item.answer;

        const answerElement = document.createElement("p");
        answerElement.classList.add("ans");
        answerElement.textContent = `Your Answer: ${userAnswer !== null ? `${userAnswer + 1}. ${item.options[userAnswer]}` : "No Answer"}`;
        answerElement.style.color = isCorrect ? "green" : "red";

        const correctAnswerElement = document.createElement("p");
        correctAnswerElement.classList.add("ans");
        correctAnswerElement.textContent = `Correct Answer: ${item.options[item.answer]}`;
        correctAnswerElement.style.color = "green";

        queAns.appendChild(questionElement);
        queAns.appendChild(answerElement);
        queAns.appendChild(correctAnswerElement);
    });

    const resultElement = document.createElement("p");
    resultElement.textContent = `Final Score: ${score}/${quizData.length}`;
    resultElement.style.margin = "20px";
    resultElement.style.fontWeight = "bold";
    queAns.appendChild(resultElement);
};



document.getElementById("submit").addEventListener("click", handleNext);
document.getElementById("restart").addEventListener("click", resetQuiz);

renderQuestion();
