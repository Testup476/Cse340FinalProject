import { redirectTo, getLocalStorage,alertMsg, removeItem, on, setSelector} from "./utils.mjs"
import { Template } from "./collectionrenderer.mjs";


// localStorage returns a single object instead of an array
 const List = getLocalStorage("ap-card") 

// Normalize data: convert object to array if needed
const myArray = Array.isArray(List) ? List : List ? [List] :[]


if(!myArray.length){
    setSelector(".content","⚠️ No content found")
} else{
    const getCard = myArray.map((item)=>Template(item))
    setSelector(".content",getCard.join(" "))

on(".btn",'click',()=>{
    alertMsg("✅ Appointment Succefully Closed, Thanks to chose this service")
    removeItem("ap-card")
    setTimeout(()=>{
        redirectTo("../city/index.html")
    },3000)
})
}

on(".btn-explore",'click',()=>{
    redirectTo("./city/index.html")
})

// async function getCity(cityName) {
//   const response = await fetch(
//     `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
//   )

//   const data = await response.json()
//   console.log(data)
// }

// getCity("Mbujimayi")

// nominatim

fetch("https://nominatim.openstreetmap.org/reverse?lat=-4.4419&lon=15.2663&format=json")
  .then(res => res.json())
  .then(data => {
    const address = data.address

    const city =
      address.town ||
      address.city ||
      address.municipality ||
      address.state

    console.log("VILLE:", city)
  })



