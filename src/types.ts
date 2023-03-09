interface NavCategory {
    category: string,
    tags: string[],
    sites: NavSite[]
}

interface NavSite {
    name: string,
    desc: string,
    url: string
}

export type {NavCategory, NavSite}
