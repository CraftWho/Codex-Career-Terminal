import ProfileCard from './ProfileCard'; // <--- Importing your new creation

function App() {
  return (
    <div style={{ padding: "40px", backgroundColor: "#000", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#FFD700", textAlign: "center" }}>⚛️ MQ3: React Lab</h1>
      
      {/* Card 1: Leo Antoine */}
      <ProfileCard
      name="Leo Antoine"
      characterClass="Web Developer"
      title="⚔️ DOM Strategist"
      level={5}
      dp={950}  
      />

      {/* Card 2: Test User */}
      <ProfileCard
      name="test User 01"
      characterClass="NPC"
      title="🌱 Newborn Coder"
      level={1}
      dp={0}
      />

      </div>
  );
}

export default App;
