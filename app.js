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

