/*
Author (Fullname): Pau Go Si
Email: pau.go.si@dk.experis.com
Private email: paugosi@hotmail.com
*/

// Declearing the DOM elements
const laptopsElement = document.getElementById('laptops');
const laptopDecriptionElement = document.getElementById('laptop_decription');
const laptopTitleElement = document.getElementById('laptop_title');
const laptopSpecsElement = document.getElementById('laptop_specs');
const laptopPriceElement = document.getElementById('laptop_price');

// Declearing the API URL
// API URL stays on port 3001 (json-server)
const apiComputerUrl = "http://localhost:3001/computers";

// Minimal image setter (Live Server serves /assets/... from your project root)
function setImage(path) {
  const imageElement = document.getElementById("laptop_image");
  imageElement.src = path; // e.g., "assets/images/1.jpg"
  imageElement.alt = "Image not found";
}

const getComputerData = async () => {
  const laptops = await getComputerApi(apiComputerUrl);
  if (!Array.isArray(laptops) || laptops.length === 0) {
    laptopDecriptionElement.innerText = "No laptops available.";
    return;
  }

  // Fill dropdown
  for (const laptop of laptops) {
    const opt = document.createElement("option");
    opt.value = laptop.id;
    opt.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(opt);
  }

  // Show first laptop
  laptopDecriptionElement.innerText = laptops[0].description;
  laptopTitleElement.innerText   = laptops[0].title;
  laptopSpecsElement.innerText   = laptops[0].specs;
  laptopPriceElement.innerText   = laptops[0].price;
  setImage(laptops[0].image); // important: from JSON, no hard-code

  // Change handler
  const handleLaptopChange = (e) => {
    const selectedLaptop = laptops[e.target.selectedIndex];
    laptopDecriptionElement.innerText = selectedLaptop.description;
    laptopTitleElement.innerText      = selectedLaptop.title;
    laptopSpecsElement.innerText      = selectedLaptop.specs;
    laptopPriceElement.innerText      = selectedLaptop.price;
    setImage(selectedLaptop.image); // ⬅️ from JSON
  };
  laptopsElement.addEventListener('change', handleLaptopChange);
};
// Fetch computers from the API
async function getComputerApi(baseComputerApiUrl) {
  try {
    const response = await fetch(baseComputerApiUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch computers:", error);
    return [];
  }
}

getComputerData();

// Declearing the DOM elements for the work button
const workButtonElement = document.getElementById("work_button");
const salleryAmount = document.getElementById("salery_amount");

// Declearing the DOM elements for The Bank Button
const bankButtonElement = document.getElementById("bank_button");
const balanceAmount = document.getElementById("balance_amount");

// Declearing the DOM elements for Apply Loan Button
const applyLoanButtonElement = document.getElementById("apply_a_loan");
const loanAmount = document.getElementById("loan_amount");

// Implement the Repay Loan Button
const repayLoanButtonElement = document.getElementById("repay_a_loan");

// Implement the Buy Button
const buyButtonElement = document.getElementById("buy_button");

// Implement the increament of the salery amount when the user clicks the work button.
workButtonElement.addEventListener('click', function(){
  // The work button must increase your Pay balance at a rate of 100 on each click.
  salleryAmount.value = parseFloat(salleryAmount.value) + 100;
});

// Implement the transfer money
bankButtonElement.addEventListener('click', function(){
  if (parseFloat(loanAmount.value) > 0) {
    const goesToLoan = parseFloat(salleryAmount.value)*0.1;
    if (goesToLoan <= parseFloat(loanAmount.value)) {
      loanAmount.value = parseFloat(loanAmount.value) - goesToLoan;
      balanceAmount.value = parseFloat(balanceAmount.value) + parseFloat(salleryAmount.value)*0.9;
    } else {
      // Overpay case: remainder goes to bank account
      balanceAmount.value = parseFloat(balanceAmount.value) + parseFloat(salleryAmount.value)*0.9 + Math.abs(parseFloat(loanAmount.value) - goesToLoan);
      loanAmount.value = 0;
    }
  } else {
    balanceAmount.value = parseFloat(balanceAmount.value) + parseFloat(salleryAmount.value);
    applyLoanButtonElement.disabled = false;
  }

  salleryAmount.value = 0;

  if (parseFloat(loanAmount.value) == 0) {
    applyLoanButtonElement.disabled = false;
    repayLoanButtonElement.disabled = true;
  } else if (parseFloat(loanAmount.value) > 0) {
    repayLoanButtonElement.disabled = false;
  }
});

// Implement the Apply Loan Button
applyLoanButtonElement.addEventListener('click', function(){
  // Must have a positive balance
  if (balanceAmount.value == 0) {
    alert("Sorry, we can't accept your loan request. You do not have money in your balance account. Please click on 'Bank' and deposit some money to your balance account to get a loan.");
  } else {
    let userLoanAmount = parseFloat(prompt("Please enter the amount you want to get a loan: "));

    if (userLoanAmount > 2 * parseFloat(balanceAmount.value)) {
      alert("Sorry, we can't accept your loan request. You cannot get a loan more than twice the amount of your balance. Please try again with a lower amount");
    } else if (userLoanAmount < 0) {
      alert("Sorry, we can't accept your loan request. You cannot get a loan less than 0. Please try again with a positive amount");
    } else if (isNaN(userLoanAmount)) {
      alert("Sorry, we can't accept your loan request. Please enter a valid number");
    } else if (userLoanAmount === null) {
      // cancelled
    } else if (userLoanAmount == 0) {
      alert("Sorry, we can't accept your loan request. Please enter a positive number");
    } else {
      alert("We have accepted your Loan request successfully. Please click on 'OK' and you will received DKK " + userLoanAmount + " in your 'Balance'. Please check it out in the loan section of the website. Thank you again for your interest in our bank");
      balanceAmount.value = userLoanAmount + parseFloat(balanceAmount.value);
      loanAmount.value = userLoanAmount;

      // lock/unlock buttons
      applyLoanButtonElement.disabled = true;
      repayLoanButtonElement.disabled = false;
    }
  }
});

// Handeling the repay loan button and the money transactions
repayLoanButtonElement.addEventListener('click', function(){
  if (salleryAmount.value >= parseFloat(loanAmount.value)) {
    balanceAmount.value = parseFloat(balanceAmount.value) + parseFloat(salleryAmount.value) - parseFloat(loanAmount.value);
    salleryAmount.value = 0;
    loanAmount.value = 0;
  } else {
    loanAmount.value = parseFloat(loanAmount.value) - parseFloat(salleryAmount.value);
    balanceAmount.value = parseFloat(balanceAmount.value);
    salleryAmount.value = 0;
  }

  if (parseFloat(loanAmount.value) == 0) {
    applyLoanButtonElement.disabled = false;
    repayLoanButtonElement.disabled = true;
  } else if (parseFloat(loanAmount.value) > 0) {
    repayLoanButtonElement.disabled = false;
  }
});

if (parseFloat(loanAmount.value) == 0) {
  applyLoanButtonElement.disabled = false;
  repayLoanButtonElement.disabled = true;
} else if (parseFloat(loanAmount.value) > 0) {
  repayLoanButtonElement.disabled = false;
}

// Implement the buy laptop button
buyButtonElement.addEventListener('click', function(){
  let laptopPrice = parseFloat(laptopPriceElement.innerText);
  if (balanceAmount.value >= laptopPrice) {
    balanceAmount.value = parseFloat(balanceAmount.value) - laptopPrice;
    alert("Congratulations! You have bought a new laptop. Please check it out in the 'Laptops' section of the website. The online payment was completed successfully. We have now deducted DKK " + laptopPrice + " from your balance account. Thank you again for your interest in our bank.");
  } else {
    alert("Sorry, you don't have enough money to buy this laptop. Please check out the 'Bank Joe' section of the website to see your current balance. Thank you again for your interest in our bank");
  }
});
