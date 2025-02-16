function rungeKutta4(f, a, b, n, alpha) {
    let h = (b - a) / n;
    let t = new Array(n + 1);
    let w = new Array(n + 1);
    t[0] = a;
    w[0] = alpha;

    for (let i = 0; i < n; i++) {
        let k1 = h * f(t[i], w[i]);
        let k2 = h * f(t[i] + h / 2, w[i] + k1 / 2);
        let k3 = h * f(t[i] + h / 2, w[i] + k2 / 2);
        let k4 = h * f(t[i] + h, w[i] + k3);
        w[i + 1] = w[i] + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        t[i + 1] = t[i] + h;
    }

    return { t: t, w: w };
}

function parseFunction(funcStr) {
    try {
        if (!/^[a-zA-Z0-9\s\+\-\*\/\(\)\.\,\[\]\^\%\&\|\!\<\>\=\~\`\@\#\$\^\\]+$/.test(funcStr)) {
            throw new Error("Invalid characters in function.");
        }

        const mathFunctions = {
            Math: Math,
            exp: Math.exp,
            log: Math.log,
            sqrt: Math.sqrt,
            pow: Math.pow,
            sin: Math.sin,
            cos: Math.cos,
            tan: Math.tan,
            asin: Math.asin,
            acos: Math.acos,
            atan: Math.atan,
            sinh: Math.sinh,
            cosh: Math.cosh,
            tanh: Math.tanh,
            abs: Math.abs,
            floor: Math.floor,
            ceil: Math.ceil,
            round: Math.round,
            trunc: Math.trunc,
            random: Math.random
        };

        return new Function('t', 'y', `with(Math){return (${funcStr})}`);
    } catch (error) {
        console.error("Error parsing function:", error);
        throw new Error("Invalid function input. Please make sure your function is correctly formatted.");
    }
}

function solveAndDisplay() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const n = parseInt(document.getElementById('n').value);
    const alpha = parseFloat(document.getElementById('alpha').value);
    const funcStr = document.getElementById('functionInput').value.trim();
    const decimalPlaces = parseInt(document.getElementById('decimalPlaces').value) || 4;

    if (!funcStr) {
        alert("Please enter a valid function.");
        return;
    }

    try {
        const f = parseFunction(funcStr);
        const result = rungeKutta4(f, a, b, n, alpha);

        const calculationsContent = document.getElementById('calculationsContent');
        calculationsContent.innerHTML = '';

        const h = (b - a) / n;

        for (let i = 0; i < n; i++) {
            let k1 = h * f(result.t[i], result.w[i]);
            let k2 = h * f(result.t[i] + h / 2, result.w[i] + k1 / 2);
            let k3 = h * f(result.t[i] + h / 2, result.w[i] + k2 / 2);
            let k4 = h * f(result.t[i] + h, result.w[i] + k3);

            const step = document.createElement('div');
            step.className = 'step';
            step.innerHTML = `
                <div class="formula">Step ${i}: t = ${result.t[i].toFixed(decimalPlaces)}, ω = ${result.w[i].toFixed(decimalPlaces)}</div>
                <div class="formula">h = ${h.toFixed(decimalPlaces)}</div>
                <div class="formula">k1 = ${h.toFixed(decimalPlaces)} * ${f(result.t[i], result.w[i]).toFixed(decimalPlaces)}</div>
                <div class="formula">k2 = ${h.toFixed(decimalPlaces)} * ${f(result.t[i] + h / 2, result.w[i] + k1 / 2).toFixed(decimalPlaces)}</div>
                <div class="formula">k3 = ${h.toFixed(decimalPlaces)} * ${f(result.t[i] + h / 2, result.w[i] + k2 / 2).toFixed(decimalPlaces)}</div>
                <div class="formula">k4 = ${h.toFixed(decimalPlaces)} * ${f(result.t[i] + h, result.w[i] + k3).toFixed(decimalPlaces)}</div>
                <div class="formula">ω<sub>${i+1}</sub> = ${result.w[i].toFixed(decimalPlaces)} + (${k1.toFixed(decimalPlaces)} + 2 * ${k2.toFixed(decimalPlaces)} + 2 * ${k3.toFixed(decimalPlaces)} + ${k4.toFixed(decimalPlaces)}) / 6</div>
                <div class="formula">ω<sub>${i+1}</sub> = ${result.w[i+1].toFixed(decimalPlaces)}</div>
                <div class="formula">t<sub>${i+1}</sub> = ${result.t[i].toFixed(decimalPlaces)} + ${h.toFixed(decimalPlaces)}</div>
                <div class="formula">t<sub>${i+1}</sub> = ${result.t[i+1].toFixed(decimalPlaces)}</div>
            `;
            calculationsContent.appendChild(step);
        }

        const tableBody = document.querySelector('#resultTable tbody');
        tableBody.innerHTML = '';
        for (let i = 0; i <= n; i++) {
            tableBody.innerHTML += `<tr>
                <td>${i}</td>
                <td>${result.t[i].toFixed(decimalPlaces)}</td>
                <td>${result.w[i].toFixed(decimalPlaces)}</td>
            </tr>`;
        }
    } catch (e) {
        alert(`Error: ${e.message}`);
    }
}

function adjustWidth(input) {
    const charCount = input.value.length;
    const minWidth = 100;
    const maxWidth = 300;
    const stepSize = (maxWidth - minWidth) / 100;
    const newWidth = Math.min(maxWidth, minWidth + charCount * stepSize);
    input.style.width = `${newWidth}px`;
}
