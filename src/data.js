// GOYA website content — events, stats, gallery.
// To add an event, copy one block below. Set `ticketUrl` when tickets go live.
const P = '/assets/photos/';

export const DATA = {
  events: [
    { id: 'anastasia', day: '02', month: 'OCT', dow: 'FRI', time: 'Time TBA', category: 'Concert', tone: 'accent', free: false,
      title: 'Anastasia Concert', venue: 'The Greek Club, Brisbane', photo: P + 'anastasia-tour.jpg', photoPos: 'top',
      blurb: 'The GOYA Weekend opens with Anastasia, live in Brisbane as part of her Australian Tour — the kick-off to three days of glendi. Tickets and times still to be announced — watch this space.',
      tags: ['GOYA Weekend', 'Social', 'Concert'], ticketUrl: null },
    { id: 'aegean-cup', day: '03', month: 'OCT', dow: 'SAT', time: 'Time TBA', category: 'Sports', tone: 'sand', free: false,
      title: 'Aegean Cup', venue: 'Venue TBA', photo: P + 'aegean-cup.jpg',
      blurb: 'Our weekend sports comp — teams, trophies and plenty of filotimo. Interstate parea, this one is well worth the trip. Details to be announced.',
      tags: ['GOYA Weekend', 'Sports'], ticketUrl: null },
    { id: 'kefi-night', day: '03', month: 'OCT', dow: 'SAT', time: 'Time TBA', category: 'Social', tone: 'accent', free: false,
      title: 'Kefi Night', venue: 'Venue TBA', photo: P + 'kefi-night.jpg',
      blurb: 'Pure kefi — music, dancing and good company late into the night. The Saturday of the GOYA Weekend you won’t want to miss. Details to be announced.',
      tags: ['GOYA Weekend', 'Social'], ticketUrl: null },
    { id: 'gazi-night', day: '04', month: 'OCT', dow: 'SUN', time: 'Time TBA', category: 'Social', tone: 'accent', free: false,
      title: 'Gazi Club Night', venue: 'Venue TBA', photo: P + 'gazi-night.jpg',
      blurb: 'We send the GOYA Weekend out in true Gazi style — a proper club night to close three days of parea. Details to be announced.',
      tags: ['GOYA Weekend', 'Social'], ticketUrl: null },
  ],
  filters: ['All', 'GOYA Weekend', 'Social', 'Sports', 'Concert'],
  stats: [
    { value: '120+', label: 'Active members' },
    { value: '40+', label: 'Events a year' },
    { value: 'Fri', label: 'Open every week' },
  ],
  gallery: [1, 2, 3, 4, 5, 6].map((n) => P + `gallery-${n}.jpg`),
};
