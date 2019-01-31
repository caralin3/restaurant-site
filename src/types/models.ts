export interface Address {
  city: string;
  phone: string;
  state: string;
  street: string;
  zipCode: number;
}

export interface Location extends Address {
  heroImage: {
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
  price?: number;
  type: string;
  meal: 'lunch' | 'dinner' | 'both';
  shortDescription: string;
}

export interface ContentfulFood {
  node: Food;
}

export interface Social {
  url: string;
  class: string
}

export interface ContentfulLongBio {
  longBio: string
}

export interface Profile {
  facebook: string;
  instagram: string;
  longBio: ContentfulLongBio;
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
