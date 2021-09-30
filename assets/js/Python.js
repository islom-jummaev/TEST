const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [ 
    {
        question:
            'Python asoschisi qachon ishlab chiqarilgan',
        choice1: "Van Gvido 1991",
        choice2: "Jeff 1993",
        choice3: "Bill Geyts 1983",
        choice4: "Petter Jons 1978",
        answer: 1,
    },
    {
        question: "x=[_for_in range(1,5)] print(x)",
        choice1: '[1_2_3_4]',
        choice2: '[1,2,3,4]',
        choice3: '[_,_,_,_]',
        choice4: '[_____]',
        answer: 2,
    },
    {
        question: "x={4,5,6} print(x[0])",
        choice1: "45",
        choice2: "SyntaxError",
        choice3: "TypeError",
        choice4: "5",
        answer: 3,
    },
    {
        question: "x='50.5' print(int(x))",
        choice1: "50",
        choice2: "50.0",
        choice3: "ValueError",
        choice4: "None",
        answer: 3,
    },
    {
        question: "x='abs245' print(x.isdigit())",
        choice1: "true",
        choice2: "MethodError",
        choice3: "None",
        choice4: "false",
        answer: 4,
    },
    {
        question: "x,z=2+3,'=5' print(z)",
        choice1: "2+3",
        choice2: "5",
        choice3: "6",
        choice4: "=5",
        answer: 4,
    },
    {
        question: "x=[0,1,2,3] print(sum(x))",
        choice1: "4",
        choice2: "6",
        choice3: "7",
        choice4: "SyntaxError",
        answer: 2,
    },
    {
        question: "x=['python'] print(x[0])",
        choice1: "p",
        choice2: "pyt",
        choice3: "python",
        choice4: "SyntaxError",
        answer: 3,
    },
    {
        question: "x='0123456' print(len(x))",
        choice1: "7",
        choice2: "8",
        choice3: "TypeError",
        choice4: "Null",
        answer: 1,
    },
    {
        question: "x=[1,2,3,4] print(x[:])",
        choice1: "TypeError",
        choice2: "SyntaxError",
        choice3: "[4,3,2,1]",
        choice4: "[1,2,3,4]",
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()