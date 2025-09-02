export interface CarouselNews {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  image: string;
}

export interface SidebarLink {
  id: number;
  href: string;
  title: string;
  icon?: string;
}

export type Theme = 'dark' | 'light';

