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
        <img src="${data.image}" alt="${data.name}">
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
  
}