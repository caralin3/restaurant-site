export interface SiteData {
  site: {
    siteMetadata: {
      title: string;
    }
  }
}

export interface LayoutData extends SiteData {
  location: {
    city: string;
    phone: number;
    street: string;
    state: string;
    zipCode: number;
  }
}

export interface IndexData extends SiteData {
  heroImage: {
    childImageSharp: {
      fluid: () => any
    }
  }
}
