const laptopsElement = document.getElementById('laptops');
const laptopDecriptionElement = document.getElementById('laptop_decription');
const laptopTitleElement = document.getElementById('laptop_title');
const laptopSpecsElement = document.getElementById('laptop_specs');
const laptopPriceElement = document.getElementById('laptop_price');



//Declearing the API URL
const apiComputerUrl = "https://hickory-quilled-actress.glitch.me/computers"

//Defining a function for fecthing the data from the API and returning it as a promise
const fetchApi = async (baseComputerApiUrl) => {
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


//fetching the data from the API and storing it in the laptops array
//displaying the data in the dropdown
const displayComputerData  = async () => {

    //Calling the fetchApi function
    const laptops = await fetchApi(apiComputerUrl);

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
    
    //Displaying the "description", the "title", the "specs" and the "price" of the laptop the user has selected
    const handleLaptopChange = e => {
        const seledtedLaptop = laptops[e.target.selectedIndex];
        laptopDecriptionElement.innerText = seledtedLaptop.description;
        laptopTitleElement.innerText = seledtedLaptop.title;
        laptopSpecsElement.innerText = seledtedLaptop.specs;
        laptopPriceElement.innerText = seledtedLaptop.price;
    }
    laptopsElement.addEventListener('change', handleLaptopChange);


    //Displaying the first laptop's image
    fetch("https://hickory-quilled-actress.glitch.me/assets/images/1.png")
          .then((response) => response.blob())
          .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            const imageElement = document.getElementById("laptop_image")
            imageElement.src = imageUrl;
            imageElement.appendChild(imageElement);
          })
          .catch((error) => console.error(error));

          
    //Displaying the laptop's image based on the laptop the user has selected 
    const fetchImage = async () => {
        const seledtedLaptop = laptops[laptopsElement.selectedIndex];
        fetch("https://hickory-quilled-actress.glitch.me/assets/images/" + seledtedLaptop.id + ".png")
            .then((response) => response.blob())
            .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            const imageElement = document.getElementById("laptop_image")
            imageElement.src = imageUrl;
            imageElement.appendChild(imageElement);
            })
            .catch((error) => console.error(error));
    }
    laptopsElement.addEventListener('change', fetchImage);


    
};
displayComputerData(); 