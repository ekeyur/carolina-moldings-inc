export type NutsAndSwivelsCategory = {
  id: string;
  name: string;
  blurb: string;
};

export type Finish = {
  id: string;
  name: string;
  suffix: string;
};

export type Variant = {
  base: string;
  name: string;
  specs: string;
  finish?: boolean;
};

export type NutsAndSwivelsFamily = {
  id: string;
  cat: string;
  name: string;
  ph: string;
  blurb: string;
  features?: string[];
  variantLabel?: string;
  hasFinish?: boolean;
  hasInsulated?: boolean;
  finishSet?: string;
  variants?: Variant[];
  configurator?: string;
  formId?: string;
  pilots?: string[];
  quoteOnly?: boolean;
};

export type MeterBarType = {
  id: string;
  name: string;
  gasketUnion: boolean;
};

export type MeterBarLength = {
  id: string;
  name: string;
};

export type MeterBarConfig = {
  types: MeterBarType[];
  sizes: string[];
  lengths: MeterBarLength[];
  gaskets: { id: string; name: string }[];
  unions: { id: string; name: string }[];
};

export type OrderingFormField = {
  key: string;
  label: string;
  type: "radio" | "number" | "text" | "select";
  options?: string[];
  unit?: string;
  hint?: string;
};

export type OrderingForm = {
  title: string;
  intro: string;
  fields: OrderingFormField[];
};

export type NutsAndSwivelsCatalog = {
  nutsAndSwivelsCategories: NutsAndSwivelsCategory[];
  finishes: Finish[];
  meterBarConfig: MeterBarConfig;
  nutsAndSwivelsFamilies: NutsAndSwivelsFamily[];
  orderingForms: Record<string, OrderingForm>;
};
