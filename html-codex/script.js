// RPG Profile Data
const profile = {
  name: "Leo Antoine",
  title: "Codex Architect",
  xp: 100,
  nextLevelXP: 300,
  skills: ["HTML Structure", "CSS Styling", "Git Workflow"],
  codexEntry: "Currently building Chapter 1: Brainchip Bootstrap. Focused on modular layout and recruiter-facing polish."
};

// Auto-update Quest Log
document.getElementById("name").textContent = profile.name;
document.getElementById("title").textContent = profile.title;
document.getElementById("xp").textContent = profile.xp;
document.getElementById("nextLevelXP").textContent = profile.nextLevelXP;

// Auto-update Skill Tree
const skillsList = document.getElementById("skills");
profile.skills.forEach(skill => {
  const li = document.createElement("li");
  li.textContent = `🧠 ${skill}`;
  skillsList.appendChild(li);
});

// Auto-update Codex
document.getElementById("codex-entry").textContent = profile.codexEntry;