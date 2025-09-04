// 🧙🏾 RPG Profile Data
const profile = {
  name: "Leo Antoine",
  title: "Codex Architect",
  dp: 100,
  nextLevelDP: 300,
  skills: ["HTML Structure", "CSS Styling", "Git Workflow"],
  codexEntry: "Currently building Chapter 1: Brainchip Bootstrap. Focused on modular layout and recruiter-facing polish.",
  patchNote: "🛠 v0.1 — Interface scaffolded and styled"
};

// 🧾 Auto-update Quest Log
document.getElementById("name").textContent = profile.name;
document.getElementById("title").textContent = profile.title;
document.getElementById("dp").textContent = profile.dp;

// 🧠 Auto-update Skill Tree
const skillsList = document.getElementById("skills");
skillsList.innerHTML = ""; // Clear existing list
profile.skills.forEach(skill => {
  const li = document.createElement("li");
  li.textContent = `🧠 ${skill}`;
  skillsList.appendChild(li);
});

// 📚 Auto-update Codex Entry
document.getElementById("codex-entry").textContent = profile.codexEntry;

// 📈 Animate DP Progress Bar
const fillBar = document.getElementById("dp-fill");
const progressText = document.getElementById("progress-text");
const nextLevelSpan = document.getElementById("nextLevelDP");

const percent = (profile.dp / profile.nextLevelDP) * 100;
fillBar.style.width = `${percent}%`;
progressText.textContent = `${profile.dp} / ${profile.nextLevelDP} DP to Level 2`;
nextLevelSpan.textContent = profile.nextLevelDP;

// 🎉 Optional Level-Up Trigger
if (profile.dp >= profile.nextLevelDP) {
  fillBar.style.backgroundColor = "gold";
  fillBar.style.boxShadow = "0 0 15px gold";
  progressText.textContent = "🎉 Level Up!";
}

// 🛠 Patch Notes
document.getElementById("patch-info").textContent = profile.patchNote;