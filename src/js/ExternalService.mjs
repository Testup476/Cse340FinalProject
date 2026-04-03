
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
                throw new Error("No data to fetch")
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
}

  