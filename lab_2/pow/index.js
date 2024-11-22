function pow() {
   
    let Y = Number(document.getElementById('userInput').value);

    const calculator = {
        power: function (Y) {
            return Math.pow(Y - 2, Y);
        }
    };

    if (isNaN(Y) || Y <= 0) {
        alert("Введите корректное положительное число!");
    } else {
        document.getElementById('res').innerText = (Y - 2) + "^" + Y + " = " + calculator.power(Y);
    }
}
