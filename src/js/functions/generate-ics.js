const fs = require('fs');
const path = require('path');

module.exports = function generateICS() {
  const eventsPath = path.resolve(__dirname, '../../data/events.json');
  const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

  let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourSite//Events//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

  events.forEach((event, index) => {
    const formatDate = (date) =>
      date.replace(/[-:]/g, '').replace('.000Z', 'Z');

    const start = formatDate(event.start);
    const end = event.end ? `\nDTEND:${formatDate(event.end)}` : '';

    ics += `
BEGIN:VEVENT
UID:event-${index}@yourdomain.com
DTSTAMP:${start}
DTSTART:${start}${end}
SUMMARY:${event.title}
END:VEVENT
`;
  });

  ics += '\nEND:VCALENDAR';

  return ics.trim();
};
