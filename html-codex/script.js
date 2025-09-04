// Codex Profile Data
const profile = {
  name: "Leo",
  level: 1,
  title: "Codex Architect",
  dp: 100,
  nextLevelDP: 300,
  skills: ["HTML Structure", "CSS Styling", "Git Workflow"],
  codexProgress: "Building Chapter 1: Brainchip Bootstrap",
  patchNote: "v0.1 — Interface scaffolded and styled"
};

// Update Quest Log
document.getElementById("name").textContent = profile.name;
document.getElementById("level").textContent = profile.level;
document.getElementById("title").textContent = profile.title;
document.getElementById("dp").textContent = profile.dp;
document.getElementById("nextlevelDP").textContent = profile.nextLevelDP;

// Update Skill Tree
const skillsList = document.getElementById("skills");
profile.skills.forEach(skill => {
  const li = document.createElement("li");
  li.textContent = `🧠 ${skill}`;
  skillsList.appendChild(li);
});

// Update Codex Progress
document.getElementById("progress-text").textContent = profile.codexProgress;
document.querySelector(".fill").style.width = `${(profile.dp / profile.nextLevelDP) * 100}%`;

// Update Patch Notes
document.getElementById("patch-info").textContent = profile.patchNote;