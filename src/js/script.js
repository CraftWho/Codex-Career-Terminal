// This event listener waits for the HTML document to be fully loaded
// before executing the code.
document.addEventListener('DOMContentLoaded', () => {

  // This is a single data source for both the dashboard and skill tree.
  // It will eventually be loaded from your JSON file.
  const skillData = {
    'Modular Repo Scaffolding': {
      description: 'Ability to set up clean, scalable project structures.',
      unlocked: true,
      prerequisite: null,
    },
    'Semantic HTML Fluency': {
      description: 'Using correct HTML tags to create meaningful and accessible documents.',
      unlocked: true,
      prerequisite: null,
    },
    'GitHub Pages Deployment': {
      description: 'Publishing your project live for recruiter access.',
      unlocked: true,
      prerequisite: 'Modular Repo Scaffolding',
    },
    'React Fundamentals': {
      description: 'Understanding of components, props, and JSX.',
      unlocked: false,
      prerequisite: 'Semantic HTML Fluency',
    },
    'State Management': {
      description: 'Managing application data with React hooks or Redux.',
      unlocked: false,
      prerequisite: 'React Fundamentals',
    },
  };

  // We check the current page to run the correct functions.
  // This helps keep your code organized.
  if (window.location.pathname.includes('dashboard.html')) {
    fetchDataAndRenderDashboard();
  } else if (window.location.pathname.includes('skill-tree.html')) {
    renderSkillTreeHTML(skillData);
  } else if (window.location.pathname.includes('quest-log.html')) {
    // Check if the URL has a quest ID parameter.
    const urlParams = new URLSearchParams(window.location.search);
    const questId = urlParams.get('id');

    if (questId) {
      // If a quest ID is in the URL, fetch the list to find the quest path.
      fetch('./data/dp-data.json')
        .then(response => response.json())
        .then(data => {
          const quest = data.quests.find(q => q.id === questId);
          if (quest) {
            renderQuestLog(quest.path);
          } else {
            console.error('Quest not found:', questId);
          }
        })
        .catch(error => console.error('Error fetching quests:', error));
    } else {
      // If no quest ID, render the list of all quests.
      fetch('./data/dp-data.json')
        .then(response => response.json())
        .then(data => renderQuestList(data.quests))
        .catch(error => console.error('Error fetching quests:', error));
    }
  }

  // --- Functions for Dashboard & Data Fetching ---

  // This function fetches data from your JSON file.
  function fetchDataAndRenderDashboard() {
    fetch('./data/dp-data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Find the active quest's path in the new 'quests' array
        const activeQuest = data.quests.find(q => q.status.includes('In Progress'));
        const currentQuestButton = document.getElementById('current-quest-button');
        if (currentQuestButton && activeQuest) {
          // The path is now relative to the HTML file's location
          currentQuestButton.href = `../Main-Quest/${activeQuest.id}/${activeQuest.id.toLowerCase()}.md`;
        }
        renderDashboard(data);
      })
      .catch(error => {
        console.error('Fetch failed:', error);
      });
  }

  // This function takes the JSON data and populates the HTML elements for the dashboard.
  function renderDashboard(data) {
    // Get the level and next-level DP from the calculation function.
    const levelInfo = calculateLevel(data.dp);

    // Update the HTML elements with the new data.
    document.getElementById('name').textContent = data.name;
    document.getElementById('class').textContent = data.class;
    document.getElementById('title').textContent = data.title;
    document.getElementById('dp').textContent = data.dp;

    // Use the values from the calculation.
    document.getElementById('level').textContent = levelInfo.level;
    document.getElementById('nextlevelDP').textContent = levelInfo.nextLevelDP;

    // DP Progress Bar
    const progressFill = document.querySelector('.progress-bar .fill');
    const progressTextContainer = document.getElementById('progress-text');
    if (progressFill && levelInfo.nextLevelDP > 0) {
      const percentage = (data.dp / levelInfo.nextLevelDP) * 100;
      progressFill.style.width = `${percentage}%`;
      if (progressTextContainer) {
        progressTextContainer.textContent = `${data.dp} / ${levelInfo.nextLevelDP} DP`;
      }
    }

    // Skills List
    const skillsList = document.getElementById('skills');
    if (skillsList && Array.isArray(data.skills)) {
      skillsList.innerHTML = '';
      data.skills.forEach(skill => {
        const skillItem = document.createElement('li');
        skillItem.textContent = skill;
        skillsList.appendChild(skillItem);
      });
    }
  }

  // This function calculates the current level and next level's DP threshold.
  // It uses the rules defined in your leveling-system.md file.
  function calculateLevel(currentDP) {
    const levels = [
      { threshold: 200, level: 1 },
      { threshold: 400, level: 2 },
      { threshold: 600, level: 3 },
      { threshold: 800, level: 4 },
      // Add more levels here from your leveling-system.md
    ];

    let currentLevel = 1;
    let nextLevelDP = 200;

    for (let i = 0; i < levels.length; i++) {
      if (currentDP >= levels[i].threshold) {
        currentLevel = levels[i].level;
        if (i + 1 < levels.length) {
          nextLevelDP = levels[i + 1].threshold;
        } else {
          nextLevelDP = 'Scaling...';
        }
      }
    }

    return {
      level: currentLevel,
      nextLevelDP: nextLevelDP
    };
  }

  // --- Functions for Skill Tree & Quest Log ---

  // This function is for your skill-tree.html page to handle the locked/unlocked state.
  function renderSkillTreeHTML(skillData) {
    const treeItems = document.querySelectorAll('.tree li button');
    treeItems.forEach(button => {
      const skillName = button.textContent.trim();
      const skill = skillData[skillName];
      if (skill && !skill.unlocked) {
        button.classList.add('locked');
        button.onclick = null;
      }
    });
  }

  // This function is for your quest log page
  function fetchDataAndRenderQuestLog() {
    fetch('./data/dp-data.json')
      .then(response => response.json())
      .then(data => renderQuestList(data.quests))
      .catch(error => console.error('Error fetching quests:', error));
  }

  // This function dynamically renders a list of quests from the JSON data.
  function renderQuestList(quests) {
    const questListContainer = document.getElementById('quest-list');
    if (!questListContainer) return;

    // Clear any existing content
    questListContainer.innerHTML = '';

    // Loop through each quest in the array
    quests.forEach(quest => {
      // Create a new div for each quest
      const questItem = document.createElement('div');
      questItem.classList.add('quest-item'); // Add a class for styling

      // Check if the quest is "In Progress" and add the 'active' class
      if (quest.status.includes('In Progress')) {
        questItem.classList.add('active-quest');
      }

      // Use a template literal to create the HTML for each quest
      // The path is now relative to the HTML file's location
      questItem.innerHTML = `
          <h3>${quest.title}</h3>
          <p><strong>Status:</strong> ${quest.status}</p>
          <p><strong>DP Earned:</strong> +${quest.dpEarned} DP</p>
<a href="./quest-log.html?id=${quest.id}">View Details</a>      `;

      // Add the new quest item to the list
      questListContainer.appendChild(questItem);
    });
  }

  // This function fetches and renders the Markdown quest log.
  // It takes the path as an argument, making it reusable.
  async function renderQuestLog(mdFilePath) {
    try {
      const response = await fetch(mdFilePath);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const markdownContent = await response.text();
      
      const checklistRegex = /^\s*-\s*\[([x\s])\]\s(.+)/gm;
      let match;
      let checklistHtml = '<ul>';
      
      const markdownWithoutChecklist = markdownContent.replace(checklistRegex, (match, checkbox, text) => {
        const isChecked = checkbox === 'x';
        checklistHtml += `
          <li>
            <input type="checkbox" ${isChecked ? 'checked' : ''} disabled>
            <label>${text}</label>
          </li>
        `;
        return '';
      });

      checklistHtml += '</ul>';

      const htmlContent = marked.parse(markdownWithoutChecklist);
      
      const questContainer = document.getElementById('quest-content');
      if (questContainer) {
        questContainer.innerHTML = htmlContent + checklistHtml;
      }

    } catch (error) {
      console.error('Failed to load quest log:', error);
    }
  }

  // This function is for showing the skill information when a button is clicked.
  window.showSkill = (skillName) => {
    const infoSection = document.getElementById('skill-description');
    const skill = skillData[skillName];
    if (skill) {
      if (skill.unlocked) {
        infoSection.textContent = skill.description;
      } else {
        infoSection.textContent = `This skill is currently locked. You must first unlock "${skill.prerequisite}".`;
      }
    }
  };
});