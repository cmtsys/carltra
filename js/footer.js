const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const widthEl = document.getElementById("width");
const heightEl = document.getElementById("height");

function updateClock() {
  const now = new Date();

  timeEl.textContent = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  dateEl.textContent = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function updateSize() {
  widthEl.textContent = window.innerWidth;
  heightEl.textContent = window.innerHeight;
}

updateClock();
updateSize();

setInterval(updateClock, 1000);
window.addEventListener("resize", updateSize);

