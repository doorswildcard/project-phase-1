let initPage = document.querySelector("#initial-page")
let questionContainer = document.querySelector("#question-container")
let questionActually = document.querySelector("#the-actual-question")
let answerButtons = document.querySelector("#answerbuttons")
let resultsPage = document.querySelector("#results-page")
let startButton = document.querySelector("#start")
let questionImage = document.querySelector("#question-image")
let restartButton = document.querySelector("#restart")

const apiUrl = 'http://localhost:3000/trivia'
let originalTriviaArray = []
let miniTriviaArray = []
                              //Choose between next question on answer click or show answer wrong then next question
let buttonArray = Array.from(answerButtons.children) //make the children of the answerbuttons into an array
let playerScore = 0     //player score
let questionAt = 0;     //which question in the trivia are you

 fetch(apiUrl)
    .then((res) => res.json())
      .then((data) => {
        data.forEach(function(questionObject){
            originalTriviaArray.push(Object.values(questionObject)[0])
        })
      }).finally(console.log('succesfully loaded'),console.log(originalTriviaArray))

startButton.addEventListener('click', () =>
startTriviaState()
)
restartButton.addEventListener('click', () => {
    startTriviaState()
})
loadInState()
//change correct answer to green in trivia mode 2

function loadInState(){
    {      //when the page loads in
    questionContainer.style.display = 'none'
    answerButtons.style.display = 'none'
    resultsPage.style.display = 'none'
    restartButton.style.display = 'none'
    questionImage.style.display = 'none'
    startButton.style.display = 'block'
    initPage.style.display = 'block'
}

    setTheButtons(buttonArray) //one time thing is better
}

function startTriviaState(){
    {      //starts the trivia hides necessary elements
    initPage.style.display = 'none'
    restartButton.style.display = 'none'
    resultsPage.style.display = 'none'
    questionContainer.style.display = 'block'
    questionImage.style.display = 'block'   //none = go invisible
   //block = appear
    answerButtons.style.display = 'block'
    }
    randomizeArray()    //randomize array

    if(miniTriviaArray.length != 0 && questionAt == miniTriviaArray.length){returnToZero()} //enables trivia repition by setting both values to 0
    setTheQuestion()    //sets up questions
}

function returnToZero(){    //resets player stats to 0 so trivia can loop again
    questionAt = 0;
    playerScore = 0

}

function resultsState(){
    {              //when you finish the trivia
    initPage.style.display = 'none'         //none = go invisible
    questionContainer.style.display = 'none'    //block = appear
    answerButtons.style.display = 'none'
    questionImage.src = ''
    questionImage.style.display = 'none'
    restartButton.style.display = 'block'
    resultsPage.style.display = 'block'
    }
    let result = () => {
        if(playerScore < miniTriviaArray.length * .2){
            return `${playerScore}/${miniTriviaArray.length} Stop it. Get some help -Michael Jordan`
        } else if (playerScore > miniTriviaArray.length * .2 && playerScore <= miniTriviaArray.length * .5) {
            return `${playerScore}/${miniTriviaArray.length} Execution was bad but the effort was there`
        } else if (playerScore > miniTriviaArray.length * .6 && playerScore <= miniTriviaArray.length * .9) {
            return `${playerScore}/${miniTriviaArray.length} MID`
        } else if (playerScore == miniTriviaArray.length * 1) {
            return `${playerScore}/${miniTriviaArray.length} Too cool for school`
        }
    }           // insults for how well you did


    resultsPage.textContent = result()  // insults u again???
}

let randomNumber = (passedInArray) => {
    min = 0
    max = passedInArray.length - 1
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomizeArray(){
        let minute = []
        for (let index = 0; index < originalTriviaArray.length; index++) {
            minute.push(index)
        }
        while(minute.length > 10){
        minute.splice(minute[randomNumber(minute)], 1)
        }
        minute = shuffle(minute)
        console.log(minute)     //shuffles array so array isnt just random from least to greateest
        miniTriviaArray = minute
}

function shuffle(ShuffleThis){
    let nowIndex = ShuffleThis.length,  randomIndex;
    // swaps victims one by one
    while (nowIndex != 0) {
      // Pick a remaining victim
      randomIndex = Math.floor(Math.random() * nowIndex);
      nowIndex--;
      // And swap it with the current victim.
      [ShuffleThis[nowIndex], ShuffleThis[randomIndex]] = [
        ShuffleThis[randomIndex], ShuffleThis[nowIndex]];
    }
    return ShuffleThis
}

function setTheQuestion(){ //This is a lot to digest so take it slow.
    if(miniTriviaArray != [] && questionAt == miniTriviaArray.length){return resultsState()} else { } //if at the last index go to results
    questionImage.src = originalTriviaArray[miniTriviaArray[questionAt]].image
    // questionImage.width = 800   //sets image width to 800**
    // questionImage.height = 600  //sets image height to 600**
    questionActually.textContent = originalTriviaArray[miniTriviaArray[questionAt]].question //Currently sets the first question from the array, will change later
    let answers = originalTriviaArray[miniTriviaArray[questionAt]].answers //make the answers from the question into an object
    Object.keys(answers).forEach((key, aIndex) => { //get the answer object and loop through it and give it the key and index as the parameter
        buttonArray.forEach(function(answerButton){  //looping through the buttons
            if(answerButton.id.slice(1) == aIndex+1){ //if the second character of the button is equal to answerIndex +1
                answerButton.textContent = answers[key]   //set the textcontent to the button currently being iterated through
            } else { /*just blank space at the moment might do something with it*/  }
        })
    })
}

function setTheButtons(buttons){    //Just do this function once and watch it work like a charm

    buttons.forEach(function(answerButton){ // now we're looping through the buttonarray
        answerButton.addEventListener('mouseenter', function onHover() { //Hover over the button listener event
            answerButton.style.backgroundColor = 'grey'
        })
        answerButton.addEventListener('mouseleave', function offHover(){ //You stopped hovering
            answerButton.style.backgroundColor = ''
        })
        answerButton.addEventListener('click', function test() {
            if(answerButton.textContent == originalTriviaArray[miniTriviaArray[questionAt]].answers['correct']){ //checking if the right answer
                playerScore++;
                console.log("Correct Answer")

                return setTheQuestion(questionAt++)
            } else if (answerButton.textContent != originalTriviaArray[miniTriviaArray[questionAt]].answers['correct']){ //checking if the wrong answer
                console.log("Wrong answer")

               return  setTheQuestion(questionAt++)
            }
        })
    })
}
