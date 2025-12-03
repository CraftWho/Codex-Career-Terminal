# 🛠️ System Roadmap: v2.0 Mechanics

**Status:** 🧊 Backlog (Post-MQ1)
**Objective:** Transition from a simple tracker to a complex RPG engine.

---

## 🚀 1. The Prestige System (Tiers)

**Trigger:** Reaching Level 20.
**Mechanic:**

* Upon hitting Level 20 cap, the user "Ascends."
* **Level** resets to 1.
* **Tier** increases to Tier 1.
* **Visuals:** Nameplate gains a new border/color (e.g., Bronze -> Silver).

## 🛑 2. Promotion Trials (The Bottleneck)

**Trigger:** DP Progress Bar hits 100%.
**Mechanic:**

* Level does **NOT** increase automatically.
* Status changes to **"Promotion Eligible"**.
* A specific **"Trial Quest"** (Boss Project) must be marked `Complete` to break the seal and advance to the next level.

## 🧠 3. Skill Proficiency Tracks

**Current State:** Skills are Boolean (`true` = Unlocked, `false` = Locked).
**Future State:** Skills are Objects with XP.
 **Structure:** `{ name: "React", xp: 450, max: 1000, level: 2 }`

* **Mechanic:** Tagging a specific skill in a Quest Log (e.g., `Tags: ["React", "CSS"]`) applies earned DP directly to those skill bars.

---
