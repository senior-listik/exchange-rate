let data;
const grid = document.querySelector('.grid');
const exchangeDate = document.querySelector('.date');
const currency1 = document.querySelector('#currency1');
const amount = document.querySelector('#amount');
const result = document.querySelector('.result');
const toggle = document.querySelector('.toggle');
let rate1;
let rate2;
let sum;
fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
  .then((response) => response.json())
  .then((json) => (data = json));

setTimeout(function () {
  data.forEach(function (el) {
    let html = `<div class="grid__item">
        <div class="grid__txt">${el.txt}</div>
        <div class="grid__rate">${el.rate}</div>
        <div class="grid__cc">${el.cc}</div>
        </div>`;
    grid.innerHTML += html;
    let option = document.createElement('option');
    option.innerText = el.cc;
    currency1.appendChild(option);
  });
  let currency2 = currency1.cloneNode(true);
  currency2.id = 'currency2';
  amount.insertAdjacentElement('beforebegin', currency2);

  currency2.addEventListener('change', getRate2);
  currency1.addEventListener('change', getRate1);
  amount.addEventListener('input', getAmount);
  toggle.addEventListener('click', changeOrder);

  function changeOrder() {
    currency1.classList.toggle('order3');
    currency2.classList.toggle('order1');
  }

  function getAmount() {
    sum = amount.value * (rate1 / rate2);
    result.innerText = sum;
  }

  function getRate2() {
    data.forEach(function (el) {
      if (currency2.value === el.cc) {
        rate2 = el.rate;
      }
    });
  }

  function getRate1() {
    data.forEach(function (el) {
      if (currency1.value === el.cc) {
        rate1 = el.rate;
      }
    });
  }

  exchangeDate.innerHTML = data[0].exchangedate;
}, 300);
