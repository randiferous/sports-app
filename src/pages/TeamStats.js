import { React, useState, useEffect } from 'react';

const TeamStats = () => {
  const [teamStats, setTeamStats] = useState({ skaters: [], goalies: [] });
  useEffect(() => {
    const fetchTeamStats = async () => {
      try {
        const response = await fetch('https://e3oq1j7ufg.execute-api.us-east-2.amazonaws.com/dev/stats/team');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeamStats(data.data);
        console.log('Team Stats:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchTeamStats();
  }, []);

  const renderSkaterRow = (skater) => (
    <tr key={skater.playerId}>
      <td>{skater.firstName.default} {skater.lastName.default}</td>
      <td>{skater.positionCode}</td>
      <td>{skater.gamesPlayed}</td>
      <td>{skater.goals}</td>
      <td>{skater.assists}</td>
      <td>{skater.points}</td>
      <td>{skater.plusMinus}</td>
    </tr>
  );

  const renderGoalieRow = (goalie) => (
    <tr key={goalie.playerId}>
      <td>{goalie.firstName.default} {goalie.lastName.default}</td>
      <td>{goalie.gamesPlayed}</td>
      <td>{goalie.wins}</td>
      <td>{goalie.losses}</td>
      <td>{goalie.goalsAgainstAverage.toFixed(2)}</td>
      <td>{goalie.savePercentage.toFixed(3)}</td>
      <td>{goalie.shutouts}</td>
    </tr>
  );

  return (
    <div className="App-header">
      <h1>Team Stats</h1>
      <h2>Skaters</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>GP</th>
            <th>G</th>
            <th>A</th>
            <th>Pts</th>
            <th>+/-</th>
          </tr>
        </thead>
        <tbody>
          {teamStats.skaters.map(renderSkaterRow)}
        </tbody>
      </table>
      <h2>Goalies</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>GP</th>
            <th>W</th>
            <th>L</th>
            <th>GAA</th>
            <th>SV%</th>
            <th>SO</th>
          </tr>
        </thead>
        <tbody>
          {teamStats.goalies.map(renderGoalieRow)}
        </tbody>
      </table>
    </div>
  );
};

export default TeamStats;