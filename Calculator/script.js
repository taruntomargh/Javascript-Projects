const display = document.getElementById("display");

function addToDisplay(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function clearSingleDigit(){
    display.value = display.value.slice(0, display.value.length - 1);
}

function calculate(){
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = error;
    }
}

