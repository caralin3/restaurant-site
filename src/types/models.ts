export interface Address {
  city: string;
  phone: number;
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
