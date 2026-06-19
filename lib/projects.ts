export type Project = {
    title: string
    tagline: string
    image: string
    slug: string
    link: string
    featured?: boolean
}

const projects: Project[] = [
  {
  title: "Artwork production for Damla Kilickiran",
  tagline: "Bridging art and engineering at A-blokka",
  image: "/img/nordic.jpeg",
  slug: "artwork",
  link: "projects/artwork.html",
  featured: true
},
  {
    title: "Daydreams & doomscrolling",
    tagline: "Exploring mind-wandering on smart phones",
    image: "/img/daydream/daydream.png",
    slug: "daydream",
    link: "projects/daydream",
    featured: true
  },
  {
    title: "Website for Rosa Collective",
    tagline: "Framer, code, p5, js",
    image: "/img/rosa.png",
    slug: "rosa",
    link: "#"
  },
  {
    title: "Kote 12",
    tagline: "Art-direction",
    image: "/img/kote.jpg",
    slug: "kote12",
    link: "#",
    featured: true
  },
  {
  title: "Exploring VR and shaders in Unity",
  tagline: "Blender, Unity & Quest 2",
  // image: "/img/error445.jpeg",
  image: "/img/short480.mp4",
  slug: "error",
  link: "#"
  },
  {
  title: "Teams-native touch panel app for Huddly",
  tagline: "Scoping and designing in-room camera controls",
  image: "/img/huddly.png",
  slug: "huddly",
  link: "projects/huddly.html",
    featured: true
  },
  {
  title: "UI Concept for reMarkable",
  tagline: "Reimagining navigation on a paper tablet",
  image: "/img/rmgif.gif",
  // image: "/img/remarkable.jpeg",
  slug: "remarkable",
  link: "projects/remarkable.html"
  },
  {
    title: "Editorial design for Kote No 14",
    tagline: "Indesign",
    image: "/img/kote14.jpeg",
    slug: "kote14",
    link: "#"
  },
  {
  title: "Vanishing input component",
  tagline: "JS",
  image: "/img/vanishing.gif",
  slug: "vanish",
  link: "#"
},
    {
    title: "Editorial design for Kote No 13",
    tagline: "Indesign",
    image: "/img/kote13.jpeg",
    slug: "kote13",
    link: "#"
  },
  {
    title: "Exploring analog B&W photography",
    image: "/img/analoginc.jpeg",
    tagline: "Olympus OM-1 & Ilford 3200",
    slug: "analog",
    link: "#"
  },
];

export default projects