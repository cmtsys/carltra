
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
    link: "#"
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
  title: "Remarkable stacks",
  tagline: "UI Concept for reMarkable",
  image: "/img/remarkable.jpeg",
  link: "#"
},
  {
  title: "UI Concept for reMarkable",
  tagline: "Figma & Indesign",
  image: "/img/remarkable.jpeg",
  link: "#"
},
  {
    title: "Analog Incidents",
    image: "/img/analoginc.jpeg",
    tagline: "Exploring analog B&W photography",
    link: "#"
  },
  {
  title: "Error 445",
  tagline: "Exploring VR and shaders in Unity",
  image: "/img/error445.jpeg",
  link: "#"
},
  {
  title: "Exploring VR and shaders in Unity",
  tagline: "Blender, Meta & Unity",
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