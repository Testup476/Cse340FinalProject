/**
 * COLLECTION RENDERER MODULE
 * 
 * This module contains functions to dynamically render collections of data
 * (e.g., cities, salons, hairstyles etc) into the HTML DOM.
 *
 * It provides reusable functions to render a single item into a parent element.
 *
 * Each type of collection has its own template function to define
 * how items are displayed (e.g., hairstyles cards, city cards, salon cards).
 *
 * This module helps separate the data logic from the presentation logic,
 * making it easier to maintain and extend the UI dynamically.
 */


// CITY TEMPLATE CARD
// 
// This template generates the HTML structure for a single city card.
// Example content includes:
// - City name
// - Description
// - Image
// - Optional additional info such as Stylists available and Services
//
// Usage:
// const cityCardHTML = cityTemplate(cityData);
// parentElement.innerHTML = cityCardHTML;

export const cityTemplate = (data) => {
  return `
    <div class="city-card">
      <a href="/listing_room/index.html?city=${data.name}&id=${data.id}">
        <img src="${data.image}" alt=" image of ${data.name}">
        <h3>${data.name}</h3>
      </a>
      <p class="city-desc">
        ${data.description}
      </p>
      <p class="city-info">
        <strong>Stylists available:</strong> ${data.info?.stylistsAvailable} | 
        <strong>Services:</strong> ${data.info?.services}
      </p>
    </div>
  `;
}


//Salon template 
export const salonTemplate = (data)=>{

  return `

   <div class="city-card">
      <a href="/coiffure_listing/index.html?salon=${data.name}&refsalon=${data.id}&refcity=${data.cityId}">
        <img src="${data.image}" alt="Image of ${data.name}">
        <h3>${data.name}</h3>
      </a>
      <p class="city-desc">
        ${data.services}
      </p>
      <p class="city-info">
        <strong>Open Daily :</strong> ${data.hours} | 
      </p>
    </div>
  
  `
  
}

// Card Template
export const cardTemplate = (data) =>{
  return `
  <div class="city-card-card">
         <a href="/payment/index.html?salonId=${data.salonId}&hairId=${data.id}">
     <div class="card">
    <img src="${data.image}" alt=" Image for ${data.name}">
    <div class="card-content">
      <h3>${data.name}</h3>
      <p>${data.category}</p>
      <p>${data.duration}</p>
    </div>
  </div>
     </a>
  </div>
  `
}

//AppointementTemplate

export const Template = (item)=>{
  return`
    <p><strong>Salon:</strong> <span>${item.salonName}</span></p>
    <p><strong>Category:</strong> <span>${item.category}</span></p>
    <p><strong>Duration:</strong> <span>${item.duration}</span></p>
    <p><strong>Price:</strong> <span>${item.Bill}</span></p>
    <p><strong>Phone:</strong> <span>${item.phone}</span></p>
    <p><strong>Email:</strong><span>${item.Email}</span></p>
    <p><strong>Model:</strong><span>${item.model}</span></p>
  </div>
  `
}