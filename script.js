function rungeKutta4(f, a, b, n, alpha) {
    // Compute step size
    let h = (b - a) / n;
    // Initialize arrays to store results
    let t = new Array(n + 1);
    let w = new Array(n + 1);
    // Set initial conditions
    t[0] = a;
    w[0] = alpha;
    // Perform Runge-Kutta 4th Order method
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
        // Validate the function string
        if (!/^[a-zA-Z0-9\s\+\-\*\/\(\)\.\,\[\]\^\%\&\|\!\<\>\=\~\`\@\#\$\^\\]+$/.test(funcStr)) {
            throw new Error("Invalid characters in function.");
        }
        // Create a safe function from the string input with predefined Math functions
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

        const functionString = `with(Math){return (${funcStr})}`;
        return new Function('t', 'y', functionString);
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

    if (!funcStr) {
        alert("Please enter a valid function.");
        return;
    }

    try {
        console.log("Function String:", funcStr);  // Debug: Check the input function string
        const f = parseFunction(funcStr);
        console.log("Parsed Function:", f.toString());  // Debug: Check the parsed function

        const result = rungeKutta4(f, a, b, n, alpha);
        console.log("Result:", result);  // Debug: Check the result object

        // Display calculations
        const calculationsContent = document.getElementById('calculationsContent');
        calculationsContent.innerHTML = '';

        // Compute h once and reuse
        const h = (b - a) / n;

        for (let i = 0; i < n; i++) {
            // Calculate k1
            let k1 = h * f(result.t[i], result.w[i]);
            console.log(`k1[${i}]:`, k1);

            // Calculate k2
            let k2 = h * f(result.t[i] + h / 2, result.w[i] + k1 / 2);
            console.log(`k2[${i}]:`, k2);

            // Calculate k3
            let k3 = h * f(result.t[i] + h / 2, result.w[i] + k2 / 2);
            console.log(`k3[${i}]:`, k3);

            // Calculate k4
            let k4 = h * f(result.t[i] + h, result.w[i] + k3);
            console.log(`k4[${i}]:`, k4);

            const step = document.createElement('div');
            step.className = 'step';
            step.innerHTML = `
                <div class="formula">Step ${i}: t = ${result.t[i]}, ω = ${result.w[i].toFixed(4)}</div>
                <div class="formula">h = ${h.toFixed(4)}</div>
                <div class="formula">Calculate k1: k1 = h * f(${result.t[i]}, ${result.w[i].toFixed(4)})</div>
                <div class="formula">k1 = ${h.toFixed(4)} * ${f(result.t[i], result.w[i]).toFixed(4)}</div>
                <div class="formula">Calculate k2: k2 = h * f(${result.t[i] + h / 2}, ${result.w[i] + k1 / 2})</div>
                <div class="formula">k2 = ${h.toFixed(4)} * ${f(result.t[i] + h / 2, result.w[i] + k1 / 2).toFixed(4)}</div>
                <div class="formula">Calculate k3: k3 = h * f(${result.t[i] + h / 2}, ${result.w[i] + k2 / 2})</div>
                <div class="formula">k3 = ${h.toFixed(4)} * ${f(result.t[i] + h / 2, result.w[i] + k2 / 2).toFixed(4)}</div>
                <div class="formula">Calculate k4: k4 = h * f(${result.t[i] + h}, ${result.w[i] + k3})</div>
                <div class="formula">k4 = ${h.toFixed(4)} * ${f(result.t[i] + h, result.w[i] + k3).toFixed(4)}</div>
                <div class="formula">Update ω: ω<sub>${i+1}</sub> = ω<sub>${i}</sub> + (k1 + 2 * k2 + 2 * k3 + k4) / 6</div>
                <div class="formula">ω<sub>${i+1}</sub> = ${result.w[i].toFixed(4)} + (${k1.toFixed(4)} + 2 * ${k2.toFixed(4)} + 2 * ${k3.toFixed(4)} + ${k4.toFixed(4)}) / 6</div>
                <div class="formula">ω<sub>${i+1}</sub> = ${result.w[i+1].toFixed(4)}</div>
                <div class="formula">Update t: t<sub>${i+1}</sub> = t<sub>${i}</sub> + h</div>
                <div class="formula">t<sub>${i+1}</sub> = ${result.t[i].toFixed(4)} + ${h.toFixed(4)}</div>
                <div class="formula">t<sub>${i+1}</sub> = ${result.t[i+1].toFixed(4)}</div>
            `;
            calculationsContent.appendChild(step);
        }

        // Populate the table
        const tableBody = document.querySelector('#resultTable tbody');
        tableBody.innerHTML = '';
        for (let i = 0; i <= n; i++) {
            tableBody.innerHTML += `<tr><td>${i}</td><td>${result.t[i]}</td><td>${result.w[i].toFixed(4)}</td></tr>`;
        }
    } catch (e) {
        alert(`Error: ${e.message}`);
    }
}

function adjustWidth(input) {
    // Calculate the width based on the number of characters
    const charCount = input.value.length;
    const minWidth = 100;
    const maxWidth = 300;
    const stepSize = (maxWidth - minWidth) / 100; // Assuming maximum character count is 100

    const newWidth = Math.min(maxWidth, minWidth + charCount * stepSize);
    input.style.width = `${newWidth}px`;
}
