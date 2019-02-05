export interface Address {
  city: string;
  phone: string;
  state: string;
  street: string;
  zipCode: number;
}

export interface Location extends Address {
  image: {
    fluid: (maxWidth?: number, maxHeight?: number, resizingBehavior?: any) => any;
  }
}

export interface Hours {
  daysOfTheWeek: string;
  open: string;
  close: string;
  location: Location;
}

export interface Food {
  name: string;
  price: number;
  priceSmall: number;
  priceMedium: number;
  section: MenuSection;
  menu: 'general' | 'catering';
  meal: 'lunch' | 'dinner' | 'both';
  note: string;
  shortDescription: string;
}

export interface MenuSection {
  title: string;
  subtitle: string;
  note: string;
  image: {
    fluid: (maxWidth?: number, maxHeight?: number, resizingBehavior?: any) => any;
  };
}

export interface Special {
  title: string;
  price: number;
}

export interface Coupon {
  title: string;
  shortDescription: string;
  disclaimer: string;
  discount: boolean;
  price: number;
}

export interface ContentfulHours {
  node: Hours;
}

export interface ContentfulFood {
  node: Food;
}

export interface ContentfulMenuSection {
  node: MenuSection;
}

export interface ContentfulProfile {
  node: Profile;
}

export interface ContentfulCoupon {
  node: Coupon;
}

export interface ContentfulSpecial {
  node: Special;
}

export interface Social {
  url: string;
  class: string;
}

export interface ContentfulLongBio {
  longBio: string;
  childMarkdownRemark: {
    html: string;
  }
}

export interface Profile {
  ourStory: string;
  longBio: ContentfulLongBio;
  heroImage: {
    fluid: (maxWidth?: number, maxHeight?: number, resizingBehavior?: any) => any;
  };
  cateringDescription: string;
  facebook: string;
  instagram: string;
  twitter: string;
}

/** Form Submissions */
export interface ContactResponse {
  email: string;
  name: string;
  message: string;
}

export interface CateringResponse {
  count: number;
  date: string;
  email: string;
  event: string;
  name: string;
  notes: string;
  phone: string;
  time: string;
}
