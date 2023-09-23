    document.addEventListener("DOMContentLoaded", function () {
        const currencyTab = document.getElementById("currency-tab");
        const exchangeTab = document.getElementById("exchange-tab");
        const currencyConversion = document.getElementById(
          "currency-conversion"
        );
        const exchangeRate = document.getElementById("exchange-rate");
        function hideCurrentTabContent() {
          currencyConversion.style.display = "none";
          exchangeRate.style.display = "none";
        }
        function showTabContent(tabId) {
          const tabContent = document.getElementById(tabId);
          tabContent.style.display = "block";
        }
        hideCurrentTabContent();
        showTabContent("currency-conversion");
        currencyTab.classList.add("active-tab");
        currencyTab.addEventListener("click", function () {
          hideCurrentTabContent();
          showTabContent("currency-conversion");
          currencyTab.classList.add("active-tab");
          exchangeTab.classList.remove("active-tab");
        });

        exchangeTab.addEventListener("click", function () {
          hideCurrentTabContent();
          showTabContent("exchange-rate");
          exchangeTab.classList.add("active-tab");
          currencyTab.classList.remove("active-tab");
        });

        const apiUrl = "http://apilayer.net/api/live";

        // Define the API parameters
        const accessKey = "3f3867b5ab73ead5ed00993984273aab"; // Replace with your actual API key
        const currencies = "PKR";
        const source = "USD";
        const format = 1;

        // Construct the full API URL with parameters
        const fullUrl = `${apiUrl}?access_key=${accessKey}&currencies=${currencies}&source=${source}&format=${format}`;

        // Make the API request using fetch
        fetch(fullUrl)
          .then((response) => response.json())
          .then((data) => {
            // Display the API response
            // const d =JSON.stringify(data, null, 2);
            //  alert(data.quotes.USDPKR);
            rateInput.value = data.quotes.USDPKR.toFixed(2);
            exchangeRateInput.value = data.quotes.USDPKR.toFixed(2);
            amountInput.value = "";
            amountInputs.value = "";
          })
          .catch((error) => {
            // Handle any errors

            console.error("Error:", error);
          });

        const calculateButton = document.getElementById("calculate");
        const amountInputs = document.getElementById("amounts");
        const rateInput = document.getElementById("rate");
        const exSelect = document.getElementById("ex");
        const resultDiv = document.getElementById("results");

        calculateButton.addEventListener("click", function () {
          const amounts = parseFloat(amountInputs.value);
          const rate = parseFloat(rateInput.value);
          const selectedEx = parseFloat(exSelect.value);

          if (!isNaN(amounts) && !isNaN(rate) && !isNaN(selectedEx)) {
            if (amounts >= 20 && rate > 200) {
              resultDiv.style.color = "#0d4528";

              // Subtract the selected ex from the rate
              const adjustedRate = rate - selectedEx;

              // Calculate the result
              const result = amounts * adjustedRate;
              resultDiv.style.color = "#0d4528";
              resultDiv.textContent = `Rs. ${result.toFixed(2)}`;
            } else {
              resultDiv.textContent =
                "Please enter atleast 20$ and rate must be greater then 200";
              resultDiv.style.color = "red";
            }
          } else {
            resultDiv.style.color = "red";
            resultDiv.textContent =
              "Please enter valid values for amount, current rate, and exchange.";
          }
        });

        const transferBKs = document.getElementById("transferBK");
        const amountlabel = document.getElementById("e");
        const error = document.getElementById("error");
        const amountInput = document.getElementById("amount");
        const transferButton = document.getElementById("transferButton");
        const resultSection = document.getElementById("resultSection");
        const resultSpan = document.getElementById("result");
        const transferToBankButton = document.getElementById(
          "transferToBankButton"
        );
        const calculateExchangeButton = document.getElementById(
          "calculateExchangeButton"
        );
        const exchangeRateInput = document.getElementById("exchangeRate");
        const exchangeResult = document.getElementById("exchangeResult");

        transferButton.addEventListener("click", function () {
          const amount = parseFloat(amountInput.value);
          if (!isNaN(amount)) {
            if (amount >= 20) {
              resultDiv.style.color = "#0d4528";
              const finalAmount = amount - 3;
              resultSpan.textContent = finalAmount;
              resultSection.style.display = "block";
              amountInput.style.display = "none";
              amountlabel.style.display = "none";
              error.style.display = "none";
              transferButton.style.display = "none";
              transferBKs.style.display = "none";
              transferToBankButton.style.display = "block";
              resultSection.style.display = "block";
            } else {
              error.textContent = "Please enter atleast 20$";
              error.style.color = "red";
            }
          }
        });

        transferToBankButton.addEventListener("click", function () {
          const finalAmount = parseFloat(resultSpan.textContent);
          if (!isNaN(finalAmount)) {
            const bankAmount = finalAmount - 0.02 * finalAmount;
            resultSpan.textContent = bankAmount;
            transferToBankButton.style.display = "none";
            calculateExchangeButton.style.display = "block";
            transferBKs.style.display = "block";
          }
        });

        calculateExchangeButton.addEventListener("click", function () {
          const finalAmount = parseFloat(resultSpan.textContent);
          const exchangeRate = parseFloat(exchangeRateInput.value);
          if (!isNaN(finalAmount) && !isNaN(exchangeRate)) {
            if (exchangeRate > 200) {
              const exchangeResultValue = parseFloat(
                (finalAmount * exchangeRate).toFixed(2)
              );

              exchangeResult.style.color = "#0d4528";
              exchangeResult.textContent = "Rs. " + exchangeResultValue;
            } else {
              exchangeResult.textContent = "Rate must be greater then 200";
              exchangeResult.style.color = "red";
            }
          } else {
            exchangeResult.style.color = "red";
            exchangeResult.textContent =
              "Please enter valid values for amount, current rate, and exchange.";
          }
        });
      });
      document
        .getElementById("refresh-button")
        .addEventListener("click", function () {
          // Add the 'active' class to start the animation
          this.classList.add("active");

          // Reload the page after a short delay (2 seconds in this example)
          setTimeout(() => {
            location.reload();
          }, 2000);
        });
