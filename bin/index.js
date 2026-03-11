#!/usr/bin/env node

import { program } from "commander"; 
import gameState from "../src/lib/state.js";
import { showMainMenu } from "../src/lib/gameLogic.js"

// displays main menu & handles user input
showMainMenu(gameState); 
program.parse(process.argv); 