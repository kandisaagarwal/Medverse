// src/utils/geocode.js
async function getLatLong(city, country) {
  if (!city || !country) return { lat: null, long: null };

  const query = encodeURIComponent(`${city}, ${country}`);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "MedverseApp/1.0" } // required by Nominatim
    });
    const data = await response.json();

    if (data.length === 0) return { lat: null, long: null };

    return {
      lat: parseFloat(data[0].lat),
      long: parseFloat(data[0].lon)
    };
  } catch (err) {
    console.error("Geocoding error:", err);
    return { lat: null, long: null };
  }
}

module.exports = { getLatLong };
