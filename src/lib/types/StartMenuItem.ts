export interface StartMenuItem {
    name: string;
    component?: string;
    items: StartMenuItem[];
  }
  
  export interface StartMenuItemWithOptionalItems {
    name: string;
    component?: string;
    items?: StartMenuItemWithOptionalItems[];
  }
  
  export interface StartMenuStructure {
    name: string;
    items: StartMenuItem[];
  }