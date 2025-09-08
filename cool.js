const quotes = [
  "La fortuna aiuta gli audaci.",
  "Non aspettare il momento perfetto. Coglilo e rendilo perfetto.",
  "Il successo è la somma di piccoli sforzi ripetuti giorno dopo giorno.",
  "Sii il cambiamento che vuoi vedere nel mondo.",
  "Ogni errore è un'opportunità per imparare qualcosa di nuovo.",
];

const modal = document.getElementById("quoteModal");
const btn = document.getElementById("quoteBtn");
const span = document.querySelector(".close");
const quoteText = document.getElementById("quoteText");

btn.onclick = function () {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = randomQuote;
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
