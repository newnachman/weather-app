
  // Returns an array of location objects:
  export const createLocationsObjects = (data) => {

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