export type Category = {
  id: string;
  name: string;
  tag: string;
  blurb: string;
};

export type Product = {
  id: string;
  name: string;
  partNo: string;
  cat: string;
  brand?: string;
  ph: string;
  material?: string;
  pack?: string;
  fits?: string;
  tamperCompatible?: boolean;
  kit?: boolean;
  bullets?: string[];
  desc: string;
  images: string[];
};

export type CatalogData = {
  categories: Category[];
  meterBrands: string[];
  products: Product[];
};
