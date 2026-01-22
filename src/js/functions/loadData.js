// loadData.js


export async function fetchJson(url) {
  try {
    console.log(`Fetching: ${url}`)
    const response = await fetch(url); // fetch the URL

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // parse JSON
    return data;
  } catch (error) {
    console.error("Failed to fetch JSON:", error);
    return null; // or throw error if you prefer
  }
}


/**  try {
    const response = fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`Failed to load JSON: ${response.status}`);
    }
    const data = response.json();
    return data; // <-- returns the JSON object
  } catch (error) {
    console.error(error);
    return null; // or throw error if you want
  } */