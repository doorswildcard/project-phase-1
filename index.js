let initpage = document.querySelector("#initial-page")
let questionContainer = document.querySelector("#question-container")
let answerDiv = document.querySelector("#answers")
let answerbuttons = document.querySelector("#answerbuttons")
let resultsPage = document.querySelector("#results-page")
let controls = document.querySelector(".controls")
let button = document.querySelector("#start")

fetch('http://localhost:3000/trivia')
    .then((res) => res.json())
    .then((data) => console.log(data))


button.addEventListener('click', () =>
stateTwo()
)


loadInState()
function loadInState(){
    questionContainer.style.display = 'none'
    answerDiv.style.display = 'none'
    answerbuttons.style.display = 'none'
    resultsPage.style.display = 'none'
    controls.style.display = 'none'


}

function stateTwo(){
    initpage.style.display = 'none'
    questionContainer.style.display = 'block'
    answerDiv.style.display = 'block'
    answerbuttons.style.display = 'block'
}
function stateThree(){

}
