fetch("dp.json")
  .then(response => response.json())
  .then(profile => {
    // 🧾 Quest Log
    document.getElementById("name").textContent = profile.name;
    document.getElementById("title").textContent = profile.title;
    document.getElementById("dp").textContent = profile.dp;

    // 🧠 Skill Tree
    const skillEmojis = {
      "HTML Structure": "🧱",
      "CSS Styling": "🎨",
      "Git Workflow": "🛠️"
    };

    const skillsList = document.getElementById("skills");
    skillsList.innerHTML = "";
    profile.skills.forEach(skill => {
      const li = document.createElement("li");
      const emoji = skillEmojis[skill] || "🧠";
      li.textContent = `${emoji} ${skill}`;
      skillsList.appendChild(li);
    });

    // 📚 Codex Entry
    document.getElementById("codex-entry").textContent = profile.codexEntry;

    // 📈 DP Progress Bar
    const fillBar = document.getElementById("dp-fill");
    const progressText = document.getElementById("progress-text");
    const nextLevelSpan = document.getElementById("nextLevelDP");

    const percent = (profile.dp / profile.nextLevelDP) * 100;
    fillBar.style.width = `${percent}%`;
    progressText.textContent = `${profile.dp} / ${profile.nextLevelDP} DP to Level 2`;
    nextLevelSpan.textContent = profile.nextLevelDP;

    if (profile.dp >= profile.nextLevelDP) {
      fillBar.style.backgroundColor = "gold";
      fillBar.style.boxShadow = "0 0 15px gold";
      progressText.textContent = "🎉 Level Up!";
    }

    // 🛠 Patch Notes
    document.getElementById("patch-info").textContent = profile.patchNote;
  })
  .catch(error => console.error("Failed to load DP data:", error));