'use strict';

// selectors

const inputEl = document.querySelector('.input');
const enterEl = document.querySelector('.enter');
const resultEl = document.querySelector('.result');

// binomial expansion function
function expand(expr) {
  // expr is: (ax+b)^power
  // find power, a, b, and variable (x, m or k...)

  const power = Number(expr.split('^')[1]);
  if (power === 0) return '1';
  if (power === 1) return expr.split(')')[0].split('(').join('');

  const variable = expr
    .split('')
    .filter(item => /[a-zA-Z]/.test(item))
    .join('');

  const preX = expr.split(variable)[0];
  let a = preX === '(' ? 1 : preX.split('(').join('');
  a = a === '-' ? -1 : Number(a);

  let b = Number(expr.split(variable)[1].split(')')[0]);

  // factorial function
  const fact = function (n) {
    let result = n;
    if (n <= 1) return 1;
    result *= fact(n - 1);
    return result;
  };

  // combinations calculator function
  const C = (n, r) => fact(n) / (fact(n - r) * fact(r));

  const ansArr = [];
  for (let i = 0; i <= power; i++) {
    const varPart =
      power - i === 1
        ? variable
        : power - i === 0
        ? ``
        : `${variable}^${power - i}`;
    const numPart = C(power, i) * a ** (power - i) * b ** i;
    const sign = numPart < 0 ? '' : i === 0 ? '' : '+';
    ansArr.push(sign + numPart + varPart);
  }

  // remove 1s (e.g. from 1x^2) & omit any 0 terms
  for (let i = 0; i < ansArr.length; i++) {
    const termArr = ansArr[i].split('');
    if (termArr.slice(0, 2).join('') === `1${variable}`) {
      termArr.shift();
      termArr.unshift(i === 0 ? '' : '+');
      ansArr[i] = termArr.join('');
    } else if (termArr.slice(0, 3).join('') === `-1${variable}`) {
      termArr[1] = '';
      ansArr[i] = termArr.join('');
    }
    if (ansArr[i][1] === '0' && i !== 0) ansArr[i] = '';
  }

  return ansArr.join('');
}

function displayResult() {
  const q = inputEl.value;
  if (q) {
    resultEl.textContent = expand(q);
    resultEl.style.color = '#111';
  } else {
    resultEl.textContent = 'Result...';
    resultEl.style.color = '#666';
  }
}

enterEl.addEventListener('click', function () {
  const q = inputEl.value;
  resultEl.textContent = q ? expand(q) : 'Result...';
});

enterEl.addEventListener('click', displayResult);

inputEl.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') displayResult();
});
