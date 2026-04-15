import { alertMsg,on, redirectTo, setLocalStorage } from "./utils.mjs";

export default class authentication{
    constructor(outsideSelector){
        this.outsideSelector = outsideSelector
        this.list =[]
    }

    async init(){
        this.checking()
    }

    // Checking process

    async checking(){
        const form = document.querySelector(`${this.outsideSelector} #formlog`)

        on('#btn','click', async (event)=>{
          event.preventDefault(); // Prevent page reload
          const Isvalid = form.checkValidity()//Validate form
          form.reportValidity();
          if(!Isvalid) return;

           if(!this.Checkvalidity()){
            alertMsg("❌ Login failed: Invalid email or password.")
            
           }else{
             alertMsg("✅ Login successful!")
            setTimeout(()=>{
            setLocalStorage("email",email.value)
            redirectTo("../city/index.html")
            },3000)
           }
        
        })
    }

    Checkvalidity(){
        const email = document.querySelector(`${this.outsideSelector} #email`)
        const password = document.querySelector(`${this.outsideSelector} #password`)
        return (email.value == "Kandajeanmarc@gmail.com" && password.value == "12345")
    }
}