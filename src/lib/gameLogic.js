import chalk from "chalk"; 
import { select } from "@inquirer/prompts"; 

// show menu options 
export async function showMainMenu(gameState) {
    const action = await select ({
        message: "Main Menu", 
        choices: [
            { name: "Start Game", value: "start" }, 
            { name: "See Stats", value: "stats" }, 
            { name: "Reset Stats", value: "reset" }, 
            { name: "Quit", value:"quit"}, 
        ], 
    }); 

    // allows selection of menu options 
    switch(action) {
        // start game 
        case "start" :
            await startGame(gameState); 
            break; 
        // show stats
        case "stats" : 
            showStats(gameState); 
            await select ({ message: "Press Enter to go back", choices: [{ name: "Back", value: "back"}] }); 
            showMainMenu(gameState); 
            break; 
        // reset stats
        case "reset": 
            resetGame(gameState); 
            console.log(chalk.blue("Stats have been reset."));
            break; 
        // quit game
        case "quit" : 
            console.log("Goodbye!"); 
            process.exit(0); 
    }
}

// start game 
export async function startGame(gameState) {
    // choices of rock, papper, or scissors 
    const choices = ["rock", "paper", "scissors"];
    // random choice of rock, papaer, scissors for computer 
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    // user chooses rock, papper, scissors 
    const userChoice = await select({
        message: "Chhoose your weapon", 
        choices: choices.map((choices) => ({ name: choices, value: choices})), 
    }); 
    
    // takes user & computer choices to determine winner while updating stats 
    const result = determineWinner(userChoice, computerChoice); 
    updateStats(result, gameState); 

    console.log(chalk.blue('Computer chose: ${computerChoice}')); 
    showMainMenu(gameState); 
}

export function determineWinner(userChoice, computerChoice) {
    // determins win situations 
    const winMap = { rock: "scissors", paper: "rock", scissors: "paper"}; 
    // user choices same choice as computer = tie 
    if (userChoice === computerChoice) return "tie"; 
    return winMap[userChoice] === computerChoice ? "win" : "lose"; 
}

export function updateStats(result, gameState) {
    // update stats for win 
    if (result === "win") gameState.stats.wins += 1; 
    // update stats for lose 
    else if (result == "lose") gameState.stats.lose += 1; 
    // update stat for ties
    else gameState.stats.ties += 1; 
}

// shows stats for wins, losses & ties
export function showStats(gameState) {
    console.log(chalk.blue("Game Statistics:")); 
    console.log(chalk.green(`Wins: ${gameState.stats.wins}`)); 
    console.log(chalk.red(`Losses: ${gameState.stats.losses}`));
    console.log(chalk.yellow(`Ties: ${gameState.stats.ties}`));
}

// reset game stats 
export function resetGame(gameState) {
    gameState.stats = { wins: 0, losses: 0, ties: 0};  
}