function generateTable() {
    const input = document.getElementById('n');
    const table = document.getElementById('pifagor_table');
    const n = Number(input.value);

    if (n > 0) {
        table.innerHTML = '';

        for (let i = 1; i <= n; i++) {
            const tr = document.createElement('tr');
            for (let j = 1; j <= n; j++) {
                const td = document.createElement('td');
                td.innerText = i * j;
                if (i === 1 || j === 1) {
                    td.classList.add('header');
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    } else {
        table.innerHTML = '<tr><td>Enter a valid number</td></tr>'; 
    }
}
