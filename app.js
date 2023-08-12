const laptopsElement = document.getElementById('laptops');
const laptopDecriptionElement = document.getElementById('laptop_decription');

//Creating an empty array to store the data
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
    //Displaying the first laptop's description
    laptopDecriptionElement.innerText = laptops[0].description;
    
    const handleLaptopChange = e => {
        const seledtedLaptop = laptops[e.target.selectedIndex];
        laptopDecriptionElement.innerText = seledtedLaptop.description;
    }
    laptopsElement.addEventListener('change', handleLaptopChange);
};
displayOption(); 

