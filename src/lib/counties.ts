import map from '../data/liberia-map.json';

export interface County {
  slug: string;
  name: string;
  id: string;
}

export const counties: County[] = map.counties.map((c) => ({
  slug: c.id.replace('county-', ''),
  name: c.name,
  id: c.id,
}));

export const viewBox = map.viewBox;
export const paths = map.counties;
