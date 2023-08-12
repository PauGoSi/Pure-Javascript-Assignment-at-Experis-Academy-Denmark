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

//console.log(fetchComputerDetails()); //Output: Promise { <pending> }

const displayOption = async () => {
    const laptops = await fetchComputerDetails();
    for (const laptop of laptops) {
        const laptopElement = document.createElement("option");
        laptopElement.value = laptop.id;
        laptopElement.appendChild(document.createTextNode(laptop.title));
        laptopsElement.appendChild(laptopElement);
    }
    
};

displayOption(); 


