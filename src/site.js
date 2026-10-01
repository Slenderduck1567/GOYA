// Site-wide settings — edit these to update links and contact details everywhere.
export const SITE = {
  // The public web address. Canonical links, the sitemap, robots.txt, social share
  // previews and calendar files are all built from this one line. When the custom
  // domain is live, change it here (no trailing slash) and redeploy.
  url: 'https://goya-nu.vercel.app',
  instagram: 'https://instagram.com/goya.brisbane',
  instagramHandle: '@goya.brisbane',
  facebook: null, // e.g. 'https://facebook.com/goyabrisbane' — the icon only shows once this is set
  email: 'goya.org@gmail.com',
  address: '22A Browning St, South Brisbane QLD 4101',
  addressShort: '22A Browning St, South Brisbane',
  mapQuery: '22A Browning St, South Brisbane QLD 4101',
  web3formsKey: '', // paste the free key from web3forms.com here to make forms send straight to the inbox
  netballFormUrl: null, // TODO: paste the Google Form link for Women's Netball EOI
};

export const ROUTES = {
  home: '/', events: '/events', house: '/goya-house', about: '/about', join: '/join',
  gallery: '/gallery', junior: '/junior-goya', netball: '/netball', stories: '/stories', contact: '/contact',
};

export const pathFor = (key) => {
  if (key.startsWith('event:')) return '/events/' + key.split(':')[1];
  return ROUTES[key] || '/';
};
