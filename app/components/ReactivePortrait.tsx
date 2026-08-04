// "use client";

// import { useState } from "react";

// export default function ReactivePortrait() {
//   const [active, setActive] = useState(false);

//   return (
//     <button
//       className={`image-effect ${active ? "is-playing" : ""}`}
//       type="button"
//       onClick={() => setActive(true)}
//       onAnimationEnd={() => setActive(false)}
//       aria-label="Animate portrait"
//     >
//       <img
//         className="about-portrait"
//         src="/img/cm.png"
//         alt="I look something like this"
//       />
//     </button>
//   );
// }