function checkTriangleExistence() {
    let a = Number(document.getElementById('a').value);
    let b = Number(document.getElementById('b').value);
    let c = Number(document.getElementById('c').value);
    let answ = document.getElementById('answ');
    answ.textContent = '';
    
    if (a <= 0 || b <= 0 || c <= 0) {
        answ.innerText = "Длины сторон должны быть положительными числами.";
        answ.style.color = "red";
        return;
    }

    if (a < b + c && b < a + c && c < a + b) {
        answ.innerText = "Да, треугольник существует!";
        answ.style.color = "green";
    } else {
        answ.innerText = "Нет, треугольник не существует.";
        answ.style.color = "red";
    }
}
