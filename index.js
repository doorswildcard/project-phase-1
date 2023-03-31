fetch('http://localhost:3000/trivia')
    .then((res) => res.json())
    .then((data) => console.log(data))
