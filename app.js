console.log("HELLO INDIA PLATOON!")
// Your function(s) should go here that will interact with the webpage or DOM

// Create the function to choose a target number unknow to the user
function getTargetNumber(min, max) {
    let minCeiled = Math.ceil(min);
    let maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
let targetNumber = getTargetNumber(1, 100)
console.log("Target number: ", targetNumber)

// Take the users input
const getUserInput = () => {

    let userGuessElem = document.getElementById("user-input-guess")
    if (userGuessElem) {
        let userGuessString = userGuessElem.value
        console.log("userguess: ", userGuessString)

        //broken logic because the userGuess was being compared as a string and not an int
        let userGuess = parseInt(userGuessString)

        let userConfirmation = document.getElementById("userConfirmation")

        if (userGuess >= 1 && userGuess <= 100) {
            userConfirmation.innerHTML = "You guessed " + userGuess
            console.log("confirmation: ", userGuess)
            return userGuess
        } else {
            userConfirmation.innerHTML = "EHHH Out of Bounds"
            return null
        }
    }
    return null
}


const handleFormSubmit = (evt) => {
    evt.preventDefault() // stops a default behavour like page refresh

    // get the return of getUserInput()
    const currentGuess = getUserInput()
    const nextDirections = document.getElementById("userConfirmation")
// Compare the users input against the target number
// if the guess is correct, say so, if not return a direction to guess next
    if (currentGuess !== null) { //it shouldn't because using required as a input prop
        const feedbackReturn = nextGuessDirections(currentGuess, targetNumber)

        nextDirections.innerHTML = feedbackReturn
    }
    
    //call the append function ti add to the list
    appendGuess(currentGuess)

    // clear
    document.getElementById("user-input-guess").value = ""
    return
}

// create a single function that takes an input from handleFormSubmit and  returns next gess directions
const nextGuessDirections = (currentGuess, target) => {
     let pageBGColor = document.body.style.backgroundColor
    
    if (currentGuess === targetNumber) {
        // tempBGBody.classList.add("good-guess")
        pageBGColor = "green"
        console.log("Correct Guess! Congrats")
        // Update dom to show message to user
        return "Correct Guess! Congrats"
    } else if (currentGuess > targetNumber) {
        console.log("Your guess is too high")
        // update dom to show message to user
        return "Your guess is too high"
    } else {
        console.log("Your guess is too low!")
        // dom update
        return "Your guess is too low!"
    }
}




// If the guess was wrong, insert the guess into the previous guess list as a list item
const appendGuess = (guess) => {
    let newListItem = document.createElement("li")
    //populate the li
    newListItem.textContent = guess

    let parentDiv = document.getElementById("list-of-guesses")
    if (parentDiv) {
        parentDiv.appendChild(newListItem)
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const formElement = document.getElementById("guess-form")

    if (formElement) {
        formElement.addEventListener("submit", handleFormSubmit)
    }
})