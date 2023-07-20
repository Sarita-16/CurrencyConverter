let country_code = {
  INR: "INR",
  KRW: "KRW",
  AED: "AED",
  USD: "USD",
  BRL: "BRL",
  NPR: "NPR",
  ARS: "ARS",
  AUD: "AUD",
  ESP: "ESP",
  EUR: "EUR",
};

const dropList = document.querySelectorAll(".to-form select");
fromCurrency = document.querySelector(".fromSection select");
toCurrency = document.querySelector(".toSection select");

getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_code) {
    //console.log(currency_code);

    // Selected INR by default as FROM currency & KRW as TO currency
    let selected;
    if (i == 0) {
      selected = currency_code == "INR" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "KRW" ? "selected" : "";
    }

    // Creating option tag with passing currency as a text and value
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    // Inserting option tag inside the select tag
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target); // Calling loadFlag with passing target element as an argument
  });
}

function loadFlag(element) {
  for (code in country_code) {
    if (code == element.value) {
      // If currency code of country list is equal to option value
      let imgTag = element.parentElement.querySelector("img"); // Selecting img tag of particular drop list
      // Passing country code of a selected currency code in a img url
      imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
    }
  }
}

getButton.addEventListener("click", (e) => {
  e.preventDefault(); // preventing form from submitting
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector(".input-group input");
  let amountValue = amount.value;
  // If user don't enter any value or 0 then we'll put 1 value by default in the input field
  if (amountValue == "" || amountValue == "0") {
    amount.value = "1";
    amountValue = 1;
  }

  let url = `https://v6.exchangerate-api.com/v6/c9074ebdcdf7676fc47b760c/latest/${fromCurrency.value}`;
  // Fetching API response and returning it with parsing into js obj & in another then method receiving the that obj
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      //console.log(exchangeRate);
      let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);
      //console.log(totalExchangeRate);
      const exchangeRateTxt = document.querySelector(".result-amount");
      exchangeRateTxt.innerHTML = ` <input type="number" value="${totalExchangeRate}"/>`;
    });
}
