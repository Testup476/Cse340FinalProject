import ExternalService from "./ExternalService.mjs";
import collections from "./collections";
import { cityTemplate } from "./collectionrenderer.mjs";
import { setSelector,getLocalStorage} from "./utils.mjs";

const datasource = new ExternalService("cities");
const getemail = getLocalStorage("email")

const list = await datasource.getsource();
setSelector(".email",`${getemail}`)
const parentElement = document.querySelector(".cities-grid");
const collection = new collections(datasource, parentElement,list, cityTemplate);

await collection.init();

