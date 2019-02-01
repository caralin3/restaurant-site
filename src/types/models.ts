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

export interface ContentfulHours {
  node: Hours;
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
  image: {
    fluid: (maxWidth?: number, maxHeight?: number, resizingBehavior?: any) => any;
  };
}

export interface MenuSection {
  title: string;
  subtitle: string;
  note: string;
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

export interface ContentfulFood {
  node: Food;
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

export interface ContentfulIntro {
  intro: string;
}

export interface ContentfulLongBio {
  longBio: string;
  childMarkdownRemark: {
    html: string;
  }
}

export interface Profile {
  intro: ContentfulIntro;
  longBio: ContentfulLongBio;
  heroImage: {
    fluid: (maxWidth?: number, maxHeight?: number, resizingBehavior?: any) => any;
  };
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
