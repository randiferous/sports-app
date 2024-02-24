import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [teamData, setTeamData] = useState({ forwards: [], defensemen: [], goalies: [] });
  const [funFacts, setFunFacts] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_BACKEND_URL' with the actual backend URL
    const fetchTeamData = async () => {
      try {
        const response = await fetch('https://e3oq1j7ufg.execute-api.us-east-2.amazonaws.com/dev/stats');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeamData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchFunFacts = async () => {
      try {
        const response = await fetch(' https://6r7hy9ope9.execute-api.us-east-2.amazonaws.com/dev/funfacts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFunFacts(data);
      } catch (error) {
        console.error('Error fetching fun facts:', error);
      }
    };

    fetchTeamData();
    fetchFunFacts();
  }, []);

  const renderPlayer = (player) => (
    <li key={player.id}>
      {player.firstName.default} {player.lastName.default} - #{player.sweaterNumber} - {player.positionCode}
    </li>
  );

  const renderFact = (fact) => (
    <li key={fact.id}>{fact.fact}</li>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h2>New York Islanders (my favorite sports team, to my chagrin at times)</h2>
        <h3>Forwards</h3>
        <ul>
          {teamData.forwards.map(renderPlayer)}
        </ul>
        <h3>Defensemen</h3>
        <ul>
          {teamData.defensemen.map(renderPlayer)}
        </ul>
        <h3>Goalies</h3>
        <ul>
          {teamData.goalies.map(renderPlayer)}
        </ul>
        <h2>Fun Facts</h2>
        <ul>
          {funFacts.map(renderFact)}
        </ul>
      </header>
    </div>
  );
}

export default App;
