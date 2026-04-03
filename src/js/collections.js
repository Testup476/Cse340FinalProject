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
  constructor(datasouce, listElement, template) {
    // this.category = category;
    this.datasouce = datasouce;
    this.listElement = listElement;
    this.template = template;
  }

  async init() {
    const data = await this.datasouce.getsource();
    this.render(data);
  }

  // render liste of element
  render(list) {
    const renderTemplate = (product) => this.template(product);
    renderListWithTemplate(
      renderTemplate,
      this.listElement,
      list,
      "afterbegin",
      false,
    );
  }
}
