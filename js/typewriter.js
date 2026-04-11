const words = [
"UX",
"code",  
"products",  
"interaction",
  "systems",
  "AI",
  "prototypes",
  "interfaces",
  "typography <3",
  "visuals",
  "3D",
  "UX",
  "print"
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
  currentWord = words[i];

  if (isDeleting) {
    j--;
  } else {
    j++;
  }

  document.getElementById("typewriter").textContent =
    currentWord.substring(0, j);

  if (!isDeleting && j === currentWord.length) {
    isDeleting = true;
    setTimeout(type, 1500);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
  }

  setTimeout(type, isDeleting ? 40 : 70);
}

type();