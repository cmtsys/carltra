
// // NEXT PROJECT
// function renderNextProject() {
//   const nextEl = document.getElementById('nextproject');
//   if (!nextEl) return;

//   const current = window.location.pathname;
//   const currentIndex = projects.findIndex(p => current.includes(p.slug));
//   const next = projects[currentIndex + 1] || projects[0];

// nextEl.innerHTML = `
//   <a class="nextproject" href="${next.link}">
//     <p>Next project → </p>
//     <img class="nextproject-img" src="${next.image}" alt="${next.title}">
//     </a>
//     `;
//   }
  
//   // <p>${next.title}</p>

// renderNextProject();

// console.log("MY NEXTPROJECT JS IS RUNNING");

// PROJECT NAV
function renderProjectNav() {
  const navEl = document.getElementById('project-nav');
  if (!navEl) return;

  const current = window.location.pathname;
  const currentIndex = projects.findIndex(p => current.includes(p.slug));

  const previous =
    projects[currentIndex - 1] || projects[projects.length - 1];

  const next =
    projects[currentIndex + 1] || projects[0];

navEl.innerHTML = `
  <div class="project-nav">

    <a class="project-link" href="${previous.link}">
      <p>← Previous</p>
      <img class="project-img" src="${previous.image}" alt="${previous.title}">
    </a>

    <a class="project-link next" href="${next.link}">
      <p>Next →</p>
      <img class="project-img" src="${next.image}" alt="${next.title}">
    </a>

  </div>
`;
}

renderProjectNav();

console.log("PROJECT NAV JS IS RUNNING");