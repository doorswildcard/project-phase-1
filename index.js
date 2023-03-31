let initpage = document.querySelector("#initial-page")
let questionContainer = document.querySelector("#question-container")

fetch('http://localhost:3000/trivia')
    .then((res) => res.json())
    .then((data) => console.log(data))

stateOne()
function stateOne(){
    initpage.style.display = 'none'
}
function stateTwo(){

}
function stateThree(){

}
