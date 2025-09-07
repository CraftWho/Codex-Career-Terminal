// Inject RPG Stats from dp-data.json
fetch('dp-data.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('chatper-title').textContent = data.chapter;
    document.getElementById('dp-lessons').textContent = data.dlFromLessons;
    document.getElementById('dp-repo').textContent = data.repoUpdate;
    document.getElementById('dp-quiz').textContent = data.quizScore;
    document.getElemeentById('dp-total').textContent = data.totalDP;
    document.getElementById('name').textContent = data.name;
    document.getElementById('level').textContent = data.level;
    document.getElementById('title').textContent = data.title;
    document.getElementById('dp').textContent = data.dp;
    document.getElementById('nextlevelDP').textContent = data.nextlevelDP;
    document.getElementById('next-dp').textContent = data.nextLevelDP;
    document.getElementById('progress-text').textContent =
      `${data.dp} / ${data.nextlevelDP} DP to Level ${data.level + 1}`;

    const skillsList = document.getElementById('skills');
    skillsList.innerHTML = '';
    Object.values(data.skills).forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsList.appendChild(li);
    });
      const questList = document.getElementById('side-quests');
    data.sideQuests.forEach(q => {
      const li = document.createElement('li');
      li.textContent = `${q.title} (+${q.dp} DP)`;
      questList.appendChild(li);
    });

    const percent = Math.min((data.dp / data.nextlevelDP) * 100, 100);
    document.querySelector('.fill').style.width = percent + '%';
  })
  .catch(error => {
    console.error('⚠️ Error loading RPG stats:', error);
  });

// Inject Patch Info from patch-data.json
fetch('patch-data.json')
  .then(response => response.json())
  .then(patch => {
    document.getElementById('patch-info').textContent = `🛠 ${patch.version} – ${patch.notes}`;
  })
  .catch(error => {
    console.error('⚠️ Error loading patch info:', error);
  });
