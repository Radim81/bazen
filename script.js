const CHANNEL_ID = "3420684";
const READ_API_KEY = "C5Q94LTXS3F6DQNB";

const UPDATE_INTERVAL_MS = 15000;

async function nactiTeploty() {
  const url =
    `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json?api_key=${READ_API_KEY}&nocache=${Date.now()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("HTTP chyba: " + response.status);
    }

    const data = await response.json();

    const voda = Number(data.field1);
    const strecha = Number(data.field2);

    document.getElementById("voda").innerText = voda.toFixed(2) + " °C";
    document.getElementById("strecha").innerText = strecha.toFixed(2) + " °C";

    const datum = new Date(data.created_at);
    document.getElementById("cas").innerText =
      "Poslední měření: " + datum.toLocaleString("cs-CZ");

    document.getElementById("stav").innerText =
      "Aktualizováno: " + new Date().toLocaleTimeString("cs-CZ");

  } catch (error) {
    document.getElementById("stav").innerText =
      "Chyba načítání dat z ThingSpeak";
  }
}

nactiTeploty();
setInterval(nactiTeploty, UPDATE_INTERVAL_MS);
