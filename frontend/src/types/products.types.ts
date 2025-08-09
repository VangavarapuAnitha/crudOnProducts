export type ProductType = {
  _id: string;
  name: string;
  price: number;
  category: string[];
  description: string;
  imageUrl: string;
  productUrl: string;
};

export type CategoryType = {
  _id: string;
  name: string;
};
