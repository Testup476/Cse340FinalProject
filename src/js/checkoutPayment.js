import { alertMsg } from "./utils.mjs";


export default class checkoutPayment {
  constructor(outputselector) {
    this.outputselector = outputselector;
    this.TotaG = 0;
    this.baseprice = 0;
    this.minutes = 0;
  }
  async init() {
    this.homeService();
    this.calculTotal(0);
  }

  calculTotal(ishomeService) {
    //Retrive value from HTML tag and convert it into base 10
    this.baseprice = parseInt(
      document.querySelector(`${this.outputselector} .base-price`).innerText,
      10,
    );
    this.minutes = parseInt(
      document.querySelector(`${this.outputselector} .duration`).innerText,
      10,
    );

    // Calculate the initial price
    const initial = this.baseprice / this.minutes;

    //Calculate the General price
    this.TotaG = this.baseprice + initial + ishomeService;

    //Render on the screen
    const Totaprice = document.querySelector(`${this.outputselector} #price`);
    Totaprice.innerText = `$${this.TotaG.toFixed(1)}`;
  }

  homeService() {
    const isHomeCheckbox = document.querySelector(
      `${this.outputselector} #isHome`,
    );

    isHomeCheckbox.addEventListener("change", () => {
      if (isHomeCheckbox.checked) {
        const inputvalue = 5.3;
        this.calculTotal(inputvalue);
      }
      if (isHomeCheckbox.checked === false) {
        this.calculTotal(0);
      }
    });
  }

  // This function is to create an Object no an array
  async formDataJson() {
    return {
      salonName: document.querySelector(`${this.outputselector} .name`)
        .innerText,
      category: document.querySelector(`${this.outputselector} .category`)
        .innerText,
      duration: document.querySelector(`${this.outputselector} .duration`)
        .innerText,
      price: document.querySelector(`${this.outputselector} #price`).innerText,
      phone: document.querySelector(`${this.outputselector} #phone`).value,
      fname: document.querySelector(`${this.outputselector} #fname`).value,
      Email: document.querySelector(`${this.outputselector} #mail`).value,
      Bill: document.querySelector(`${this.outputselector} #price`).innerText,
      model: document.querySelector(`${this.outputselector} .hair`).innerText,
    };
  }

  async getUserLocation() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            accuracy: pos.coords.accuracy
          });
        },
        (error) => {
          alertMsg("error", error.message);

          // The log and lat of Kinshasa
          resolve({
            lat: -4.4419,
            lon: 15.2663,
            accuracy: null
          });
        },
      );
    });
  }
}
