
  // Returns an array of location objects for search results:
  export const createSearchLocationsObjects = (data) => {
    if (!data || data.length < 1) {
      return;
    }
    let locationsObjects = data.map( location => {
        let locationKey = location.Key;
        let locationCity = location.LocalizedName;
        let locationCountry = location.Country.LocalizedName;
        let locationDisplay = locationCity + " | (" + locationCountry + ")";
        return {locationDisplay, locationKey, locationCity, locationCountry};
    });
    return locationsObjects;
  }
  
  // Returns an object of location for local state storage:
  export const createCurrentLocation = (detectedLocation, defaultLocation, id) => {

    if (!id || !id.includes("::")) {
      if (detectedLocation) {
        return detectedLocation;
      }
      return defaultLocation;
    } 
    let idArray = id.split("::");
    return {city: idArray[0], country: idArray[1], key: idArray[2]};
  }