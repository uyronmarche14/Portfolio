export interface NavItem {
  label: string;
  href: string;
  kind: "section" | "route";
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home", kind: "section" },
  { label: "About", href: "#about", kind: "section" },
  { label: "Projects", href: "#projects", kind: "section" },
  { label: "Contact", href: "#contact", kind: "section" },
  { label: "CLI", href: "/cli", kind: "route" },
  { label: "Chatbot", href: "/chatbot", kind: "route" },
];

export const NAVBAR_LABELS = {
  openMenu: "Open menu",
  closeMenu: "Close menu"
};
