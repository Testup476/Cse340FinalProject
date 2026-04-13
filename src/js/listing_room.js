import { getParam, renderListWithTemplate, setSelector } from "./utils.mjs";
import ExternalService from "./ExternalService.mjs";
import { salonTemplate } from "./collectionrenderer.mjs";

const city = getParam("city");
const salonid = getParam("id");

const datasource = new ExternalService("salons");
const parentElement = document.querySelector(".cities-grid");
const salonTri = await datasource.FilterByid(salonid);

// Display the city or region name in the interface
// - ".city-region" → target HTML element
// - city → value retrieved from URL or data source
// Uses setSelector utility to simplify DOM manipulation

setSelector(".city-region", city);

renderListWithTemplate(
  salonTemplate,
  parentElement,
  salonTri,
  "afterbegin",
  true,
);
