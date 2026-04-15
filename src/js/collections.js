import { renderListWithTemplate } from "./utils.mjs";

/**
 * THE COLLECTIONS MODULE
 * This class renders a list of content based on a given category.
 *
 * Generally, we have three categories:
 * - Main category: represents places (cities.json)
 * - Services category: represents service locations (salons.json)
 * - Style category: represents styles related to services (hairstyles.json)
 */

export default class collections {
  constructor(datasouce, listElement,list, template) {
   
    this.datasouce = datasouce;
    this.listElement = listElement;
    this.template = template;
    this.list= list
  }

  async init() {
    this.render(this.list)
    
  }

  // render list of element
  render(list) {
    const renderTemplate = (product) => this.template(product);
    renderListWithTemplate(renderTemplate, this.listElement,list,"afterbegin",true)
  }
}
