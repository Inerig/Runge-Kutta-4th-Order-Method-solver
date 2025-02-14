for (let i = 0; i < n; i++) {
    const step = document.createElement('div');
    step.className = 'step';

    // Declare k1, k2, k3, k4 before using them in the template
    const t_i = result.t[i];
    const w_i = result.w[i];

    const k1 = h * f(t_i, w_i);
    const k2 = h * f(t_i + h / 2, w_i + k1 / 2);
    const k3 = h * f(t_i + h / 2, w_i + k2 / 2);
    const k4 = h * f(t_i + h, w_i + k3);

    step.innerHTML = 
        <div class="formula">Step ${i}: t = ${t_i}, ω = ${w_i.toFixed(4)}</div>
        <div class="formula">h = ${h.toFixed(4)}</div>
        <div class="formula">Calculate k1: k1 = h * f(${t_i}, ${w_i.toFixed(4)})</div>
        <div class="formula">k1 = ${h.toFixed(4)} * ${f(t_i, w_i).toFixed(4)} = ${k1.toFixed(4)}</div>
        <div class="formula">Calculate k2: k2 = h * f(${t_i + h / 2}, ${w_i + k1 / 2})</div>
        <div class="formula">k2 = ${h.toFixed(4)} * ${f(t_i + h / 2, w_i + k1 / 2).toFixed(4)} = ${k2.toFixed(4)}</div>
        <div class="formula">Calculate k3: k3 = h * f(${t_i + h / 2}, ${w_i + k2 / 2})</div>
        <div class="formula">k3 = ${h.toFixed(4)} * ${f(t_i + h / 2, w_i + k2 / 2).toFixed(4)} = ${k3.toFixed(4)}</div>
        <div class="formula">Calculate k4: k4 = h * f(${t_i + h}, ${w_i + k3})</div>
        <div class="formula">k4 = ${h.toFixed(4)} * ${f(t_i + h, w_i + k3).toFixed(4)} = ${k4.toFixed(4)}</div>
        <div class="formula">Update ω: ω<sub>${i+1}</sub> = ω<sub>${i}</sub> + (k1 + 2 * k2 + 2 * k3 + k4) / 6</div>
        <div class="formula">ω<sub>${i+1}</sub> = ${w_i.toFixed(4)} + (${k1.toFixed(4)} + 2 * ${k2.toFixed(4)} + 2 * ${k3.toFixed(4)} + ${k4.toFixed(4)}) / 6</div>
        <div class="formula">ω<sub>${i+1}</sub> = ${result.w[i+1].toFixed(4)}</div>
        <div class="formula">Update t: t<sub>${i+1}</sub> = t<sub>${i}</sub> + h</div>
        <div class="formula">t<sub>${i+1}</sub> = ${t_i.toFixed(4)} + ${h.toFixed(4)}</div>
        <div class="formula">t<sub>${i+1}</sub> = ${result.t[i+1].toFixed(4)}</div>
    ;

    calculationsContent.appendChild(step);
}

// Populate the table
const tableBody = document.querySelector('#resultTable tbody');
tableBody.innerHTML = '';
for (let i = 0; i <= n; i++) {
    tableBody.innerHTML += <tr><td>${i}</td><td>${result.t[i]}</td><td>${result.w[i].toFixed(4)}</td></tr>;
}
