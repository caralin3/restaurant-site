declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.jpg' {
  const image: {[className: string]: string};
  export = image;
}

declare module '*.ico' {
  const icon: {[className: string]: string};
  export = icon;
}