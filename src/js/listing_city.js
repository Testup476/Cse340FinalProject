import ExternalService from "./ExternalService.mjs";
import collections from "./collections";
import { cityTemplate } from "./collectionrenderer.mjs";
import { renderListWithTemplate } from "./utils.mjs";

const datasource = new ExternalService("cities");

const list = await datasource.getsource();
console.log(list);

const parentElement = document.querySelector(".cities-grid");
const collection = new collections(datasource, parentElement, cityTemplate);

await collection.init();

renderListWithTemplate(cityTemplate, parentElement, list, "afterbegin", true);
