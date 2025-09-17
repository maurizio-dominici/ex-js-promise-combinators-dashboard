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

  const [destinationsResults, weathersResults, airportsResults] =
    await Promise.allSettled(promises);

  const data = {};

  if (destinationsResults.status === "rejected") {
    console.error("Problema in destination :", destinationsResults.reason);
    data.city = null;
    data.country = null;
  } else {
    data.city = destinationsResults.value[0]?.name ?? null;
    data.country = destinationsResults.value[0]?.country ?? null;
  }
  if (weathersResults.status === "rejected") {
    console.error("Problema in weathers :", weathersResults.reason);
    data.temperature = null;
    data.weather = null;
  } else {
    data.temperature = weathersResults.value[0]?.temperature ?? null;
    data.weather = weathersResults.value[0]?.weather_description ?? null;
  }
  if (airportsResults.status === "rejected") {
    console.error("Problema in Airports :", airportsResults.reason);
    data.airport = null;
  } else {
    data.airport = airportsResults.value[0]?.name ?? null;
  }

  console.log(weathersResults);

  return data;
}
getDashboardData("london")
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
