(function () {
    
    const FORM = document.querySelector(".contact__form")
    let success

    FORM.addEventListener("submit", submitHandler)

    function validate(element) {
        if (element.type === "submit" || element.type === "button" || element.type === "reset") {
            return
        }

        const FEEDBACK = element.parentElement.nextSibling.nextSibling
        const makeFeedback = message => { 
            FEEDBACK.innerText = message
            success = false
        }

        FEEDBACK.innerText = ""
        

        if (element.required && !element.value) {
            return makeFeedback("❌ Udfyld feltet")
        }
      

        if (element.type === "email") {
            if (!includeSymbol(element.value, "@")
                || tooManyAts(element.value)
                || hasIlligalAts(element.value)) {
                return makeFeedback("❌ Udfyld feltet med en email")
            }
        }

        if (element.type === "tel"){
            if(isTooLong(element.value)
            || isTooShort(element.value)
            || !hasLegalCharacters (element.value)){
                return makeFeedback("❌Skriv et gyldigt telefonnummer")
            }
        }
        
    }

    function submitHandler(event) {
        event.preventDefault();
        success = true

        Array.from(event.target).forEach(element => validate(element))
        if (success)FORM.submit()
    }
    const includeSymbol = (string, symbol) => string.includes(symbol)
    const tooManyAts = string => string.split("@").length > 2
    const hasIlligalAts = string => string.indexOf("@") === 0 || string.indexOf("@") === string.length - 1
    

    const isTooLong = (string, maxlength = 20) => string.length > maxlength
    const isTooShort = (string, minlength = 3) => string.length < minlength
    const hasLegalCharacters = (string) => /^[0-9+#\*\s]+$/.test(string)
})()