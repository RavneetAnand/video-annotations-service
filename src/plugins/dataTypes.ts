export type Team = {
  id: number;
  name: string;
  teamSpread: string;
  pointsScoredPerGame: number;
  netPassingYardsPerGame: number;
  rushingYardsPerGame: number;
};

export type Player = {
  id: number;
  firstName: string;
  lastName: string;
  team: number;
  passingLine?: string;
  rushingLine?: string;
  receivingLine?: string;
  passingYardsPerGame?: number;
  touchdownsPerGame?: number;
  rushingYardsPerGam?: number;
  rushingAttemptsPerGame?: number;
  receivingYardsPerGame?: number;
  receptionsPerGame?: number;
  odds?: number;
  rushingTouchdowns?: number;
  receivingTouchdowns?: number;
};

export type PlayerStats = {
  id: number;
  player: number;
  game: number;
  passingYards?: number;
  touchDowns?: number;
  rushingYards?: number;
  attempts?: number;
  receivingYards?: number;
  receptions?: number;
};
