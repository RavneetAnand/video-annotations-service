import { Options } from '../server';

import { mySqlRequest } from './../utils/mySqlRequest';
import { Player, PlayerStats, Team } from './dataTypes';

import { fetchJson } from '../utils/fetchJson';

let mySqlQuery;

/**
 * Provide token after the user validation.
 * @param {*} message It contains the parameters sent to the method.
 * @returns Token authentication.
 */
const authenticateUser = (message: { username: string; password: string }) => {
  let token = '';
  if (message?.username === 'test' && message?.password === 'test') {
    token = 'user-validated';
  }
  return { accessToken: token };
};

const getTeams = async () => {
  let data: any[] = [];
  try {
    data = await fetchJson('Teams.json');
  } catch (err: any) {
    console.error('Could not fetch the teams list' + err.message);
  }
  return data;
};

/**
 * Get the players list from database.
 * @returns Data object list of the players.
 */
const getPlayersListByTeams = async (teamsList: number[]) => {
  let data: any[] = [];
  try {
    const teamsResponse: Team[] = await fetchJson('Teams.json');
    // Filter the teams list
    const teams = teamsResponse.filter((team: { id: number }) =>
      teamsList.includes(team.id),
    );

    // Get the players list from the json file
    const playersResponse: Player[] = await fetchJson('Players.json');
    const players = playersResponse.filter((player: { team: number }) =>
      teamsList.includes(player.team),
    );

    // Get the players stats from the json file
    const statsResponse: PlayerStats[] = await fetchJson(
      'PlayerStatistics.json',
    );
    const playerIds = players.map(({ id }) => id);
    const stats = statsResponse.filter((stat: { player: number }) =>
      playerIds.includes(stat.player),
    );

    // Filter only last 5 games stats for each player
    const last5GamesStats = stats.reduce(
      (acc: { [key: string]: any }, stat: PlayerStats) => {
        if (!acc[stat.player]) {
          acc[stat.player] = [];
        }
        if (acc[stat.player].length < 5) {
          acc[stat.player].push(stat);
        }
        return acc;
      },
      {},
    );

    // Merge the players and stats data
    const playersDetails = players.map((player: Player) => {
      return {
        ...player,
        stats: last5GamesStats[player.id],
      };
    });

    // Merge players to the teams
    data = teams.map((team: Team) => {
      return {
        ...team,
        players: playersDetails.filter(
          (player: { team: number }) => player.team === team.id,
        ),
      };
    });
  } catch (err: any) {
    console.error('Could not fetch the players list' + err.message);
  }
  return data;
};

export const playersService = (options?: Options) => {
  if (options !== undefined) {
    [({ query: mySqlQuery } = mySqlRequest(options))];
  }

  return {
    getTeams,
    getPlayersListByTeams,
    authenticateUser,
  };
};
