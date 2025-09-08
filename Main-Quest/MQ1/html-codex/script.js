fetch('./dp-data.json') // ✅ works from any HTML file in html-codex/
  .then(res => res.json())
  .then(data => {
    // 🧑 Profile Info
    document.getElementById('name').textContent = data.name;
    // document.getElementById('class').textContent = data.class; // No element with id 'class'
    document.getElementById('level').textContent = data.level;
    document.getElementById('dp').textContent = data.dp;    
    if (document.getElementById('nextlevelDP')) document.getElementById('nextlevelDP').textContent = data.nextlevelDP;
    document.getElementById('title').textContent = data.title;

    // const now = new Date().toLocaleString();
    // document.getElementById('last-sync').textContent = now; // No element with id 'last-sync'

    // 🧠 Skills
    if (document.getElementById('skills')) { // Check if element exists
      const skillsList = document.getElementById('skills');
      skillsList.innerHTML = '';
      data.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
      });
    }

    // 📁 Chapter Info
    // Check if chapterProgress exists and if a container for it is on the page
    if (data.chapterProgress && document.getElementById('chapter-title')) { 
        document.getElementById('chapter-title').textContent = data.currentChapter;
        const cp = data.chapterProgress;
        document.getElementById('dp-lessons').textContent = cp.dpFromLessons;
        document.getElementById('dp-repo').textContent = cp.repoUpdate;
        document.getElementById('dp-quiz').textContent = cp.quizScore;
  
        const totalChapterDP = cp.dpFromLessons + cp.repoUpdate + cp.quizScore +
          cp.sideQuests.reduce((sum, q) => sum + q.dp, 0);
        document.getElementById('dp-total').textContent = totalChapterDP;
  
        // 🎯 Side Quests
        const questList = document.getElementById('side-quests');
        if (questList) {
            questList.innerHTML = '';
            cp.sideQuests.forEach(q => {
                const li = document.createElement('li');
                li.textContent = `${q.title} (+${q.dp} DP) – ${q.status}`;
                questList.appendChild(li);
            });
        }
  
        // 🧾 Patch Notes
        const patchList = document.getElementById('patch-notes');
        if (patchList) {
            patchList.innerHTML = '';
            cp.patchNotes.forEach(p => {
                const li = document.createElement('li');
                li.textContent = `${p.date}: ${p.change} – ${p.notes}`;
                patchList.appendChild(li);
            });
        }
  
        // 🔓 Codex Unlocks
        const unlockList = document.getElementById('codex-unlocks');
        if (unlockList) {
            unlockList.innerHTML = '';
            cp.codexUnlocks.forEach(u => {
                const li = document.createElement('li');
                li.textContent = `${u.title}: ${u.ability}`;
                unlockList.appendChild(li);
            });
        }
    }
  })
  .catch(error => console.error('Error fetching data:', error));

  document.addEventListener('DOMContentLoaded', () => {
  fetch('./dp-data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderDashboard(data);
    })
    .catch(error => {
      console.error('Fetch failed:', error);
    });
});

function renderDashboard(data) {
  // Example: Update DP progress
  const dpElement = document.getElementById('dp-progress');
  if (dpElement) {
    dpElement.textContent = `DP: ${data.dp} / ${data.nextLevelDP}`;
  }

  // Example: Update current level
  const levelElement = document.getElementById('current-level');
  if (levelElement) {
    levelElement.textContent = `Level ${data.level}`;
  }

  // Example: Render unlocked skills
  const skillsContainer = document.getElementById('skills-unlocked');
  if (skillsContainer && Array.isArray(data.skills)) {
    skillsContainer.innerHTML = '';
    data.skills.forEach(skill => {
      const skillItem = document.createElement('li');
      skillItem.textContent = skill;
      skillsContainer.appendChild(skillItem);
    });
  }
}