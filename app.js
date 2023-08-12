/*
const laptopsElement = document.getElementById('laptops');
const laptops = [];

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => laptopoptions(laptops));

const laptopoptions = (laptops) => {
    laptops.forEach(x => laptopoptions2(x));
}

const laptopoptions2 = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
}
*/
/*
const address = fetch("https://hickory-quilled-actress.glitch.me/computers")
  .then((response) => response.json())
  .then((user) => {
    return user.address;
  });

console.log(address);
*/


const laptopsElement = document.getElementById('laptops');
const laptops = [];

async function fetchComputerDetails() {
    const baseComputerApiUrl = "https://hickory-quilled-actress.glitch.me/computers"
    try {
        const response = await fetch(baseComputerApiUrl);
        const laptops = await response.json();
        return laptops
    } catch (error) {
        console.log(error)
    }
}

console.log(fetchComputerDetails()); //Output: Promise { <pending> }

const displayOption = async () => {
    const laptops = await fetchComputerDetails();
    for (const laptop of laptops) {
      const laptopElement = document.createElement("option");
      laptopElement.value = laptop.id;
      laptopElement.appendChild(document.createTextNode(laptop.title));
      laptopsElement.appendChild(laptopElement);
    }
    
};

console.log(displayOption()); //Output: Promise { <pending> };


