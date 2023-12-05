export function importLocationImages() {
  let locations = [
    "Oakes College",
    "Porter College",
    "Kresge College",
    "Merrill College",
    "College 9",
    "Rachel Carson College",
    "Cowell College",
    "Stevenson College",
    "John R. Lewis College",
    "Crown College",
    "East Field",
    "West Field",
    "McHenry Library",
    "Science and Engineering Library",
    "Stevenson Library",
    "Porter Meadow",
  ];
  locations.sort();

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    let dictVal = [];
    dictVal = Object.keys(images).map((key) => images[key]);
    let result = {};
    locations.forEach(
      (key, i) => (result[key] = [dictVal[i], <h1>Cannot load map</h1>])
    );

    result["Rachel Carson College"] = [
      result["Rachel Carson College"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.7794582955084!2d-122.06729852300826!3d36.99119715690797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e4199114b7b31%3A0x2ff8246c9c50ae92!2sRachel%20Carson%20College!5e0!3m2!1sen!2sus!4v1701585391930!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["Oakes College"] = [
      result["Oakes College"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.8514102271556!2d-122.06543322300831!3d36.98947985700511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e4199b887fe6b%3A0x604b26128a605523!2sOakes%20College!5e0!3m2!1sen!2sus!4v1701585419395!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["Porter College"] = [
      result["Porter College"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.647689134883!2d-122.06781372300827!3d36.994341956729805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e419eed06a79d%3A0x5f8170600ebf1be9!2sPorter%20College!5e0!3m2!1sen!2sus!4v1701585446081!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["Kresge College"] = [
      result["Kresge College"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.4575091197958!2d-122.07099820679699!3d36.998880384779675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e4142c9d48205%3A0x9aa6de75ea3e1b66!2sKresge%20Academic%20Building!5e0!3m2!1sen!2sus!4v1701585469229!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["Merrill College"] = [
      result["Merrill College"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.4150793956583!2d-122.05583502300809!3d36.99989285641569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e41a70c0201ad%3A0x75ded595c790758f!2sMerrill%20College!5e0!3m2!1sen!2sus!4v1701585773589!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["College 9"] = [
      result["College 9"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.4150793956583!2d-122.05583502300809!3d36.99989285641569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e410a5df1fe0d%3A0x5f5ceef5d651e6ca!2sCollege%20Nine%2FJohn%20R.%20Lewis%20Dining%20Hall!5e0!3m2!1sen!2sus!4v1701585794339!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["John R. Lewis College"] = [
      result["John R. Lewis College"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.4150793956583!2d-122.05583502300809!3d36.99989285641569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e410a5df1fe0d%3A0x5f5ceef5d651e6ca!2sCollege%20Nine%2FJohn%20R.%20Lewis%20Dining%20Hall!5e0!3m2!1sen!2sus!4v1701585794339!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["East Field"] = [
      result["East Field"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.620645268803!2d-122.05652902300834!3d36.994987356693315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e41a4158fec47%3A0xfc709137c7491633!2sEast%20Field%20House!5e0!3m2!1sen!2sus!4v1701585829159!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["West Field"] = [
      result["West Field"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d900.7374018129128!2d-122.06328014164963!3d36.9914138249552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e41991c24510f%3A0x29e9d3eb3bd95872!2sAthletics%20and%20Recreation%20West%20Field%20House!5e0!3m2!1sen!2sus!4v1701585865864!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["McHenry Library"] = [
      result["McHenry Library"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d900.7374018129128!2d-122.06328014164963!3d36.9914138249552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e41a1a4b2b793%3A0xe94123003629bcf3!2sMcHenry%20Library!5e0!3m2!1sen!2sus!4v1701585876746!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["Science and Engineering Library"] = [
      result["Science and Engineering Library"],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.589343605068!2d-122.06157942300811!3d36.995734356651084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e410aa99ce159%3A0x1db4fbe217e211a2!2sScience%20and%20Engineering%20Library!5e0!3m2!1sen!2sus!4v1701585896290!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["Stevenson Library"] = [
      result["Stevenson Library"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.447720902329!2d-122.06329852300816!3d36.99911395645965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e41a67159c4c9%3A0x1be00712c904b16a!2sAdlai%20E.%20Stevenson%20Library!5e0!3m2!1sen!2sus!4v1701585919361!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["Porter Meadow"] = [
      result["Porter Meadow"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.647689134883!2d-122.06781372300829!3d36.994341956729805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e419eed06a79d%3A0x5f8170600ebf1be9!2sPorter%20College!5e0!3m2!1sen!2sus!4v1701585935425!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["Crown College"] = [
      result["Crown College"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.3996687326035!2d-122.05939831119326!3d37.000260584704314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e41a74eb970e5%3A0x35e1b7fc81fa5936!2sCrown%20College!5e0!3m2!1sen!2sus!4v1701740937588!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    result["Stevenson College"] = [
      result["Stevenson College"][0],
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12746.141443427137!2d-122.0519051!3d36.9970226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e41a670cccc5f%3A0x32aed255a8a83622!2sStevenson%20College!5e0!3m2!1sen!2sus!4v1701815032842!5m2!1sen!2sus"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>,
    ];
    return result;
  }

  const imageDictionary = importAll(
    require.context("../components/images/location_images", true)
  );
  return imageDictionary;
}
