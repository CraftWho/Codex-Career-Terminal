# 🎮 Leveling System v3.1 – Career Tracker Codex

This file defines the modular progression system used across the Codex Career Terminal. It governs how Developer Points (DP) translate into level-ups, unlocks, and mastery tiers.

---

## 🧠 Chapter DP Rules

| Source Type           | DP Earned        | Notes |
|------------------------|------------------|-------|
| 📺 Scrimba Lesson      | +25–50 DP         | Scaled by job relevance |
| 🧱 Max DP per Chapter  | 200 DP            | **Video lessons only** |
| 🧩 Chapter Folder      | `/chapter-name/`  | Contains all sub-quests and artifacts |

🧠 **Only video lessons contribute to the 200 DP chapter cap**  
🎯 **Side quests, quizzes, and codex entries earn extra DP**, tracked separately

---

## 🎯 Supplemental DP (Outside Chapter Cap)

| Source Type           | DP Earned        | Notes |
|------------------------|------------------|-------|
| 🛠️ Repo Update         | +50 DP            | Must include traceable code |
| ❓ Quiz Question        | +10 DP per correct| Logged per assessment |
| 🎯 Side Quest          | +50 DP (max 3)    | Must be job-aligned |
| 🧾 Codex Contribution   | +25 DP            | Patch notes, titles, abilities |
| 📸 Screenshot Artifact  | +25 DP            | Added to codex or README |

📦 **Supplemental DP is uncapped** and contributes to overall level progression

---

## 🧱 Level Thresholds

| Level Range     | DP to Level Up | Cumulative DP Span | Tier         |
|------------------|----------------|---------------------|--------------|
| Levels 1–4       | 200 DP         | 0–800               | Starter Tier |
| Levels 5–9       | 300 DP         | 801–2300            | Mid Tier     |
| Levels 10–14     | 400 DP         | 2301–4300           | Advanced Tier|
| Levels 15–19     | 500 DP         | 4301–6800           | Master Tier  |
| Level 20+        | Custom Scaling | 6801+               | Prestige Tier|

🔁 Every 5 levels, DP required increases by +100  
📈 Encourages deeper mastery and modular questing

---

## 🧙‍♂️ Title Progression

| Level | DP Range     | Title Example               |
|-------|--------------|-----------------------------|
| 1     | 0–200        | 🌱 Newborn Coder            |
| 2     | 201–400      | 🧙 Apprentice of HTML        |
| 3     | 401–600      | 🛡️ Adept of the DOM          |
| 4     | 601–800      | 🎨 CSS Initiate              |
| 5     | 801–1100     | ⚔️ DOM Strategist            |
| 6     | 1101–1400    | 🧠 Event Architect           |
| 7     | 1401–1700    | 📱 Responsive Engineer       |
| 8     | 1701–2000    | 🧪 UX Alchemist              |
| 9     | 2001–2300    | 🧾 Codex Refactorer          |
| 10    | 2301–2700    | 🏗️ Full Stack Initiate       |

---

## 🔄 Integration Protocol

Update the following files when a level-up or DP milestone occurs:

| File Name         | Update Required                          |
|-------------------|-------------------------------------------|
| `README.md`       | Current level, DP, and unlocked skills    |
| `DP-Log.md`       | DP earned, source, and cumulative total   |
| `codex.md`        | Title unlocked, abilities gained          |
| `Skill-Tree.md`   | New nodes unlocked                        |
| `Patch-Notes.md`  | Versioned log of changes                  |
| `Quiz-Log.md`     | Assessment results and DP earned          |
| `webpage-start.md`| Visual updates if applicable              |

---

## 🧾 Notes

- Use **MM-DD-YYYY** format for all timestamps  
- Patch version must increment (e.g. v1.4.5 → v1.5)  
- Emoji polish required for codex consistency  
- Side quests and codex refactors are encouraged to reach higher tiers.
