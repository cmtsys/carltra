
const projects = [
  {
    title: "Kote 13",
    tagline: "Art-direction",
    image: "/img/kote.jpg",
    link: "#"
  },
  {
    title: "Website for Rosa Collective",
    tagline: "Framer, code, p5, js",
    image: "/img/rosa.png",
    // image: "https://files.cargocollective.com/c1710241/rosa_vid2.mp4",
    link: "#"
  },
  {
    title: "Daydreaming & screen usage",
    tagline: "Mind-wandering as paradigm",
    image: "/img/daydream.png",
    link: "projects/template.html"
  },
    {
    title: "Artwork production for Damla Kilickiran",
    tagline: "Blender, keyshot",
    image: "/img/nordic.jpeg",
    link: "#"
  },
    {
    title: "Vanishing input component",
    tagline: "JS",
    image: "/img/vanishing.gif",
    link: "#"
  },
    {
    title: "Editorial design for Kote No 14",
    tagline: "Indesign",
    image: "/img/kote14.jpeg",
    link: "#"
  },
    {
    title: "Editorial design for Kote No 13",
    tagline: "Indesign",
    image: "/img/kote13.jpeg",
    link: "#"
  },
  {
  title: "UI Concept for reMarkable",
  tagline: "Figma & Indesign",
  image: "/img/remarkable.jpeg",
  link: "#"
},
  {
    title: "Exploring analog B&W photography",
    image: "/img/analoginc.jpeg",
    tagline: "Olympus OM-1 & Ilford 3200",
    link: "#"
  },
  {
  title: "Exploring VR and shaders in Unity",
  tagline: "Blender, Unity & Quest 2",
  image: "/img/error445.jpeg",
  link: "#"
},
];

const grid = document.getElementById("grid");

projects.forEach(project => {
  const card = document.createElement("a");
  card.className = "card";
  card.href = project.link;

  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}">
    <span class="card-title">${project.title}</span>
    <span class="tagline">${project.tagline}</span>
  `;

  grid.appendChild(card);
});

console.log(grid);