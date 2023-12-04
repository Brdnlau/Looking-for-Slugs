export function importLocationImages () {
    let locations = ["Oakes College", "Porter College", "Kresge College", "Merrill College", "College 9", "Rachel Carson College",
                    "Cowell College", "Stevenson College", "John R. Lewis College", "East Field", "West Field", "McHenry Library",
                    "Science and Engineering Library", "Stevenson Library", "Porter Meadow"];
    locations.sort();

    function importAll(r) {

        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        let dictVal = []
        dictVal = Object.keys(images).map(key => images[key]);
        let result = {}
        locations.forEach((key, i) => result[key] = dictVal[i]);
        return result;
      }
      
    const imageDictionary = importAll(require.context('../components/images/location_images', true));
    return imageDictionary;
}