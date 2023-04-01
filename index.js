let initpage = document.querySelector("#initial-page")
let questionContainer = document.querySelector("#question-container")
let answerDiv = document.querySelector("#answers")
let answerbuttons = document.querySelector("#answerbuttons")
let resultsPage = document.querySelector("#results-page")
let controls = document.querySelector(".controls")
let button = document.querySelector("#start")

const apiUrl = 'http://localhost:3000/trivia'
let questionsA = []

fetch(apiUrl)
    .then((res) => res.json())
      .then((data) => {
        data.forEach(function(questionObject){
            questionsA.push(Object.values(questionObject)[0])
        })
      }).finally(console.log('succesfully loaded'))




button.addEventListener('click', () =>

resultsState()

)

loadInState()

//change correct answer to green

function loadInState(){
    questionContainer.style.display = 'none'
    answerDiv.style.display = 'none'
    answerbuttons.style.display = 'none'
    resultsPage.style.display = 'none'
    controls.style.display = 'none'

}

function startTriviaState(){
    initpage.style.display = 'none'
    questionContainer.style.display = 'block'
    answerDiv.style.display = 'block'
    answerbuttons.style.display = 'block'
    setTheQuestion()
}


function resultsState(){
    initpage.style.display = 'none'
    questionContainer.style.display = 'none'
    answerDiv.style.display = 'none'
    answerbuttons.style.display = 'none'
    resultsPage.style.display = 'block'

    resultsPage.addEventListener('click', () =>{
        startTriviaState()                  //CLICK THE FAIL WHEN YOU SEE ME TEXT
    })
}

function setTheQuestion(){ //This is a lot to digest so take it slow.
    questionContainer.textContent = questionsA[0].question //Currently sets the first question from the array, will change later

    let buttonArray = Array.from(answerbuttons.children) //make the children of the answerbuttons into an array
    let answers = questionsA[0].answers //make the answers from the question into an object

    Object.keys(answers).forEach((key, aIndex) => { //get the answer object and loop through it and give it the key and index as the parameter

        buttonArray.forEach(function(button){ // now we're looping through the buttonarray
            button.addEventListener('mouseenter', () => { //Hover over the button listener event
                button.style.backgroundColor = 'grey'
            })
            button.addEventListener('mouseleave', () =>{ //You stopped hovering
                button.style.backgroundColor = ''
            })
            if(button.id.slice(1) == aIndex+1){ //if the second character of the button is equal to answerIndex +1
            button.textContent = answers[key]   //set the textcontent to the button currently being iterated through
            } else {
                //just blank space atm might do something with it
            }
           console.log(button.textContent)  //for sanity purposes
        })
    })


}
