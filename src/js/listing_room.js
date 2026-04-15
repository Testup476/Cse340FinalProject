import { getLocalStorage, getParam, setSelector } from "./utils.mjs";
import ExternalService from "./ExternalService.mjs";
import { salonTemplate } from "./collectionrenderer.mjs";
import collections from "./collections";

const city = getParam("city");
const salonid = getParam("id");

const datasource = new ExternalService("salons");
const parentElement = document.querySelector(".cities-grid");
const salonTri = await datasource.FilterByscity(salonid);
const getemail = getLocalStorage("email")

console.log(salonTri);


// Display the city or region name in the interface
// - ".city-region" → target HTML element
// - city → value retrieved from URL or data source
// Uses setSelector utility to simplify DOM manipulation
setSelector(".email",getemail)
setSelector(".city-region", city);

const collection = new collections(datasource,parentElement,salonTri,salonTemplate)

await collection.init()


