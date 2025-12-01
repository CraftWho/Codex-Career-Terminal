# 🎮 Leveling System v4.1 – Builder's Economy

This file defines the modular progression system used across the Codex Career Terminal. It governs how Developer Points (DP) translate into level-ups, unlocks, and mastery tiers.

---

## 🧠 XP Source Matrix (The Builder's Economy)

We prioritize **shipping code** over consuming content.

| Source Type           | Reward Value     | Logic |
|-----------------------|------------------|-------|
| 📺 **Video Lesson** | **+25 DP** | Flat rate. **No Chapter Cap.** Knowledge is infinite. |
| 🛠️ **Repo Commit** | **+50 DP** | For tangible code pushes, bug fixes, or refactors. |
| ❓ **Quiz / Review** | **+10 DP** | Per correct answer. Reinforces theory. |
| ⚔️ **Side Quest** | **+150 DP** | **High Value.** Targeted practice (e.g., CSS Battle, Algorithm). |
| 🛡️ **Main Quest** | **+400–600 DP** | **Massive Value.** Completion of a major "Chapter Project." |
| 🧾 **Codex Entry** | **+25 DP** | Documenting a new skill, title, or ability. |
| 📸 **Screenshot** | **+25 DP** | Adding a visual artifact to the log. |

---

## 🧱 Level Thresholds (Step-Ladder Scaling)

Difficulty increases by **+100 DP** every **2 levels**.

| Level Range | Gap Size | Cumulative DP Span | Tier Strategy |
|:---:|:---:|:---:|:---|
| **1–4** | 200 DP | 0 – 800 DP | **Foundation Phase** (Standard speed) |
| **5–6** | 300 DP | 801 – 1,400 DP | **Ramp Up** (+100 difficulty) |
| **7–8** | 400 DP | 1,401 – 2,200 DP | **Mid-Career** (+200 difficulty) |
| **9–10** | 500 DP | 2,201 – 3,200 DP | **Senior Push** (+300 difficulty) |
| **11–12** | 600 DP | 3,201 – 4,400 DP | **Lead Dev** (+400 difficulty) |
| **13–14** | 700 DP | 4,401 – 5,800 DP | **Architect** (+500 difficulty) |

---

## 🧙‍♂️ Title Progression

As you ascend the ladder, your Class Title evolves to reflect your deepening mastery.

| Level | DP Range      | Title Example               | Unlocks |
|:---:|---------------|-----------------------------|---------|
| **1** | 0–200         | 🌱 **Newborn Coder** | Repo Scaffolding |
| **2** | 201–400       | 🧙 **Apprentice of HTML** | Semantic Tags |
| **3** | 401–600       | 🛡️ **Adept of the DOM** | Flexbox/Grid |
| **4** | 601–800       | 🎨 **CSS Initiate** | Media Queries |
| **5** | 801–1,100     | ⚔️ **DOM Strategist** | Fetch API |
| **6** | 1,101–1,400   | 🧠 **Event Architect** | Async/Await |
| **7** | 1,401–1,800   | 📱 **Responsive Engineer** | React Components |
| **8** | 1,801–2,200   | 🧪 **UX Alchemist** | State Management |
| **9** | 2,201–2,700   | 🧾 **Codex Refactorer** | Custom Hooks |
| **10**| 2,701–3,200   | 🏗️ **Full Stack Initiate** | API Integration |

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

- Use **MM-DD-YYYY** format for all timestamps.
- Patch version must increment (e.g. v4.1 → v4.2).
- Emoji polish is required for all Codex entries to maintain the aesthetic.
- **Side Quests** are highly recommended to bridge the larger DP gaps at Level 5+.