const laptopsElement = document.getElementById('laptops');
const laptops = [];

//Fecthing the data from the API
const fetchComputerDetails = async () => {
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


//fetching the data from the API and storing it in the laptops array
//displaying the data in the dropdown
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


