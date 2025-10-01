export type NavItem = {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[];
};
