import Geolocation from '@react-native-community/geolocation';

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
  
          resolve({
            latitude,
            longitude,
          });
        },
        error => {
          reject(error);
        },
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 0 ,
        }
      );
    });
  };


// Get readable address from coordinates using Mapbox Geocoding API
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      // Replace with your Mapbox access token
      const MAPBOX_ACCESS_TOKEN =
        'pk.eyJ1IjoibmF6YXItMDA3IiwiYSI6ImNsejYyY2ticzA3aGUyanF1NDcyb3B5a2kifQ.okzZFzu0flrHiLQ2E326lQ';

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=place,locality,neighborhood,address`,
      );

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        // Get the most relevant address
        const feature = data.features[0];

        // Try to build a comprehensive address
        let addressParts = [];

        // Add place name if it's a POI
        if (feature.text) {
          addressParts.push(feature.text);
        }

        // Extract context information (neighborhood, place, region, country)
        if (feature.context) {
          const neighborhood = feature.context.find(c =>
            c.id.startsWith('neighborhood'),
          );
          const place = feature.context.find(c => c.id.startsWith('place'));
          const region = feature.context.find(c => c.id.startsWith('region'));
          const country = feature.context.find(c => c.id.startsWith('country'));

          if (neighborhood && !addressParts.includes(neighborhood.text)) {
            addressParts.push(neighborhood.text);
          }
          if (place && !addressParts.includes(place.text)) {
            addressParts.push(place.text);
          }
          if (region && !addressParts.includes(region.text)) {
            addressParts.push(region.text);
          }
          if (country && !addressParts.includes(country.text)) {
            addressParts.push(country.text);
          }
        }

        // If no parts were found, use the place_name
        if (addressParts.length === 0 && feature.place_name) {
          return feature.place_name;
        }

        return addressParts.join(', ');
      }

      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    } catch (error) {
      console.error('Error getting address:', error);
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  };

  export {getAddressFromCoordinates , getCurrentLocation};
  