export type Project = {
  title: string
  tagline: string
  image: string
  slug: string
  link?: string
  featured?: boolean
  comingSoon?: boolean
  description?: string

  eyebrow?: string
  heading?: string
  heroImage?: string
}

const projects: Project[] = [
  {
    title: "Teams-native touch panel app for Huddly",
    tagline: "Scoping and designing in-room camera controls",
    image: "/img/huddly/huddly.png",
    slug: "huddly",
    link: "/projects/huddly",
    featured: true,
    comingSoon: true
  },
  {
    title: "Artwork production for Damla Kilickiran",
    tagline: "Bridging art and engineering at A-blokka",
    image: "/img/nordic.jpeg",
    slug: "damla",
    link: "/projects/damla",
    featured: true
  },
  {
    title: "Daydreams & doomscrolling",
    tagline: "Exploring mind-wandering on smart phones",
    image: "/img/daydream/daydream.png",
    slug: "daydream",
    link: "/projects/daydream",
    featured: true,
    eyebrow: "Master's thesis at AHO",
    heading: "Daydreams & Doomscrolling",
    heroImage: "/img/daydream/daydream2.png",
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
    tagline: "Art-direction for urbanism",
    image: "/img/kote.jpg",
    slug: "kote12",
    link: "#"
  },
  {
    title: "Magasinet Kote",
    tagline: "Editorial design for urbanism and landscape",
    image: "/img/kote.jpg",
    slug: "kote",
    link: "/projects/kote",
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
    title: "UI Concept for reMarkable",
    tagline: "Reimagining navigation on a paper tablet",
    image: "/img/rmgif.gif",
    // image: "/img/remarkable.jpeg",
    slug: "remarkable",
    link: "/projects/remarkable",
    featured: true
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

export default projects;