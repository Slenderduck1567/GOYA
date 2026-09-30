// Site-wide settings — edit these to update links and contact details everywhere.
export const SITE = {
  instagram: 'https://instagram.com/goya.brisbane',
  instagramHandle: '@goya.brisbane',
  facebook: null, // e.g. 'https://facebook.com/goyabrisbane' — the icon only shows once this is set
  email: 'goya.org@gmail.com',
  address: '22A Browning St, South Brisbane QLD 4101',
  addressShort: '22A Browning St, South Brisbane',
  mapQuery: '22A Browning St, South Brisbane QLD 4101',
  netballFormUrl: null, // TODO: paste the Google Form link for Women's Netball EOI
};

export const ROUTES = {
  home: '/', events: '/events', house: '/goya-house', about: '/about', join: '/join',
  gallery: '/gallery', junior: '/junior-goya', netball: '/netball', contact: '/contact',
};

export const pathFor = (key) => {
  if (key.startsWith('event:')) return '/events/' + key.split(':')[1];
  return ROUTES[key] || '/';
};
