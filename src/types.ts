interface NavCategory {
  category: string;
  tags: string[];
  sites: NavSite[];
}

interface NavSite {
  name: string;
  desc: string;
  url: string;
  type?: "website";
  encrypted?: boolean;
  encrypted_url?: string;
}

export type { NavCategory, NavSite };
