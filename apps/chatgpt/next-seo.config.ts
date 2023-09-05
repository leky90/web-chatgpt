import { NextSeoProps } from 'next-seo';

const SEO: NextSeoProps = {
  defaultTitle: 'LDKTech - ChatGPT Integration',
  themeColor: '#fff',
  description:
    'We specialize in the development of high-quality web and mobile applications. Our team helps individuals and businesses design and launch responsive websites. Our tailored solutions can improve your online visibility and boost revenue streams.',
  additionalMetaTags: [
    {
      name: 'viewport',
      content:
        'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi',
    },
    {
      name: 'keywords',
      content:
        'web application, mobile application, UI/UX design, ecommerce development, responsive website, online visibility, revenue streams, CMS integration, CRM integration.',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'android-chrome-192',
      href: '/android-chrome-192x192.png',
      sizes: '192x192',
    },
    {
      rel: 'android-chrome-512',
      href: '/android-chrome-512x512.png',
      sizes: '512x512',
    },
    {
      rel: 'apple-touch-icon',
      href: '/touch-icon-ipad.png',
      sizes: '76x76',
    },
    {
      rel: 'favicon-16',
      href: '/favicon-16x16.png',
      sizes: '16x16',
    },
    {
      rel: 'favicon-32',
      href: '/favicon-32x32.png',
      sizes: '32x32',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chatgpt.ldktech.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1679083216051-aa510a1a2c0e?auto=format&fit=crop&w=1200',
      },
    ],
    siteName: 'LDKTech - ChatGPT Integration',
  },
};

export default SEO;
