document.addEventListener('DOMContentLoaded', () => {
  fetch('./dp-data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(renderDashboard)
    .catch(error => {
      console.error('Fetch failed:', error);
    });
});

function renderDashboard(data) {
  // 🧑 Profile Info
  document.getElementById('name').textContent = data.name;
  document.getElementById('class').textContent = data.class;
  document.getElementById('level').textContent = data.level;
  document.getElementById('dp').textContent = data.dp;
  document.getElementById('nextlevelDP').textContent = data.nextlevelDP;
  document.getElementById('title').textContent = data.title;

  // 🎯 DP Progress
  const progressFill = document.querySelector('.progress .fill');
  const progressText = document.getElementById('progress-text');
  if (progressFill && progressText && data.nextlevelDP > 0) {
    const percentage = (data.dp / data.nextlevelDP) * 100;
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${data.dp} / ${data.nextlevelDP} DP`;
  }

  // 🧠 Skills
  const skillsList = document.getElementById('skills');
  if (skillsList && Array.isArray(data.skills)) {
    skillsList.innerHTML = ''; // Clear existing skills
    data.skills.forEach(skill => {
      const skillItem = document.createElement('li');
      skillItem.textContent = skill;
      skillsList.appendChild(skillItem);
    });
  }
}