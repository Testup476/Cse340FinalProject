import { getParam } from "./utils.mjs";
import ExternalService from "./ExternalService.mjs";

const city = getParam("city");
const salonid = getParam("id");

const datasource = new ExternalService("salons");
const response = await datasource.getsource();

console.log("Les 12 salons");
console.log(response);

console.log(`Recherche dans la ville de ${city}`);

console.log('ID salon');
console.log(salonid);

console.log(`les salons selon l'ID ${salonid}`);
const salonTri = datasource.FilterByid(salonid)
console.log(salonTri);

