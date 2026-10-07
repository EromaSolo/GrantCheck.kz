// All static data lives here. Later this file is replaced by fetch('/api/...') calls to the backend.
window.GC = window.GC || {};

// Mathematics + Informatics only. Competition: midpoint of the grant range, applicants per place.
GC.DIRECTIONS = {
  it:   { code: "B057",        name: "Information Technology",  about: "IT, Software Engineering, Systems Analysis",       grantsRange: "4,600–5,200", competition: 4.0 },
  sec:  { code: "B058",        name: "Information Security",    about: "Cybersecurity, data protection",                   grantsRange: "1,900–3,300", competition: 5.15 },
  data: { code: "B157 / B054", name: "Modeling & Data Science", about: "Mathematical and computer modeling, Data Science", grantsRange: "≈300",        competition: 2.75 },
  edu:  { code: "B011",        name: "Informatics Teacher",     about: "Pedagogy: Mathematics–Informatics",                grantsRange: "400–750",     competition: 1.75 }
};

// Minimum university thresholds for 2026 only. [direction, program, threshold]
const T = (uni, rows) => rows.map(r => ({ uni, dir: r[0], program: r[1], threshold: r[2] }));
GC.PROGRAMS = [
  ...T("KBTU", [["it","Automation and Control",110],["it","Information Systems",110],["it","Information Technology",110],["it","Computer Engineering and Software",110],["data","Mathematical and Computer Modeling",110],["sec","Cybersecurity",110]]),
  ...T("SDU University", [["it","Software Engineering",120],["it","Computer Science",120],["it","Information Systems",120],["edu","Mathematics Education (Math/Informatics)",120]]),
  ...T("L.N. Gumilyov ENU", [["it","Information Systems",110],["it","Computer Engineering and Software",110],["sec","Information Security",110],["data","Mathematical and Computer Modeling",90],["edu","Informatics Teacher Training",90]]),
  ...T("Al-Farabi KazNU", [["it","Information Systems",110],["it","Computer Science (Computer Engineering)",110],["sec","Information Security",110],["data","Mathematical and Computer Modeling",100],["data","Data Science",110]]),
  ...T("Satbayev University", [["it","Software Engineering",95],["it","Information Systems",85],["it","Computer Engineering and Software",85],["sec","Information Security",85]]),
  ...T("Narxoz University", [["it","Digital Engineering (B057)",105],["sec","Information Security (B058)",100],["data","Business Analytics and Big Data",105]]),
  // New programs go at the END so ids saved in shortlists stay valid.
  ...T("Astana IT University (AITU)", [["it","Information Technology (B057)",100],["sec","Information Security (B058)",93]])
].map((p, i) => Object.assign({ id: i }, p));

GC.STEPS = [
  ["Late July", "Check that your two profile subjects are Mathematics and Informatics"],
  ["Late July", "Prepare your UNT certificate and an identity document"],
  ["Early August", "Apply to the grant competition and list your priorities (up to 4 educational programs)"],
  ["Mid August", "Wait for the official grant competition results"],
  ["Late August", "Submit your original documents to the admissions office of your chosen university"]
];
