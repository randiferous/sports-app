import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [teamData, setTeamData] = useState({ forwards: [], defensemen: [], goalies: [] });
  const [funFacts, setFunFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Combine both fetch operations into a single async function to manage loading state more effectively
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const teamResponse = await fetch('https://e3oq1j7ufg.execute-api.us-east-2.amazonaws.com/dev/stats');
        const teamData = await teamResponse.json();
        setTeamData(teamData.data);

        const factsResponse = await fetch('https://6r7hy9ope9.execute-api.us-east-2.amazonaws.com/dev/funfacts');
        const funFactsData = await factsResponse.json();
        setFunFacts(funFactsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchData();
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
        <h2>New York Islanders</h2>
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="content-container">
            <div className="roster-info">
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
            </div>
            <div className="fun-facts">
              <h2>Fun Facts About my Isles Fandom</h2>
              <ul>
                {funFacts.map(renderFact)}
              </ul>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default HomePage;