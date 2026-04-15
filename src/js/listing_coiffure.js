// Import necessary modules and utilities

import { cardTemplate } from "./collectionrenderer.mjs";
import ExternalService from "./ExternalService.mjs";
import { getParam, setSelector, renderListWithTemplate, getLocalStorage } from "./utils.mjs";
import { alertMsg } from "./utils.mjs";
// ==========================================
// Retrieve parameters from the URL
// ==========================================

// Get the salon name from the URL
const salonname = getParam("salon");

// Get the salon ID from the URL (usefull to fetch salon data)
const salonId = getParam("refsalon");

// Get the city ID rom the URL (where the salon is located)
const locationsalon = getParam("refcity");

//Get the Email address from LocalStorage
const getenmail = getLocalStorage ("email")


// ==========================================
// Initialize external services
// ==========================================

// fetch city data
const citydata = new ExternalService("cities");

//fetch salon data
const salons = new ExternalService("salons");

const haircut = new ExternalService("hairstyles");

// ==========================================
// Fetch data asynchronously
//

/**
 * We use Promise.all to retrieve:
 * - city information (name)
 * - salon information (the name and the hours)
 *
 * This allows both requests to run in parallel (faster performance)
 */

const [cityinfo, salonInfo, salonTri] = await Promise.all([
  citydata.FindByid(locationsalon),
  salons.FindByid(salonId),
  haircut.FilterBysalon(salonId),
]);

// ==========================================
// Render data to the DOM
// ==========================================

/**
 * Update the HTML content using a utility function
 * setSelector(selector, value) that simplifies DOM manipulation
 */

// Display the salon name
setSelector(".salonname", salonname);

// Display the city name
setSelector(".location", cityinfo.name);

// Display the salon working hours
setSelector(".serviceh", salonInfo.hours);

//Displaye the email Address
setSelector(".email",getenmail)


// call the parenten element
const parentElement = document.querySelector(".container");

salonTri.length == 0
  ? alertMsg(
      "Sorry, no hairstyles are available for this salon at the moment.",
      null,
    )
  : renderListWithTemplate(
      cardTemplate,
      parentElement,
      salonTri,
      "afterbegin",
      true,
    );
