import { React, useState, useEffect } from 'react';

const ResultsPage = () => {
    const [teamResults, setTeamResults] = useState({ games: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTeamResults = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://e3oq1j7ufg.execute-api.us-east-2.amazonaws.com/dev/stats/schedule');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Team Schedule:', data.data.games);
                let gamesArray = [];
                for (let i = 0; i < data.data.games.length; i++) {
                    if (data.data.games[i].gameState === 'OFF') {
                        gamesArray.push(data.data.games[i]);
                    }
                }

                setTeamResults({ games: gamesArray });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTeamResults();
    }, []);

    const formatScore = (game) => {
        const scoreText = `${game.awayTeam.score} - ${game.homeTeam.score}`;
        return game.gameOutcome.lastPeriodType === 'OT' ? `${scoreText} (OT)` : scoreText;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; // getMonth() returns months from 0-11
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    return (
        <div className="App-header">
            <h1>Results</h1>
            {isLoading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Venue</th>
                            <th>Teams</th>
                            <th>Score</th>
                            <th>Winning Goalie</th>
                            <th>Winning Goal Scorer</th>
                            <th>Recap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamResults.games.map((game, index) => (
                            <tr key={index}>
                                <td>{formatDate(game.gameDate)}</td>
                                <td>{game.venue.default}</td>
                                <td>
                                    <img src={game.awayTeam.logo} alt={`${game.awayTeam.placeName.default} Logo`} style={{ width: '45px', height: '45px', verticalAlign: 'middle' }} />
                                    {game.awayTeam.placeName.default} vs.
                                    <img src={game.homeTeam.logo} alt={`${game.homeTeam.placeName.default} Logo`} style={{ width: '45px', height: '45px', verticalAlign: 'middle' }} />
                                    {game.homeTeam.placeName.default}
                                </td>
                                <td>{formatScore(game)}</td>
                                <td>{game.winningGoalie ? `${game.winningGoalie.firstInitial.default} ${game.winningGoalie.lastName.default}` : 'N/A'}</td>
                                <td>{game.winningGoalScorer ? `${game.winningGoalScorer.firstInitial.default} ${game.winningGoalScorer.lastName.default}` : 'N/A'}</td>
                                <td><a href={`https://www.nhl.com${game.gameCenterLink}`} target="_blank" rel="noopener noreferrer">Recap</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ResultsPage;