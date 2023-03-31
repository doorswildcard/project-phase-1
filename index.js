let initpage = document.querySelector("#initial-page")
let questionContainer = document.querySelector("#question-container")
let answerDiv = document.querySelector("#answers")
let answerbuttons = document.querySelector("#answerbuttons")

fetch('http://localhost:3000/trivia')
    .then((res) => res.json())
    .then((data) => console.log(data))


function stateOne(){
    initpage.style.display = 'none'
}
function stateTwo(){

}
function stateThree(){

}
