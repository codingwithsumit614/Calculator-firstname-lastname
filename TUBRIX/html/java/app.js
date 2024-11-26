// Select display and buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Store current input and operator
let currentInput = '';
let operator = '';
let previousInput = '';

// Event listener for buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // If the user presses 'C', clear the display
        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.textContent = '0';
            return;
        }

        // If the user presses '=', perform the calculation
        if (value === '=') {
            if (previousInput && operator && currentInput) {
                currentInput = operate(previousInput, operator, currentInput);
                display.textContent = currentInput;
                operator = '';
                previousInput = '';
            }
            return;
        }

        // Handle the operators
        if (['+', '-', '*', '/'].includes(value)) {
            if (previousInput && operator && currentInput) {
                currentInput = operate(previousInput, operator, currentInput);
                display.textContent = currentInput;
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
            return;
        }

        // Handle normal numbers and decimals
        if (value === '.' && currentInput.includes('.')) {
            return; // Prevent multiple decimals
        }

        currentInput += value;
        display.textContent = currentInput;

        // Adjust the font size of the display based on the input length
        adjustFontSize();
    });
});

// Function to adjust font size based on input length
function adjustFontSize() {
    if (currentInput.length > 12) {
        display.style.fontSize = '2rem'; // Reduce font size if the input is too long
    } else if (currentInput.length > 8) {
        display.style.fontSize = '2.5rem'; // Medium font size
    } else {
        display.style.fontSize = '3rem'; // Default font size
    }
}

// Function to perform the arithmetic operations
function operate(a, operator, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            if (b === 0) {
                alert('Error: Division by 0');
                return '0';
            }
            return (a / b).toString();
        default:
            return '';
    }
}

