// creating variables
let data;
const grid = document.querySelector('.grid');
const exchangeDate = document.querySelector('.header__date');
const currency1 = document.querySelector('#currency1');
const amount = document.querySelector('#amount');
const result = document.querySelector('.calculation__result');
const toggle = document.querySelector('.calculation__toggle');
let rate1;
let rate2;
let sum;

// I making a request, get data in JSON format and convert it to JS format
fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
  .then((response) => response.json())
  .then((json) => { data = json 

// setTimeout(function () {

  // iterating over the resulting object
  data.forEach(function (el) {

    // prescribing the layout of the table with data
    let html = `<div class="grid__item">
                  <div class="grid__txt">${el.txt}</div>
                  <div class="grid__rate">${el.rate}</div>
                  <div class="grid__cc">${el.cc}</div>
                </div>`;
    grid.innerHTML += html;

    // adding currency types as options for select
    let option = document.createElement('option');
    option.innerText = el.cc;
    currency1.appendChild(option);
  });
    
  // loning we get a new "select"
  let currency2 = currency1.cloneNode(true);
  currency2.id = 'currency2';
  currency1.insertAdjacentElement('beforebegin', currency2);

  // adding events
  currency2.addEventListener('change', getRate2);
  currency1.addEventListener('change', getRate1);
  amount.addEventListener('input', getAmount);
  toggle.addEventListener('click', changeOrder);

  // switching "selects"
  function changeOrder() {
    currency1.classList.toggle('order2');
    currency2.classList.toggle('order1');
  }

  // amount calculation
  function getAmount() {
    sum = amount.value * (rate1 / rate2);
    result.innerText = sum;
  }
  // geting the exchange rate according to the second selected currency
  function getRate2() {
    data.forEach(function (el) {
      if (currency2.value === el.cc) {
        rate2 = el.rate;
      }
    });
  }
  // geting the exchange rate according to the first selected currency
  function getRate1() {
    data.forEach(function (el) {
      if (currency1.value === el.cc) {
        rate1 = el.rate;
      }
    });
  }
  // adding date
  exchangeDate.innerHTML = data[0].exchangedate;
});
