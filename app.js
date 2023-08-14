//Declearing the DOM elements
const laptopsElement = document.getElementById('laptops');
const laptopDecriptionElement = document.getElementById('laptop_decription');
const laptopTitleElement = document.getElementById('laptop_title');
const laptopSpecsElement = document.getElementById('laptop_specs');
const laptopPriceElement = document.getElementById('laptop_price');

//Declearing the API URL
const apiComputerUrl = "https://hickory-quilled-actress.glitch.me/computers"


//Defining a function for fecthing the data from the API and returning it as a promise
const getComputerApi = async (baseComputerApiUrl) => {
    //Creating an empty array to store the data
    const laptops = [];
    try {
        const response = await fetch(baseComputerApiUrl);
        const laptops = await response.json();
        return laptops
    } catch (error) {
        console.log(error)
    }
}
//console.log(fetchApi(apiComputerUrl)); //Output: Promise { <pending> }


async function getImageApi(baseImageApiUrl) {
    fetch(baseImageApiUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            const imageElement = document.getElementById("laptop_image")
            imageElement.src = imageUrl;
            imageElement.appendChild(imageElement);
          })
          .catch((error) => console.log(error));
}


//Fetching the data from the API and storing it in the laptops array
//Displaying the data in the dropdown
const getComputerData  = async () => {

    //Calling the fetchApi function
    const laptops = await getComputerApi(apiComputerUrl);

    //Looping through the array and creating an option for each laptop
    for (const laptop of laptops) {
        const laptopElement = document.createElement("option");
        laptopElement.value = laptop.id;
        laptopElement.appendChild(document.createTextNode(laptop.title));
        laptopsElement.appendChild(laptopElement);
    }

    //Displaying the first laptop's description
    laptopDecriptionElement.innerText = laptops[0].description;

    //Display the first laptop's title
    laptopTitleElement.innerText = laptops[0].title;

    //Displaying the first laptop's specs
    laptopSpecsElement.innerText = laptops[0].specs;

    //Displaying the first laptop's price
    laptopPriceElement.innerText = laptops[0].price;

    //Displaying the first laptop's image
    await getImageApi("https://hickory-quilled-actress.glitch.me/assets/images/1.png");
    
    //Implementing the "change" event listener for the dropdown.
    //Displaying the "description", the "title", the "specs", the "price" and 
    //the image of the laptop the user has selected
    const handleLaptopChange = async e => {
        const seledtedLaptop = laptops[e.target.selectedIndex];
        laptopDecriptionElement.innerText = seledtedLaptop.description;
        laptopTitleElement.innerText = seledtedLaptop.title;
        laptopSpecsElement.innerText = seledtedLaptop.specs;
        laptopPriceElement.innerText = seledtedLaptop.price;

        //Fetching the image of the laptop the user has selected
        await getImageApi("https://hickory-quilled-actress.glitch.me/" + seledtedLaptop.image);
    }
    laptopsElement.addEventListener('change', handleLaptopChange);
};
getComputerData(); 



//Declearing the DOM elements for the work button
const workButtonElement = document.getElementById("work_button");
const salleryAmount = document.getElementById("salery_amount");

//Declearing the DOM elements for The Bank Button
const bankButtonElement = document.getElementById("bank_button");
const balanceAmount = document.getElementById("balance_amount");

//Declearing the DOM elements for Apply Loan Button
const applyLoanButtonElement = document.getElementById("apply_a_loan");
const loanAmount = document.getElementById("loan_amount");

//Implement the Repay Loan Button
const repayLoanButtonElement = document.getElementById("repay_a_loan");

//Implement the Buy Button
const buyButtonElement = document.getElementById("buy_button"); 


//Implement the increament of the salery amount when the user clicks the work button. 
workButtonElement.addEventListener('click', function(){
    salleryAmount.value = parseFloat(salleryAmount.value) + 100;
});

//Implement the transfer money
bankButtonElement.addEventListener('click', function(){

    if(loanAmount.value>0){
        loanAmount.value = parseFloat(loanAmount.value) - parseFloat(salleryAmount.value)*0.1;
        balanceAmount.value = parseFloat(balanceAmount.value) + parseFloat(salleryAmount.value)*0.9;
    }else {
        balanceAmount.value = parseFloat(balanceAmount.value) + parseFloat(salleryAmount.value); 
        applyLoanButtonElement.disabled = false; 
    }
    salleryAmount.value = 0;
});

//Implement the Apply Loan Button
applyLoanButtonElement.addEventListener('click', function(){
    //Declearing the user's loan amount
    const userLoanAmount = prompt("Please enter the amount you want to get a loan: ");

    //Condionels to check if the user's loan amount is valid
    if(userLoanAmount>2*parseFloat(balanceAmount.value)){
        alert("Sorry, we can't accept your loan request. You cannot get a loan more than twice the amount of your balance. Please try again with a lower amount");
    }else if(userLoanAmount<0){
        alert("Sorry, we can't accept your loan request. You cannot get a loan less than 0. Please try again with a positive amount");
    }else if(isNaN(userLoanAmount)){
        alert("Sorry, we can't accept your loan request. Please enter a valid number");
    }else if(userLoanAmount===null){
    }else if(userLoanAmount==0){
        alert("Sorry, we can't accept your loan request. Please enter a positive number");
    }else{
        alert("We have accepted your Loan request successfully. Please click on 'OK' and you will received your loan amount in your 'Balance'. Please check it out in the loan section of the website. Thank you again for your interest in our bank");
        balanceAmount.value = parseFloat(userLoanAmount) + parseFloat(balanceAmount.value);
        loanAmount.value = parseFloat(userLoanAmount);
        applyLoanButtonElement.disabled = true;
        repayLoanButtonElement.disabled = false;
    }
});

//Handeling the repay loan button and the money transctions
repayLoanButtonElement.addEventListener('click', function(){

    if(salleryAmount.value>=loanAmount.value){
        balanceAmount.value = parseFloat(balanceAmount.value) + parseFloat(salleryAmount.value) - parseFloat(loanAmount.value);
        salleryAmount.value = 0;
        loanAmount.value = 0;
    }else if(salleryAmount.value<loanAmount.value){
        loanAmount.value = parseFloat(loanAmount.value) - parseFloat(salleryAmount.value);
        balanceAmount.value = parseFloat(balanceAmount.value);
        salleryAmount.value = 0;
    }

    if(loanAmount.value==0){
        applyLoanButtonElement.disabled = false;
        repayLoanButtonElement.disabled = true;
    }else if(loanAmount.value>0){
        repayLoanButtonElement.disabled = false;
    }
});

//Implement the buy laptop button
buyButtonElement.addEventListener('click', function(){
    let laptopPrice = parseFloat(laptopPriceElement.innerText)
    if(balanceAmount.value>=laptopPrice){
        balanceAmount.value = parseFloat(balanceAmount.value) - laptopPrice;
        alert("Congratulations! You have bought a new laptop. Please check it out in the 'Laptops' section of the website. Thank you again for your interest in our bank.");
    }else {
        alert("Sorry, you don't have enough money to buy this laptop. Please check out the 'Bank Joe' section of the website to see your current balance. Thank you again for your interest in our bank");
    }
});