fetch('./dp-data.json')
  .then(res => res.json())
  .then(data => {
    // 🧑 Profile Info
    document.getElementById('name').textContent = data.name;
    document.getElementById('class').textContent = data.class;
    document.getElementById('level').textContent = data.level;
    document.getElementById('dp').textContent = data.dp;
    document.getElementById('next-dp').textContent = data.nextlevelDP;
    document.getElementById('title').textContent = data.title;

    const now = new Date().toLocaleString();
    document.getElementById('last-sync').textContent = now;

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
    if (data.chapterProgress) { // Check if chapterProgress exists
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
      questList.innerHTML = '';
      cp.sideQuests.forEach(q => {
        const li = document.createElement('li');
        li.textContent = `${q.title} (+${q.dp} DP) – ${q.status}`;
        questList.appendChild(li);
      });

      // 🧾 Patch Notes
      const patchList = document.getElementById('patch-notes');
      patchList.innerHTML = '';
      cp.patchNotes.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.date}: ${p.change} – ${p.notes}`;
        patchList.appendChild(li);
      });

      // 🔓 Codex Unlocks
      const unlockList = document.getElementById('codex-unlocks');
      unlockList.innerHTML = '';
      cp.codexUnlocks.forEach(u => {
        const li = document.createElement('li');
        li.textContent = `${u.title}: ${u.ability}`;
        unlockList.appendChild(li);
      });
    }
  })
  .catch(error => console.error('Error fetching data:', error));

function injectStartPage(data) {
  document.getElementById('name').textContent = data.name;
  document.getElementById('class').textContent = data.class;
  document.getElementById('dp').textContent = data.dp;
  document.getElementById('next-dp').textContent = data.nextlevelDP;
  document.getElementById('title').textContent = data.title;
  document.getElementById('level').textContent = data.level;

  const now = new Date().toLocaleString();
  document.getElementById('last-sync').textContent = now;
}

const page = document.body.getAttribute('data-page');
if (page === 'start') {
  fetch('./dp-data.json')
    .then(res => res.json())
    .then(data => injectStartPage(data))
    .catch(error => console.error('Error fetching data for start page:', error));
}