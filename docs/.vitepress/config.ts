import { defineConfig } from 'vitepress'

export default {
  base: '/docs/',
  title: "Renzora Engine Docs",
  description: "Documentation for the 2D Game Engine",
  appearance: 'dark',
  themeConfig: {
    sidebarMenuLabel: 'Menu',
    sidebarTitle: 'Renzora Engine Docs',
    nav: false,
    sidebar: {
      '/': [
        {
          text: 'Renzora Engine Docs',
          link: '/',
        },
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'How to install', link: '/guide/install' },
          ]
        },
        {
          text: 'Core Modules',
          collapsed: false,
          items: [
            { text: 'Assets', link: '/guide/assets' }
          ]
        },
        {
          text: 'Core Plugins',
          collapsed: false,
          items: [
            { text: 'Audio', link: '/guide/audio' }
          ]
        }
      ]
    }
  }
}