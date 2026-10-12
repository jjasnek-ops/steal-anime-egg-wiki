import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://stealanimeegg.wiki',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    starlight({
      title: 'Steal Anime Egg Wiki',
      description: 'An unofficial fan-made guide to Roblox Steal Anime Eggs.',
      favicon: '/favicon.svg',
      logo: { src: './src/assets/egg-mark.svg', replacesTitle: false },
      customCss: ['./src/styles/custom.css'],
      components: {
        Head: './src/components/Head.astro',
        Footer: './src/components/Footer.astro',
      },
      sidebar: [
        { label: 'Start here', items: [
          { label: 'Wiki home', link: '/' },
          { label: 'Codes', link: '/codes', badge: { text: 'Status', variant: 'note' } },
          { label: 'Beginner guide', link: '/guide' },
          { label: 'Browse guides', link: '/guides' },
        ]},
        { label: 'Game information', items: [
          { label: 'Which game?', link: '/which-game' },
          { label: 'Update status', link: '/updates' },
        ]},
        { label: 'About the wiki', items: [
          { label: 'Sources & checks', link: '/sources' },
          { label: 'About & corrections', link: '/about' },
          { label: 'Privacy', link: '/privacy' },
        ]},
      ],
      social: [{ icon: 'github', label: 'Source and corrections on GitHub', href: 'https://github.com/jjasnek-ops/steal-anime-egg-wiki' }],
      editLink: { baseUrl: 'https://github.com/jjasnek-ops/steal-anime-egg-wiki/edit/main/' },
      lastUpdated: false,
      pagination: false,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#11101c' } },
        { tag: 'meta', attrs: { name: 'robots', content: 'index,follow,max-image-preview:large' } },
      ],
    }),
  ],
});

