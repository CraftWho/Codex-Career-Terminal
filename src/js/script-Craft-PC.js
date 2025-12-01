// This event listener waits for the HTML document to be fully loaded
// before executing the code.
document.addEventListener('DOMContentLoaded', () => {

  // This is a single data source for both the dashboard and skill tree.
  // It will eventually be loaded from your JSON file.
  const skillData = {
    // --- TIER 1: THE ARCHITECT (ROOT) ---
    'Codex Architect': {
      description: 'The Core System. Current Status: Level 5 Web Developer. Ready for React integration.',
      unlocked: true,
      prerequisite: null
    },

    // --- BRANCH 1: HTML ARCHITECTURE ---
    'Semantic HTML Fluency': {
      description: 'Mastery of meaningful HTML tags (header, nav, main) for better accessibility and SEO.',
      unlocked: true,
      prerequisite: 'Codex Architect'
    },
    'Modular Repo Scaffolding': {
      description: 'Ability to set up clean, scalable project structures with organized folder hierarchies.',
      unlocked: true,
      prerequisite: 'Semantic HTML Fluency'
    },
    'GitHub Pages Deployment': {
      description: 'Pipeline established for publishing live projects directly to the web for recruiter access.',
      unlocked: true,
      prerequisite: 'Modular Repo Scaffolding'
    },

    // --- BRANCH 2: CSS ENGINE ---
    'CSS Fundamentals': {
      description: 'The visual styling engine. Control over colors, typography, and the box model.',
      unlocked: true,
      prerequisite: 'Codex Architect'
    },
    'Responsive Design': {
      description: 'Ensuring layouts adapt fluidly to mobile, tablet, and desktop screens.',
      unlocked: true, // Unlocked via your CSS Battle side quest
      prerequisite: 'CSS Fundamentals'
    },
    'Flexbox/Grid': {
      description: 'Advanced layout modules for controlling complex positioning and alignment.',
      unlocked: true, // Unlocked via your CSS Battle side quest
      prerequisite: 'CSS Fundamentals'
    },

    // --- BRANCH 3: JAVASCRIPT CORE ---
    'JavaScript Essentials': {
      description: 'The logic layer. Variables, functions, loops, and data types.',
      unlocked: true, // Unlocked via MQ2 Completion
      prerequisite: 'Codex Architect'
    },
    'DOM Manipulation': {
      description: 'Ability to use JS to target HTML elements and change them dynamically.',
      unlocked: true, // Unlocked via MQ2 Completion
      prerequisite: 'JavaScript Essentials'
    },
    'React Fundamentals': {
      description: 'Component-based UI architecture. The ability to build reusable, state-driven interfaces.',
      unlocked: true, // JUST UNLOCKED! (Level 5 Reward)
      prerequisite: 'JavaScript Essentials'
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
      // HIDE the list view
      const dashboard = document.getElementById('quest-dashboard');
      if (dashboard) dashboard.style.display = 'none';

      // FETCH the specific quest
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
      // If no ID, render the lists normally
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
          // FIX: Don't link to the raw MD file. Link to the Quest Log Viewer with the ID.
          // This allows the quest-log page to fetch and render the Markdown nicely.
          currentQuestButton.href = `./quest-log.html?id=${activeQuest.id}`;
          currentQuestButton.textContent = `Continue: ${activeQuest.title}`; // Optional: Update text to show quest name
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

      // Get only the last 5 skills from the array
      const latestskills = data.skills.slice(-5);

      // Now, Loop over just those 5 skills
      latestskills.forEach(skill => { // <--- THIS LINE WAS CORRECTED
        const skillItem = document.createElement('li');
        skillItem.textContent = skill;
        skillsList.appendChild(skillItem);
      });
    }
  }

  // This function calculates the current level and next level's DP threshold.
  // It uses the rules defined in your leveling-system.md file.
  function calculateLevel(currentDP) {
    // The "Step-Ladder" Array
    const levels = [
      // Foundation Phase (Gap: 200)
      { level: 1, threshold: 0 },    // Start at Lvl 1
      { level: 2, threshold: 200 },
      { level: 3, threshold: 400 },
      { level: 4, threshold: 600 },
      
      // Ramp Up Phase (Gap: 300)
      { level: 5, threshold: 800 },  // You are here (950 DP)
      { level: 6, threshold: 1100 }, // Target for Lvl 6
      
      // Mid-Career Phase (Gap: 400)
      { level: 7, threshold: 1400 },
      { level: 8, threshold: 1800 },
      
      // Senior Push Phase (Gap: 500)
      { level: 9, threshold: 2200 },
      { level: 10, threshold: 2700 },
      
      // Lead Dev Phase (Gap: 600)
      { level: 11, threshold: 3200 },
      { level: 12, threshold: 3800 },
      
      // Architect Phase (Gap: 700)
      { level: 13, threshold: 4400 },
      { level: 14, threshold: 5100 },
      
      // Prestige Tier (Gap: 800+)
      { level: 15, threshold: 5800 },
      { level: 16, threshold: 6600 },
      { level: 17, threshold: 7400 },
      { level: 18, threshold: 8200 },
      { level: 19, threshold: 9000 },
      { level: 20, threshold: 10000 }
    ];

    let currentLevel = 1;
    let nextLevelDP = 200;

    // Loop through to find your rank
    for (let i = 0; i < levels.length; i++) {
      if (currentDP >= levels[i].threshold) {
        currentLevel = levels[i].level;
        // Check if there is a next level defined
        if (i + 1 < levels.length) {
          nextLevelDP = levels[i + 1].threshold;
        } else {
          nextLevelDP = "Max Level";
        }
      } else {
        // We found the ceiling, break the loop
        break; 
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

  // This function dynamically renders a list of quests, separated by type.
  function renderQuestList(quests) {
    // Select both containers
    const mainListContainer = document.getElementById('main-quest-list');
    const sideListContainer = document.getElementById('side-quest-list');
    const dashboardContainer = document.getElementById('quest-dashboard');
    const detailContainer = document.getElementById('quest-content');

    // Safety check: Make sure containers exist
    if (!mainListContainer || !sideListContainer) return;

    // Ensure Dashboard is visible and Details are hidden (for List View)
    if (dashboardContainer) dashboardContainer.style.display = 'block';
    if (detailContainer) detailContainer.innerHTML = ''; // Clear detail view

    // Clear existing content
    mainListContainer.innerHTML = '';
    sideListContainer.innerHTML = '';

    // Loop through each quest
    quests.forEach(quest => {
      // Create a new div for the quest card
      const questItem = document.createElement('div');
      questItem.classList.add('quest-item');

      // Highlight active quests
      if (quest.status.includes('In Progress')) {
        questItem.classList.add('active-quest');
      }

      // Build the HTML for the card
      questItem.innerHTML = `
          <h3>${quest.title}</h3>
          <p><strong>ID:</strong> ${quest.id}</p>
          <p><strong>Status:</strong> ${quest.status}</p>
          <p><strong>Reward:</strong> +${quest.dpEarned} DP</p>
          <a href="./quest-log.html?id=${quest.id}">View Intel</a>
      `;

      // SORTING LOGIC:
      // If ID starts with 'MQ', it goes to Main Campaign.
      // Otherwise (SQ, HQ, etc.), it goes to Side Operations.
      if (quest.id.startsWith('MQ')) {
        mainListContainer.appendChild(questItem);
      } else {
        sideListContainer.appendChild(questItem);
      }
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