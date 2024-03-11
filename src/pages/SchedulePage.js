import { React, useState, useEffect } from 'react';

const SchedulePage = () => {
    const [teamSchedule, setTeamSchedule] = useState({ games: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTeamSchedule = async () => {
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
                    if (data.data.games[i].gameState === 'FUT') {
                        const easternTime = convertUTCToEasternTime(data.data.games[i].startTimeUTC);
                        data.data.games[i].startTimeET = easternTime;
                        gamesArray.push(data.data.games[i]);
                    }
                }

                setTeamSchedule({ games: gamesArray });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTeamSchedule();
    }, []);

    function convertUTCToEasternTime(utcDateString) {
        // Parse the UTC date string to a Date object
        const utcDate = new Date(utcDateString);

        // Format the date to Eastern Time
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'America/New_York',
            hour12: true // Use 12-hour format
        };

        return utcDate.toLocaleTimeString('en-US', options);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; // getMonth() returns months from 0-11
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    return (
        <div className="App-header">
            <h1>Schedule</h1>
            {isLoading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time (ET)</th>
                            <th>Venue</th>
                            <th>Away Team</th>
                            <th>Home Team</th>
                            <th>TV Broadcasts</th>
                            <th>Tickets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamSchedule.games.map((game, index) => (
                            <tr key={index}>
                                <td>{formatDate(game.gameDate)}</td>
                                <td>{game.startTimeET}</td>
                                <td>{game.venue.default}</td>
                                <td>
                                    <img src={game.awayTeam.logo} alt={`${game.awayTeam.placeName.default} Logo`} style={{ width: '45px', height: '45px', verticalAlign: 'middle' }} />
                                    {game.awayTeam.placeName.default}
                                </td>
                                <td>
                                    <img src={game.homeTeam.logo} alt={`${game.homeTeam.placeName.default} Logo`} style={{ width: '45px', height: '45px', verticalAlign: 'middle' }} />
                                    {game.homeTeam.placeName.default}
                                </td>
                                <td>
                                    {game.tvBroadcasts.map((broadcast, bIndex) => (
                                        <div key={bIndex}>{broadcast.network} ({broadcast.countryCode})</div>
                                    ))}
                                </td>
                                <td>
                                    <a href={game.ticketsLink} target="_blank" rel="noopener noreferrer">Buy Tickets</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default SchedulePage;