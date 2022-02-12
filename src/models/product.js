class Product {
  constructor(
    id,
    product_name,
    product_key,
    description,
    product_category,
    disease_category,
    period,
    choice,
  ) {
    this.id = id;
    this.product_name = product_name;
    this.product_key = product_key;
    this.description = description;
    this.product_category = product_category;
    this.disease_category = disease_category;
    this.period = period;
    this.choice=choice
  }
}

export default Product;
