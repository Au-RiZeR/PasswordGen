let passLength = 8
let lowercase = false
let uppercase = false
let numbers = false
let symbols = false
let savedParamaters = 0
const form = document.getElementById
("passwordGeneratorForm")
const passwordDisplay = document.getElementById
("passwordDisplay")
const LOWER_CHAR_CODES = arrayFromLowtoHigh(97, 122)
const UPPER_CHAR_CODES = arrayFromLowtoHigh(65, 90)
const NUMBER_CHAR_CODES = arrayFromLowtoHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowtoHigh(33, 47).concat(
    arrayFromLowtoHigh(58, 64)
).concat(
    arrayFromLowtoHigh(91, 96)
    ).concat(
        arrayFromLowtoHigh(123, 126)
    )

function generatePassword(characterAmount, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
    let charCodes = []
    if (includeLowercase) charCodes = charCodes.concat(LOWER_CHAR_CODES)
    if (includeUppercase) charCodes = charCodes.concat(UPPER_CHAR_CODES)
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
    const passwordCharacters = []
    for(let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode))
    }
    return passwordCharacters.join("")
}

function arrayFromLowtoHigh(low, high) {
    const array = []
    for (let i = low; i <= high; i++) {
    array.push(i)
    }
    return array
}

form.addEventListener("click", useSaved)

function useSaved() {
    if(savedParamaters != 0) {
        if(confirm("Would you like to use your previous parameters? (Use the Cancel button if you do not)")) {
            displayPassword()
        } else {
            reset()
            questionaire()
        }
    } else {
        reset()
        questionaire()
    }
 }

function questionaire() {
    lengthPrompt()
    if(passLength == null) {
        passLength = 8
    } else {
    if(confirm("Include Lowercase? (Use the Cancel button if you do not)")) {
        lowercase = true
    }
    if(confirm("Include Uppercase? (Use the Cancel button if you do not)")) {
        uppercase = true
    }
    if(confirm("Include Numbers? (Use the Cancel button if you do not)")) {
        numbers = true
    } 
    if(confirm("Include symbols? (Use the Cancel button if you do not)")) {
        symbols = true
    }
    if(lowercase == false && uppercase == false && numbers == false && symbols == false) {
        console.log("User wants a password " + passLength + " characters long with no characters.🤔")
        passwordDisplay.innerText = "Please choose characters to use."
    } else {
    displayPassword()
    let annoyingNoiseHasRun = savedParamaters
    var myAudio = new Audio("lockSound.mp3")
    if (annoyingNoiseHasRun == 0) {
        myAudio.play()
        document.body.style.backgroundImage = "url('safeField.jpg')"
    }
    savedParamaters++
    }
    }
}

function reset() {
    passLength = 8
    lowercase = false
    uppercase = false
    numbers = false
    symbols = false
}

function displayPassword() {
    const password = generatePassword(passLength, lowercase, uppercase, numbers, symbols)
    passwordDisplay.innerText = password
}

function lengthPrompt() {
    passLength = prompt("Enter Length of Password from 8 to 128", passLength)
    if(passLength >= 8 && passLength <= 128) {
        console.log("The password length fits the criteria.")
    } else {
        if(passLength == null) {
            console.log("Cancelled.")
        } else {
            console.log("User can't read.")
            lengthPrompt()
        }
    }
}