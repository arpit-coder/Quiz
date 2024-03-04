const questions = [ 
    {
        question: "which is largest animal in the world?",
        answers: [
            {Text: "Shark", correct:false},
            {Text: "Blue Whale", correct:true},
            {Text: "Elephant", correct:false},
            {Text: "Giraffe", correct:false},
        ]
    },

    {
        question: "which is smallest country in the world?",
        answers: [
            {Text: "Vatican City", correct:true},
            {Text: "Bhutan", correct:false},
            {Text: "Nepal", correct:false},
            {Text: "Sri Lanka", correct:false},
        ]
    },

    {
        question: "which is largest desert in the world?",
        answers: [
            {Text: "Kalahari", correct:false},
            {Text: "Gobi", correct:false},
            {Text: "Sahara", correct:false},
            {Text: "Antartica", correct:true},
        ]
    },

    {
        question: "which is smallest continent in the world?",
        answers: [
            {Text: "Asia", correct:false},
            {Text: "Australia", correct:true},
            {Text: "Arctic", correct:false},
            {Text: "Africa", correct:false},
        ]
    }


];

const questionElement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
   
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextbutton.style.display = "none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerbuttons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
        nextbutton.style.display = "block";
    }

    function showScore(){
        resetState();
        questionElement.innerHTML = `you scored ${score} out of ${questions.length} !`
        nextbutton.innerHTML = "Play Again";
        nextbutton.style.display = "block";
    }

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextbutton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();