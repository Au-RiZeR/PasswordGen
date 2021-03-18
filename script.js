const characterAmountRange = document.getElementById
("characterAmountRange")
const characterAmountNumber = document.getElementById
("characterAmountNumber")
const includeLowercaseElement = document.getElementById
("includeLowercase")
const includeUppercaseElement = document.getElementById
("includeUppercase")
const includeNumbersElement = document.getElementById
("includeNumbers")
const includeSymbolsElement = document.getElementById
("includeSymbols")
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

characterAmountNumber.addEventListener("input", syncCharacterAmount)
characterAmountRange.addEventListener("input", syncCharacterAmount)

form.addEventListener("submit", e => {
    document.body.style.backgroundImage = "url('safeField.jpg')";
    e.preventDefault()
    const characterAmount = characterAmountNumber.value
    const includeLowercase = includeLowercaseElement.checked
    console.log(includeLowercase)
    const includeUppercase = includeUppercaseElement.checked
    console.log(includeUppercase)
    const includeNumbers = includeNumbersElement.checked
    const includeSymbols = includeSymbolsElement.checked
    const password = generatePassword(characterAmount, includeLowercase, includeUppercase, includeNumbers, includeSymbols)
    passwordDisplay.innerText = password
} )

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

function syncCharacterAmount(e) {
    const value = e.target.value
    characterAmountNumber.value = value
    characterAmountRange.value = value
}