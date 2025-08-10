export default defineNuxtConfig({
  app: {
    head: {
      title: 'The AntiMatter Lab',
      meta: [
        { name: 'description', content: 'What is physics? The study of matter. Why learn physics? Because it matters.' },
        { name: 'keywords', content: 'physics, learn physics, physics tutorial, how to do physics, how to learn physics, the antimatter lab' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://theantimatterlab.net' },
        { property: 'og:title', content: 'The AntiMatter Lab' },
        { property: 'og:description', content: 'What is physics? The study of matter. Why learn physics? Because it matters.' },
        { property: 'og:image', content: 'https://theantimatterlab.net/logo.png' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://theantimatterlab.net' },
        { property: 'twitter:title', content: 'The AntiMatter Lab' },
        { property: 'twitter:description', content: 'What is physics? The study of matter. Why learn physics? Because it matters.' },
        { property: 'twitter:image', content: 'https://theantimatterlab.net/logo.png' }
      ],
      link: [
        { rel: 'shortcut icon', href: '/favicon.png' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/halfmoon@2.0.1/css/halfmoon.min.css' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js', defer: true },
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js', defer: true }
      ],
      rootId: false
    }
  }, modules: [
    '@pinia/nuxt', // required
    'pinia-plugin-persistedstate/nuxt',
  ],
  css: ['~/assets/style.css'],
  ssr: false
})