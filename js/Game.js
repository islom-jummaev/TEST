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
        question: "console.log (0.1 + 0.2 == 0.3) " ,
        choice1: 'true',
        choice2: 'false',
        choice3: 'NaN',
        choice4: 'undefined',
        answer: 2,
    },
    {
        question:
            'console.log (1 +  "2" + "2")',
        choice1: "122",
        choice2: "32",
        choice3: "NaN2",
        choice4: "NaN",
        answer: 1,
    },
    {
        question: "console.log(String.raw`HelloTwitter\nworld`)",
        choice1: "HelloTwitter\nworld",
        choice2: "HelloTwitter world",
        choice3: "HelloTwitter world",
        choice4: "33%",
        answer: 3,
    },
    {
        question: "console.log(3 > 2 > 1)",
        choice1: "undefined",
        choice2: "NaN",
        choice3: "false",
        choice4: "true",
        answer: 3,
    },
    {
        question: "console.log(typeof typeof 1)",
        choice1: "true",
        choice2: "Number",
        choice3: "1",
        choice4: "string",
        answer: 4,
    },
    {
        question: "console.log(!0)",
        choice1: "0",
        choice2: "1",
        choice3: "false",
        choice4: "true",
        answer: 4,
    },
    {
        question: "let Number=95 console.log(Number++)",
        choice1: "95",
        choice2: "96",
        choice3: "undefined",
        choice4: "SyntaxError",
        answer: 2,
    },
    {
        question: "console.result='2020'-'2021'",
        choice1: "Null",
        choice2: "undefined",
        choice3: "10",
        choice4: "1",
        answer: 3,
    },
    {
        question: "console.log(0.1+0.2==0.3)",
        choice1: "true",
        choice2: "undefined",
        choice3: "false",
        choice4: "Null",
        answer: 1,
    },
    {
        question: "console.log(2**2**3)",
        choice1: "12",
        choice2: "16",
        choice3: "128",
        choice4: "256",
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