const baseApiUrl = "http://localhost:3333";

async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

async function getDashboardData(query) {
  console.log(`Sto caricando i dati per la query ${query}`);
  const destinantionPromise = await fetchJson(
    `${baseApiUrl}/destinations?search=${query}`
  );
  //   console.log("DestinantionPromise :", destinantionPromise);

  const weathersPromise = await fetchJson(
    `${baseApiUrl}/weathers?search=${query}`
  );

  //   console.log("WeathersPromise :", weathersPromise);

  const airportsPromise = await fetchJson(
    `${baseApiUrl}/airports?search=${query}`
  );
  //   console.log("AirportsPromise :", airportsPromise);

  const promises = [destinantionPromise, weathersPromise, airportsPromise];

  const [destinations, weathers, airports] = await Promise.all(promises);

  return {
    city: destinations[0]?.name ?? null,
    country: destinations[0]?.country ?? null,
    temperature: weathers[0]?.temperature ?? null,
    weather: weathers[0]?.weather_description ?? null,
    airport: airports[0]?.name ?? null,
  };
}
getDashboardData("Vienna")
  .then((data) => {
    console.log("Dasboard data:", data);
    let frase = "";
    if (data.city !== null && data.country !== null) {
      frase += `${data.city} is in ${data.country}.\n`;
    }
    if (data.temperature !== null && data.weather !== null) {
      frase += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
    }
    if (data.airport !== null) {
      frase += `The main airport is ${data.airport}.\n`;
    }
    console.log(frase);
  })
  .catch((error) => console.error(error));
