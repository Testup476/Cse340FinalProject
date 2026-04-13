//getParam function to handle URLSearchParam

export function getParam(param){
  const queryString= window.location.search;
  const urlParm = new URLSearchParams(queryString);
  return urlParm.get(param);
}

// Attach an event listener to a selected DOM element if it exists
export function on(selector,event, callback){
  const element =document.querySelector(selector);
   element && element.addEventListener(event,callback)
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

 // remove an Item from localStorage
export function removeItem(key){
  localStorage.removeItem(key)
}

// Redirection to a page
export const redirectTo = (path)=>{
  window.location.href = path;
}

//Creat a selctor for the DOM

export const setSelector = (selector, value)=>{
  const element = document.querySelector(selector)
   element && (element.innerHTML = value)
}


// Alert message when something wrong
export const alertMsg = (message, scroll = true)=> {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `
    <span class="alert-text">${message}</span>
  `;

  // Animation d'entrée
  alert.classList.add('slide-in');

  const main = document.querySelector('main');
  main.prepend(alert);

  if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });

  // Fermer après 5 secondes
  setTimeout(() => {
    alert.classList.remove('slide-in');
    alert.classList.add('slide-out');

    // Supprimer une seule fois après animation
    alert.addEventListener(
      'animationend',
      () => alert.remove(),
      { once: true } // 🔥 important
    );
  }, 5000);
}

// renderListWithTemplate function to render data into a template and insert it into a parent element at a specified position

 export const renderListWithTemplate = (templateFn, parentElement,list,position, clear = false)=>{
  if(!clear) return parentElement.innerHTML = "";

  const htmlcontent = list.map(templateFn).join("");

  parentElement.insertAdjacentHTML(position,htmlcontent)
}




