import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [teamData, setTeamData] = useState({ forwards: [], defensemen: [], goalies: [] });
  const [funFacts, setFunFacts] = useState([]);

  useEffect(() => {
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

    const fetchTeamStats = async () => {
      try {
        const response = await fetch('https://e3oq1j7ufg.execute-api.us-east-2.amazonaws.com/dev/stats/team');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Team Stats:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchTeamData();
    fetchFunFacts();
    fetchTeamStats();
  }, []);

  const formatHeight = (heightInInches) => {
    const feet = Math.floor(heightInInches / 12);
    const inches = heightInInches % 12;
    return `${feet}' ${inches}"`;
  };

  const calculateAge = (birthDate) => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  const renderPlayer = (player) => (
    <tr key={player.id}>
      <td>
        <img src={player.headshot} alt={`${player.firstName.default} ${player.lastName.default} Headshot`} style={{ width: '50px', height: 'auto' }} />
      </td>
      <td>{player.firstName.default} {player.lastName.default}</td>
      <td>#{player.sweaterNumber}</td>
      <td>{player.positionCode}</td>
      <td>{calculateAge(player.birthDate)}</td>
      <td>{player.birthCity.default}, {player.birthCountry}</td>
      <td>{formatHeight(player.heightInInches)}</td>
      <td>{player.weightInPounds}</td>
    </tr>
  );

  const renderFact = (fact) => (
    <li key={fact.id}>{fact.fact}</li>
  );
  return (
    <div className="App">
      <header className="App-header">
        <h2>New York Islanders (my favorite sports team)</h2>
        {['Forwards', 'Defensemen', 'Goalies'].map((position) => (
          <section key={position}>
            <h3>{position}</h3>
            <table>
              <thead>
                <tr>
                <th></th> 
                  <th>Name</th>
                  <th>Number</th>
                  <th>Position</th>
                  <th>Age</th>
                  <th>Birthplace</th>
                  <th>Height</th>
                  <th>Weight (lbs)</th>
                </tr>
              </thead>
              <tbody>
                {teamData[position.toLowerCase()].map(renderPlayer)}
              </tbody>
            </table>
          </section>
        ))}
        <h2>Fun Facts</h2>
        <ul>
          {funFacts.map(renderFact)}
        </ul>
      </header>
    </div>
  );
};

export default HomePage;