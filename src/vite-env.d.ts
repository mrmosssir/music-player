/// <reference types="vite/client" />

// SVG files type declarations
declare module "*.svg" {
  const content: string;
  export default content;
}

// CSS modules type declarations
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Image files type declarations
declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}
