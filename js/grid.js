// GRID
const grid = document.getElementById("grid");

if (grid) {
  projects.forEach(project => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = project.link;

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}">
      <span class="card-title">${project.title}</span>
      <span class="tagline2">${project.tagline}</span>
    `;

    grid.appendChild(card);

    //CARD ANIMATION GIF HERE
    // const cards = grid.querySelectorAll('.card');
    // cards.forEach((card, i) => {
    // card.style.animationDelay = `${i * 0.04}s`;
//     });
  });
}



console.log(grid);