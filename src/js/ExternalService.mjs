import { alertMsg } from "./utils.mjs";

const baseURL = import.meta.env.VITE_NOMINATIM_BASE_API;

/**
 * This class connects to an external database to retrieve data for a given category.
 * The external service is hosted on render.com.
 */
  
export default class ExternalService{
    constructor(category)
    {
        this.category = category
    }

    async init(){
        this.getsource()
    }

    async getsource(){
        const path = `/json/${this.category}.json`
        try {
            const data = await fetch(path);
            if(!data.ok) {
                alertMsg("No data to fetch",null)
            }
            const response = await data.json()
            return response;
            
        } catch (error) {
            console.log(`Error fetching data: ${error}`)
        }
    }


    async FilterByid(id){
        const data = await this.getsource();
       
        return data.filter(item => item.cityId == id)
    }
    async FilterBysalon(id){
        const data = await this.getsource()
        return data.filter(item => item.salonId == id)
    }

     async FilterByscity(id){
        const data = await this.getsource()
        return data.filter(item => item.cityId == id)
    }

    async FindByid(id){
        const data = await this.getsource();
        return data.find((item)=>item.id == id)
    }

    //Get city Function
    async getcity(lat,lon){
        const data = await fetch(`${baseURL}?lat=${lat}&lon=${lon}&format=json`)

        if(!data.ok) return;

        const response = await data.json()

        if (!response || response.error || !response.address) {
      return {
        road: "Unknown road",
        municipality: "Unknown city"
      };
    }
        const address = response.address

        const element ={
             road : address.road,
            municipality: address.municipality
        }
        return element
        
    }
    getDistance(lat1,lon1, lat2, lon2){
        const Rayon = 6371

        const toRad = deg =>deg * Math.PI /180

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1)

        const distanceA = 
        Math.sin(dLat / 2)**2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2)**2
        
        const distance = Rayon *(2 * Math.atan2(Math.sqrt(distanceA),Math.sqrt(1 - distanceA)))

        return distance.toFixed(2)
    }
}

  