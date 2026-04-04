import { getParam, renderListWithTemplate } from "./utils.mjs";
import ExternalService from "./ExternalService.mjs";
import { salonTemplate } from "./collectionrenderer.mjs";

const city = getParam("city");
const salonid = getParam("id");

const datasource = new ExternalService("salons");
const parentElement = document.querySelector(".cities-grid");
const salonTri = await datasource.FilterByid(salonid);
const cityname = document.querySelector(".city-region");
cityname.innerText = city;

renderListWithTemplate(
  salonTemplate,
  parentElement,
  salonTri,
  "afterbegin",
  true,
);

// console.log(`Recherche dans la ville de ${city}`);

// console.log("ID salon");
// console.log(salonid);

// console.log(`les salons selon l'ID ${salonid}`);
console.log(salonTri);
