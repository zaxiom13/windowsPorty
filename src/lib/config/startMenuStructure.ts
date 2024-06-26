// File: lib/config/startMenuStructure.ts

import type { StartMenuStructure } from '$lib/types/StartMenuItem';

const startMenuStructure: StartMenuStructure = {
  name: 'Start',
  items: [
    {
      name: "Programs",
      items: [
        {
          name: "Accessories",
          items: [
            { name: "Calculator", component: "Calculator", items: [] },
            { name: "Notepad", component: "Notepad", items: [] },
            { name: "Paint", component: "Paint", items: [] },
            { name: "WordPad", component: "WordPad", items: [] },
            { name: "Windows Maker", component: "WindowsMaker", items: [] } // Add this line
          ]
        },
        { name: "Internet Explorer", component: "InternetExplorer", items: [] },
        { name: "Minesweeper", component: "Minesweeper", items: [] },
        { name: "Solitaire", component: "Solitaire", items: [] }
      ]
    },
    {
      name: "Documents",
      items: []
    },
    {
      name: "Settings",
      items: [
        { name: "Control Panel", component: "PlaceholderApp", items: [] },
        { name: "Printers", component: "PlaceholderApp", items: [] }
      ]
    },
    {
      name: "Find",
      items: [
        { name: "Files or Folders...", component: "PlaceholderApp", items: [] },
        { name: "Computer...", component: "PlaceholderApp", items: [] }
      ]
    },
    { name: "Help", component: "PlaceholderApp", items: [] },
    { name: "Run...", component: "PlaceholderApp", items: [] },
    { name: "Shut Down...", component: "PlaceholderApp", items: [] }
  ]
};

export default startMenuStructure;