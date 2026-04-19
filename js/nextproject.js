
// NEXT PROJECT
function renderNextProject() {
  const nextEl = document.getElementById('nextproject');
  if (!nextEl) return;

  const current = window.location.pathname;
  const currentIndex = projects.findIndex(p => current.includes(p.slug));
  const next = projects[currentIndex + 1] || projects[0];

nextEl.innerHTML = `
  <a class="nextproject" href="${next.link}">
    <p>Want to see more?</p>
    <img class="nextproject-img" src="${next.image}" alt="${next.title}">
    <p>${next.title}</p>
  </a>
`;
}

renderNextProject();

console.log("MY NEXTPROJECT JS IS RUNNING");
