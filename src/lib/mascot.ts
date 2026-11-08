// The cartoon SIPES technician who answers every question.
// Rename him here; the prompt, UI and alt text all read from this.
export const MASCOT = {
  name: "Mr. SIPES",
  role: "your guide to UBMC Group",
  poses: {
    standing: { src: "/mascot/standing.png", width: 443, height: 1200 },
    standingAlt: { src: "/mascot/standing-alt.png", width: 407, height: 1200 },
    armsCrossed: { src: "/mascot/arms-crossed.png", width: 507, height: 900 },
    face: { src: "/mascot/face.png", width: 256, height: 256 },
    van: { src: "/mascot/van.jpg", width: 900, height: 985 },
  },
} as const;
