import { Food, Hours, Location } from './models';

export interface SiteData {
  site: {
    siteMetadata: {
      title: string;
    }
  }
}

export interface LocationData {
  allContentfulLocations: {
    edges: {
      node: Location
    }[]
  }
}

export interface HoursData {
  allContentfulHours: {
    edges: {
      node: Hours
    }[]
  }
}

export interface FoodData {
  allContentfulFood: {
    edges: {
      node: Food
    }[]
  }
}

export interface IndexData extends
  HoursData,
  LocationData,
  SiteData {}

export interface MenuData extends
  FoodData,
  LocationData,
  SiteData {}
