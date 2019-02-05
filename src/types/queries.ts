import { Coupon, Food, Hours, Location, MenuSection, Profile, Special } from './models';

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

export interface MenuSectionData {
  allContentfulMenuSection: {
    edges: {
      node: MenuSection
    }[]
  }
}

export interface SpecialData {
  allContentfulSpecial: {
    edges: {
      node: Special
    }[]
  }
}

export interface CouponData {
  allContentfulCoupon: {
    edges: {
      node: Coupon
    }[]
  }
}

export interface HeroData extends
  LocationData,
  ProfileData,
  SiteData {}

export interface FooterData extends
  LocationData,
  ProfileData,
  SiteData {}

export interface MenuData extends
  FoodData,
  MenuSectionData {}
