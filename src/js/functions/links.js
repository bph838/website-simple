export function makeSafeId(str) {
  return str
    .toLowerCase()                 // optional: convert to lowercase
    .trim()                         // remove leading/trailing spaces
    .replace(/\s+/g, '-')           // replace spaces with hyphens
    .replace(/[^a-z0-9\-_]/g, ''); // remove everything else
}


/**
 * Sets or creates an Open Graph meta tag.
 * @param {string} property - The OG property, e.g., "og:title"
 * @param {string} content - The content value to set
 */
export function setMeta(property, content) {
  let meta = document.querySelector(`meta[property='${property}']`);
  
  if (!meta) {
    // Create meta if it doesn't exist
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);

  if(property=="og:title"){

  }
}

export function setPageTitle(titleText) {
  // Update <title>
  if (document.title !== titleText) {
    document.title = titleText;
  }

  // Update or create <meta property="og:title" />
  let meta = document.querySelector(`meta[property='og:title']`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', 'og:title');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', titleText);
}


