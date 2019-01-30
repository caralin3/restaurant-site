import { Food, Hours, Location, Profile } from './models';

export interface SiteData {
  site: {
    siteMetadata: {
      title: string;
    }
  }
}

export interface ProfileData {
  allContentfulProfile: {
    edges: {
      node: Profile
    }[]
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

export interface HeroData extends
  LocationData,
  SiteData {}

export interface FooterData extends
  LocationData,
  ProfileData,
  SiteData {}

export interface LocationHoursData extends
  HoursData,
  LocationData {}
