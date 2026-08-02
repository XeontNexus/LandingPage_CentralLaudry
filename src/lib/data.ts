import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

export interface SiteContent {
  settings: {
    waLink: string;
    waNumber: string;
    instagramUrl: string;
    email: string;
    address: string;
    mapLink: string;
    mapEmbedUrl: string;
    operationalHours: { weekdays: string; weekend: string };
  };
  paket: PaketItem[];
  kiloan: KiloanItem[];
  footer: FooterData;
  gallery: GalleryItem[];
  admin: AdminData;
}

export interface PaketItem {
  id: string;
  name: string;
  features: string[];
  isPopular: boolean;
}

export interface KiloanItem {
  id: string;
  name: string;
  description: string;
  features: string[];
  iconType: string;
  isPopular: boolean;
}

export interface FooterData {
  brandName: string;
  description: string;
  menuItems: { label: string; href: string }[];
  copyright: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  type: string;
}

export interface AdminData {
  password: string;
  resetCode: string | null;
  resetExpiry: number | null;
}

export function getContent(): SiteContent {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export function saveContent(content: SiteContent): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(content, null, 2), "utf-8");
}
