import React from 'react';

function ProfileCard({ name, characterClass, title, level, dp }) {
  return (
    <section style={{ border: "1px solid #FFD700", padding: "20px", marginBottom: "20px", borderRadius: "8px", backgroundColor: "#111", color: "#e0e0e0" }}>
      <h2 style={{ color: "#FFD700", borderBottom: "1px solid #8b0000" }}>🧑🏾‍💼 Status Card</h2>
      <ul>
        <li><strong>📛 Name:</strong> {name}</li>
        <li><strong>🗃️ Class:</strong> {characterClass}</li>
        <li><strong>🛂 Title:</strong> {title}</li>
        <li><strong>🎚️ Level:</strong> {level}</li>
        <li><strong>🥼 DP:</strong> {dp}</li>
      </ul>
    </section>
  );
}

export default ProfileCard;