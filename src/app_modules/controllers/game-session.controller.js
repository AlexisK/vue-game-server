const PLAYERSTAGES = {
    selectTeam: {},
    selectCharacter: {},
    spectate: {},
    play: {},
    dead: {}
};

const SESSIONSTAGES = {
    lobby: {},
    sessionRunning: {},
    score: {}
};

export class GameSessionController {
    sessionStages = SESSIONSTAGES;
    teams = {};
    players = {};

    sessionStage = SESSIONSTAGES.lobby;
}
