// GRID
const grid = document.getElementById("grid");

if (grid) {
  projects.forEach(project => {
    const card = document.createElement("a");
    card.className = "card";
    // card.href = project.link; // ENABLE TO TURN ON PROJECT CARD LINKS

    const isVideo = project.image.endsWith(".mp4");

    const media = isVideo
       ? `<video src="${project.image}" autoplay loop muted playsinline></video>`
        : `<img src="${project.image}" alt="${project.title}">`;

      card.innerHTML = `
        ${media}
        <div class="card-text">
        <span class="card-title">${project.title}</span>
        <span class="tagline">${project.tagline}</span>
        </div>
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