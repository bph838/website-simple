export function makeSafeId(str) {
  return str
    .toLowerCase()                 // optional: convert to lowercase
    .trim()                         // remove leading/trailing spaces
    .replace(/\s+/g, '-')           // replace spaces with hyphens
    .replace(/[^a-z0-9\-_]/g, ''); // remove everything else
}