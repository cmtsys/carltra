function updateInfo() {
  const now = new Date();

  const day = now.toLocaleDateString([], {
    weekday: "long"
  });

  const date = now.toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const width = window.innerWidth;
  const height = window.innerHeight;

  document.getElementById("day").textContent = day;
  document.getElementById("date").textContent = date;
  document.getElementById("clock").textContent = time;
  document.getElementById("window-size").textContent = `${width} x ${height}`;
}

updateInfo();
setInterval(updateInfo, 1000);
window.addEventListener("resize", updateInfo);