import ExternalService from "./ExternalService.mjs";
import {
  setSelector,
  redirectTo,
  setLocalStorage,
  getParam,
  alertMsg,
  on,} from "./utils.mjs";
import checkoutPayment from "./checkoutPayment";

// Tile layer API (OpenStreetMap)
const baseAPI = import.meta.env.VITE_TILELAYER_BASE_API;

// Required attribution for OpenStreetMap
const attributionUrl = `© OpenStreetMap contributors`;

//Get parameters from URL
const salonId = getParam("salonId");
const hairId = getParam("hairId");

//Create services to fetch data
const salondata = new ExternalService("salons");
const hairdata = new ExternalService("hairstyles");



// find the corresponding saon 
const findsalon = await salondata.FindByid(salonId)

//Retrieve the city Id
const Idcity = findsalon.cityId


// Fetch salon and hairstyle data in parallel by using the promise method
const [salonInfo, hairInfo,filteredSalons] = await Promise.all([
  salondata.FindByid(salonId),
  hairdata.FindByid(hairId),
  salondata.FilterByscity(Idcity)
]);

console.log(filteredSalons);


//Render data into the DOM
setSelector(".name", salonInfo.name);
setSelector(".hair", hairInfo.name);
setSelector(".category", hairInfo.category);
setSelector(".duration", hairInfo.duration);
setSelector(".base-price", hairInfo.price);

// const element = document.querySelector("[data-city-id]")
// const cityId = element.dataset.cityId;
// console.log(cityId);


//Update images dynamically
const image = document.querySelectorAll(".card-image");
image.forEach((item) => {
  const image = item.querySelector(".imgs");
  image.src = hairInfo.image;
});

//Initialize payment logic
const checkout = new checkoutPayment(".card-info");
const formcheck = new checkoutPayment(".payment-section");
await checkout.init();

//Select the form
const form = document.querySelector("#form-check");

//Handle submit button click
on("#submit", "click", async (event) => {
  event.preventDefault(); // Prevent page reload
  const isValid = form.checkValidity();  //Validate form
  form.reportValidity();
  if (!isValid) return;

  // Get form data as JSON and stocke it in the message const
  const message = await formcheck.formDataJson();

  //Show confirmation message
  alertMsg(
    "✅ Appointment confirmed.Your booking has been successfully processed. Thank you for choosing our service",
  );
  console.log(message);

  //Save data to localStorage
  setLocalStorage("ap-card", message);

  //Redirect after 3 seconds
  setTimeout(() => redirectTo("../city/index.html"), 3000);
});



const { lat, lon, accuracy } = await checkout.getUserLocation();

const city = await salondata.getcity(lat, lon);
console.log(`${city.lat} -${city.lon}`);


setSelector("#city", `${city.road} - ${city.municipality}`);

// Initialize the Leaflet map by targeting the HTML container element.
// Then set the initial view using the user's latitude and longitude,
// along with a zoom level of 13.
const map = L.map("map").setView([lat, lon], 13);

// Create tile layer (map background)
const layer = L.tileLayer(baseAPI, {
  maxZoom: 19,
  attribution: attributionUrl,
});

// Adding layer to map
layer.addTo(map);

//Mark my position
const myposition = L.marker([lat, lon]);
myposition
  .addTo(map)
  .bindTooltip(`📍 Your current Position: ${city.road}`,
    {permanent : true}
  )
  .openPopup();


  //Add accuracy circle
  const acc = L.circle([lat,lon],{radius:accuracy});
  acc.addTo(map)

  //Fit map to accuracy bounds
  map.fitBounds(acc.getBounds())




//Loop through salons and compute the distance from the user's location to each filtered salon 
filteredSalons.forEach((salon) => {
  
  const distance = salondata.getDistance(lat, lon, salon.lat, salon.lon);

  L.marker([salon.lat, salon.lon]) 
    .addTo(map)
    .bindPopup(`💈 ${salon.name}<br>📏 ${distance} km`)
    .openPopup()
});

