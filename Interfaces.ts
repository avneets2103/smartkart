interface sidebarRTK { 
    currentPage: string,
};

interface sidebarMenuItems {
    name: string,
    path: string,
    iconS: string,
    iconNS: string,
}

export type {
    sidebarRTK,
    sidebarMenuItems
}