import { Pick } from "@domain/entities/player/types";
import { Player } from "@domain/entities/player/types";

const weapons = {
    rock: { weakTo: "paper", strongTo: "scissors" },
    paper: { weakTo: "scissors", strongTo: "rock" },
    scissors: { weakTo: "rock", strongTo: "paper" },
};


export const getLoosers = (players: Player[]) => {
    //check for tie - there are all options in round

    const paperPicks = players.filter(({ option }) => option && option === Pick.PAPER);
    const rockPicks = players.filter(({ option }) => option && option === Pick.ROCK);
    const scissorsPicks = players.filter(({ option }) => option && option === Pick.SCISSORS);

    //check for empty picks
    const isPaperEmpty = paperPicks.length === 0;
    const isRockEmpty = rockPicks.length === 0;
    const isScissorsEmpty = scissorsPicks.length === 0;

    if (isPaperEmpty) {
        // rock vs scissors -> scissors
        return scissorsPicks
    }

    if (isRockEmpty) {
        // paper vs scissors -> paper
        return paperPicks
    }

    if (isScissorsEmpty) {
        // rock vs paper -> rock
        return rockPicks
    }

    throw Error('getLoosers error');
};

export const getWinners = (players: Player[]) => {
    //check for tie - there are all options in round

    const paperPicks = players.filter(({ option }) => option && option === Pick.PAPER);
    const rockPicks = players.filter(({ option }) => option && option === Pick.ROCK);
    const scissorsPicks = players.filter(({ option }) => option && option === Pick.SCISSORS);

    //check for empty picks
    const isPaperEmpty = paperPicks.length === 0;
    const isRockEmpty = rockPicks.length === 0;
    const isScissorsEmpty = scissorsPicks.length === 0;



    if (isPaperEmpty) {
        // rock vs scissors -> rock
        return rockPicks
    }

    if (isRockEmpty) {
        // paper vs scissors -> scissors
        return scissorsPicks
    }

    if (isScissorsEmpty) {
        // rock vs paper -> paper
        return paperPicks
    }

    throw Error('getWinners error');
}

export const isTie = (players: Player[]) => {
    const isPaper = players.some(({ option }) => option && option === Pick.PAPER);
    const isRock = players.some(({ option }) => option && option === Pick.ROCK);
    const isScissors = players.some(({ option }) => option && option === Pick.SCISSORS);

    //check for all picks
    if (isPaper && isRock && isScissors) return true;


    //check for same picks
    return isSamePicks(players);
}

export const isSamePicks = (players: Player[]) => {
    const paperPicks = players.filter(({ option }) => option && option === Pick.PAPER);
    const rockPicks = players.filter(({ option }) => option && option === Pick.ROCK);
    const scissorsPicks = players.filter(({ option }) => option && option === Pick.SCISSORS);


    if (paperPicks.length === players.length) return true

    if (rockPicks.length === players.length) return true

    if (scissorsPicks.length === players.length) return true

    return false
};

