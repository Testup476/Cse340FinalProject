import { redirectTo, getLocalStorage,alertMsg, removeItem, on, setSelector} from "./utils.mjs"
import { Template } from "./collectionrenderer.mjs";
import authentication from "./authentication";


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
    redirectTo("./login/index.html")
})

// Authentification

const authen = new  authentication(".auth-container")

await authen.init()





