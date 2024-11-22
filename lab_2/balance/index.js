let bankAccount = {
    balance: 500,

    deposit: function(amount) {
        this.balance += amount;
        document.getElementById('account').innerText = this.balance + " ₽";
        alert("Сумма успешно внесена!");
    },

    withdraw: function(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            document.getElementById('account').innerText = this.balance + " ₽";
            alert("Сумма успешно снята!");
        } else {
            alert("Недостаточно средств на счете!");
        }
    },
};


function deposit() {
    let amount = parseFloat(document.getElementById('amount-input').value);

    if (isNaN(amount) || amount <= 0) {
        alert("Введите положительное число!");
    } else {
        bankAccount.deposit(amount);
        document.getElementById('amount-input').value = ""; 
    }
}


function withdraw() {
    let amount = parseFloat(document.getElementById('amount-input').value);

    if (isNaN(amount) || amount <= 0) {
        alert("Введите положительное число!");
    } else {
        bankAccount.withdraw(amount);
        document.getElementById('amount-input').value = ""; 
    }
}
