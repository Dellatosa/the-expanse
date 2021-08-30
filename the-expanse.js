// import * as Macros from "./modules/macros.js";
import {ageSystem} from "./modules/config.js";
import ageSystemSheetItem from "./modules/sheets/ageSystemSheetItem.js";
import ageSystemSheetCharacter from "./modules/sheets/ageSystemSheetCharacter.js";
import ageSystemSheetCharStatBlock from "./modules/sheets/ageSystemSheetCharStatBlock.js";
import ageSystemSheetVehicle from "./modules/sheets/ageSystemSheetVehicle.js";
import ageSystemSheetSpaceship from "./modules/sheets/ageSystemSheetSpaceship.js";
import ageActiveEffectConfig from "./modules/sheets/ageActiveEffectConfig.js";
import {ageSystemActor} from "./modules/ageSystemActor.js";
import {ageEffect} from "./modules/ageEffect.js";
import {ageToken} from "./modules/ageToken.js";
import {ageSystemItem} from "./modules/ageSystemItem.js";
import { createAgeMacro } from "./modules/macros.js";
import { rollOwnedItem } from "./modules/macros.js";
import { AgeRoller } from "./modules/age-roller.js";
import { AgeTracker } from "./modules/age-tracker.js";

import * as Dice from "./modules/dice.js";
import * as Settings from "./modules/settings.js";
import * as AgeChat from "./modules/age-chat.js";
import * as Setup from "./modules/setup.js";
import * as migrations from "./modules/migration.js";

import {ExpanseNormalDice} from './modules/die.js';
import {ExpanseStuntDice} from './modules/die.js';

async function preloadHandlebarsTemplates() {
    const path = `systems/the-expanse/templates/partials/`;
    const templatePaths = [
        `${path}bonus-desc-sheet.hbs`,
        `${path}dmg-block-sheet.hbs`,
        `${path}bonuses-sheet.hbs`,
        `${path}active-bonuses.hbs`,
        `${path}ability-focus-select.hbs`,
        `${path}cost-resource-block.hbs`,
        `${path}play-aid-bar.hbs`,
        `${path}item-image-sheet-card.hbs`,
        `${path}conditions-block.hbs`,
        `${path}char-sheet-nav-bar.hbs`,
        `${path}char-sheet-tab-main.hbs`,
        `${path}char-sheet-tab-persona.hbs`,
        `${path}char-sheet-tab-effects.hbs`,
        `${path}item-card-buttons.hbs`,
        `${path}char-stat-block-column1.hbs`,
    ];

    return loadTemplates(templatePaths);
};

Hooks.once("init", async function() {
    const ageSystemText = `
     ___   ____________   _____            __               
    /   | / ____/ ____/  / ___/__  _______/ /____  ____ ___ 
   / /| |/ / __/ __/     \\__ \\/ / / / ___/ __/ _ \\/ __ \`__ \\
  / ___ / /_/ / /___    ___/ / /_/ (__  ) /_/  __/ / / / / /
 /_/  |_\\____/_____/   /____/\\__, /____/\\__/\\___/_/ /_/ /_/ 
                            /____/                          `;

    console.log("The Expanse | Entering a new AGE...");
    console.log(ageSystemText);

    // Create a namespace within the game global
    game.ageSystem = {
        applications: {
            ageSystemSheetCharacter,
            ageSystemSheetCharStatBlock,
            ageSystemSheetVehicle,
            ageSystemSheetSpaceship,
            // ageActiveEffectConfig,
            ageSystemSheetItem,
            AgeRoller,
            AgeTracker
        },
        dice: Dice,
        migrations: migrations,
        rollOwnedItem,
        entities: {
            ageSystemActor,
            ageToken,
            ageSystemItem,
            ageEffect
        }
    };

    CONFIG.ageSystem = ageSystem;

    // Define Token Icons
    CONFIG.statusEffects = ageSystem.AGEstatusEffects;
    // Changing a few control icons
    CONFIG.controlIcons.defeated = "systems/the-expanse//systems/the-expanse/resources/imgs/effects/hasty-grave.svg"

    // Definition des dés spécifiques
    CONFIG.Dice.terms["n"] = ExpanseNormalDice;
	CONFIG.Dice.terms["s"] = ExpanseStuntDice;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("the-expanse", ageSystemSheetCharacter, {
        types: ["char"],
        makeDefault: true,
        label: "the-expanse.SHEETS.charStandard"
    });
    Actors.registerSheet("the-expanse", ageSystemSheetCharStatBlock, {
        types: ["char"],
        label: "the-expanse.SHEETS.charStatBlock"
    });
    Actors.registerSheet("the-expanse", ageSystemSheetVehicle, {
        types: ["vehicle"],
        makeDefault: true,
        label: "the-expanse.SHEETS.vehicleStandard"
    });
    Actors.registerSheet("the-expanse", ageSystemSheetSpaceship, {
        types: ["spaceship"],
        makeDefault: true,
        label: "the-expanse.SHEETS.spaceshipStandard"
    });
    
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("the-expanse", ageSystemSheetItem, {
        makeDefault: true,
        label: "the-expanse.SHEETS.itemStandard"
    });

    game.ageSystem.ageRoller = new AgeRoller({
        popOut: false,
        minimizable: false,
        resizable: false,
    });

    game.ageSystem.ageTracker = new AgeTracker({
        popOut: false,
        minimizable: false,
        resizable: false
    });

    // Define extra data for Age System (Actors, Items, ActiveEffectConfig)
    CONFIG.Actor.documentClass = ageSystemActor;
    CONFIG.Token.objectClass = ageToken;
    CONFIG.Item.documentClass = ageSystemItem;
    CONFIG.ActiveEffect.documentClass = ageEffect;
    // Saving this customization for a later implementation
    // CONFIG.ActiveEffect.sheetClass = ageActiveEffectConfig;

    // Load partials for Handlebars
    preloadHandlebarsTemplates();

    // Register System Settings
    Settings.registerSystemSettings();

    // Useful concat Helper from Boilerplate system!
    Handlebars.registerHelper('concat', function() {
        let outStr = '';
        for (let arg in arguments) {
            if (typeof arguments[arg] != 'object') {
                outStr += arguments[arg];
            }
        }
        return outStr;
    });

    // Handlebar to identify type of Effect
    Handlebars.registerHelper('ageffect', function(mask, options) {
        for (let o = 0; o < options.length; o++) {
            const e = options[o];
            if (e[1] === mask) return e[0]
        }
        return `${mask} (${game.i18n.localize("the-expanse.custom")})`;
    })

    // Handlebar returning array with Focus for a given Ability
    Handlebars.registerHelper('focusbyabl', function(focus, abl) {
        return focus.filter(f => f.data.useAbl === abl)
    })

    // Handlebar returning array with equiped weapon
    Handlebars.registerHelper('equippedwpn', function(weapons) {
        return weapons.filter(f => f.data.equiped === true)
    })

    // Handlebar returning array with active Power dealing damage
    Handlebars.registerHelper('dmgpower', function(powers) {
        return powers.filter(p => p.data.activate === true && (p.data.hasDamage || p.data.hasHealing))
    })

    // Handlebar returning all carried itens
    Handlebars.registerHelper('carriedequip', function(items) {
        return items.filter(p => p.type === "equipment" || p.type === "weapon")
    })

    // Handlebar helper to compare 2 data
    Handlebars.registerHelper("when",function(operand_1, operator, operand_2, options) {
        let operators = {
            'eq': function(l,r) { return l == r; },
            'noteq': function(l,r) { return l != r; },
            'gt': function(l,r) { return Number(l) > Number(r); },
            'or': function(l,r) { return l || r; },
            'and': function(l,r) { return l && r; },
            '%': function(l,r) { return (l % r) === 0; }
        },
        result = operators[operator](operand_1,operand_2);
      
        if (result) return options.fn(this);
        else return options.inverse(this);
    });

    // Keep a list of actors that need to prepareData after 'ready' (generally those that rely on other actor data - passengers/mounts)
    game.postReadyPrepare = [];

});

Hooks.once("setup", function() {
    // Localize conditions
    for (let c = 0; c < ageSystem.conditions.length; c++) {
        const cond = ageSystem.conditions[c];
        ageSystem.conditions[c].name = game.i18n.localize(ageSystem.conditions[c].name);
        ageSystem.conditions[c].desc = game.i18n.localize(ageSystem.conditions[c].desc);
    }

    // Localize Abilities' name
    Setup.abilitiesName();

    // Localize Effects Name and build object
    Setup.localizeAgeEffects();

    // Localize Item modifier label
    // Setup.localizeModifiers();

});

Hooks.once("ready", async function() {
    // Identify Colorset
    const color = game.user.getFlag("the-expanse", "colorScheme");
    if (color) game.settings.set("the-expanse", "colorScheme", color);
    if (!color) game.user.setFlag("the-expanse", "colorScheme", game.settings.get("the-expanse", "colorScheme"));
    // Register color scheme on global name space
    ageSystem.colorScheme = game.settings.get("the-expanse", "colorScheme");

    // Tracker Handling
    // Identify if User already has ageTrackerPos flag set
    const userTrackerFlag = await game.user.getFlag("the-expanse", "ageTrackerPos");
    const useTracker = (game.settings.get("the-expanse", "serendipity") || game.settings.get("the-expanse", "complication") !== "none") ? true : false;
    if (!userTrackerFlag) await game.user.setFlag("the-expanse", "ageTrackerPos", ageSystem.ageTrackerPos);
    if (useTracker) game.ageSystem.ageTracker.refresh();

    // Age Roller
    // Handle flag
    const rollerFlag = await game.user.getFlag("the-expanse", "ageRollerPos");
    if (!rollerFlag) await game.user.setFlag("the-expanse", "ageRollerPos", ageSystem.ageRollerPos);
    game.ageSystem.ageRoller.refresh();

    // Prepare Actors dependent on other Actors
    for(let e of game.postReadyPrepare){
        e.prepareData();
    }
    
    // Register System Settings related do Focus Compendium
    ageSystem.itemCompendia = Settings.allCompendia("Item");
    Settings.loadCompendiaSettings();
    const setCompendium = game.settings.get("the-expanse", "masterFocusCompendium");
    ageSystem.focus = Settings.compendiumList(setCompendium);

    // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
    Hooks.on("hotbarDrop", (bar, data, slot) => createAgeMacro(data, slot));

    // // Determine whether a system migration is required and feasible
    if ( !game.user.isGM ) return;
    const currentVersion = game.settings.get("the-expanse", "systemMigrationVersion");
    const NEEDS_MIGRATION_VERSION = "0.0.0";
    // const COMPATIBLE_MIGRATION_VERSION = "0.8.7";
    const needsMigration = !currentVersion || isNewerVersion(NEEDS_MIGRATION_VERSION, currentVersion);
    if ( !needsMigration ) return;

    // Perform the migration
    // if ( currentVersion && isNewerVersion(COMPATIBLE_MIGRATION_VERSION, currentVersion) ) {
    //     const warning = `Your The Expanse System data is from too old a Foundry version and cannot be reliably migrated to the latest version. The process will be attempted, but errors may occur.`;
    //     ui.notifications.error(warning, {permanent: true});
    // }
    migrations.migrateWorld();

});

Hooks.on("createCompendium", () => {
    ageSystem.itemCompendia = Settings.allCompendia("Item");
})

// If Compendia are updated, then compendiumList is gathered once again
Hooks.on("renderCompendium", () => {
    const setCompendium = game.settings.get("the-expanse", "masterFocusCompendium");
    ageSystem.focus = Settings.compendiumList(setCompendium);
});

Hooks.on("renderageSystemItemSheet", (app, html, data) => {
    // Add item type on title bar
    Setup.nameItemSheetWindow(app);
});

Hooks.on("renderageSystemSheetCharacter", (app, html, data) => {
    // Hide primary Abilities checkbox
    Setup.hidePrimaryAblCheckbox(html);
});

Hooks.on("renderChatLog", (app, html, data) => AgeChat.addChatListeners(html));

Hooks.on("renderChatMessage", (app, html, data) => {
    // Hide chat message when rolling to GM
    AgeChat.sortCustomAgeChatCards(app, html, data);
});

// Prevent Items to be created on non campatible Actor types
Hooks.on("preCreateItem", (itemCreated, itemCreatedData, options, userId) => {
    // Ensure this change occurs once
    if (game.user.id !== userId) return;

    const actor = itemCreated.actor;
    const itemName = itemCreatedData.name
    const itemType = itemCreatedData.type

    if (!actor) return;

    // Avoid dropping Item on Vehicle
    if (actor.type === "vehicle") {
        ui.notifications.warn(`Items can not be droped on Vehicle Actor type.`);
        return options.temporary = true;
    };

    // Ensure only Spaceship Features are droped on Spaceships
    if (actor.type === "spaceship" && itemType !== "shipfeatures") {
        let warning = game.i18n.localize("the-expanse.WARNING.nonShipPartsOnShip");
        ui.notifications.warn(warning);
        return options.temporary = true;
    }
    
    // Prevent adding spaceship features to Actors
    if (actor.type === "char" && itemType === "shipfeatures") {
        let warning = game.i18n.localize("the-expanse.WARNING.shipPartsOnChar");
        ui.notifications.warn(warning);
        return options.temporary = true;
    }
    
    // Avoid Focus with repeated name on Actors
    if (actor.type === "char" && itemType === "focus") {
        const hasFocus = actor.items.filter(f => f.name === itemCreatedData.name && f.type === "focus");
        if (hasFocus.length > 0) {
            let warning = game.i18n.localize("the-expanse.WARNING.duplicatedFocus");
            warning += `"${itemName.toUpperCase()}"`;
            ui.notifications.warn(warning);
            return options.temporary = true;
        }
    }
});

Hooks.once('diceSoNiceReady', (dice3d) => {

    dice3d.addColorset({
		name:'expRouge',
		description:'The Expanse - Rouge',
		category:'The Expanse',
		foreground:'black',
		background:'#FF0000',
		outline:'#FF0000',
		edge:'#FF0000',
        //material:'glass',
		texture:'none'
	},"no");

    dice3d.addColorset({
		name:'expBlanc',
		description:'The Expanse - Blanc',
		category:'The Expanse',
		foreground:'black',
		background:'#FFFFFF',
		outline:'#FFFFFF',
		edge:'#FFFFFF',
        //material:'glass',
		texture:'none'
	},"no");

    dice3d.addColorset({
		name:'expNoir',
		description:'The Expanse - Noir',
		category:'The Expanse',
		foreground:'white',
		background:'#000000',
		outline:'#000000',
		edge:'#000000',
        //material:'glass',
		texture:'none'
        
	},"no");

    dice3d.addColorset({
		name:'expBleu',
		description:'The Expanse - Bleu',
		category:'The Expanse',
		foreground:'white',
		background:'#000064',
		outline:'#000064',
		edge:'#000064',
        //material:'glass',
		texture:'none'
	},"no");

    let expanseDiceType = game.settings.get("the-expanse", "ExpanseDices");
    switch(expanseDiceType) {
        case "TerreAE":
            // Terre Blanc - Bleu
            dice3d.addSystem({id:"terreAE",name:"Terre blanc - bleu"},"preferred");

            dice3d.addDicePreset({
                type:"dn",
                labels:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Terre-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Terre-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Terre-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Terre-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Terre-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Terre-blanc.png'
                ],
                bumpMaps:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Terre-bump.png'
                ],
                colorset: "expBlanc",
                system: "terreAE"
            });

	        dice3d.addDicePreset({
                type:"ds",
                labels:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Terre-bleu.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Terre-bleu.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Terre-bleu.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Terre-bleu.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Terre-bleu.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Terre-bleu.png'
                ],
                bumpMaps:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Terre-bump.png'
                ],
                colorset: "expBleu",
                system: "terreAE"
            });
        break;
        case "TerreEA":
            // Terre Bleu - Blanc
            dice3d.addSystem({id:"terreEA",name:"Terre bleu - blanc"},"preferred");

            dice3d.addDicePreset({
                type:"ds",
                labels:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Terre-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Terre-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Terre-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Terre-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Terre-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Terre-blanc.png'
                ],
                bumpMaps:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Terre-bump.png'
                ],
                colorset: "expBlanc",
                system: "terreEA"
            });

	        dice3d.addDicePreset({
                type:"dn",
                labels:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Terre-bleu.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Terre-bleu.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Terre-bleu.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Terre-bleu.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Terre-bleu.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Terre-bleu.png'
                ],
                bumpMaps:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Terre-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Terre-bump.png'
                ],
                colorset: "expBleu",
                system: "terreEA"
            });
        break;
        case "MarsRN":
            // Mars Rouge - Noir
            dice3d.addSystem({id:"marsRN",name:"Mars rouge - noir"},"preferred");

            dice3d.addDicePreset({
                type:"dn",
                labels:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Mars-rouge.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Mars-rouge.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Mars-rouge.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Mars-rouge.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Mars-rouge.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Mars-rouge.png'
                ],
                bumpMaps:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Mars-bump.png'
                ],
                colorset: "expRouge",
                system: "marsRN"
            });

            dice3d.addDicePreset({
                type:"ds",
                labels:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Mars-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Mars-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Mars-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Mars-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Mars-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Mars-noir.png'
                ],
                bumpMaps:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Mars-bump.png'
                ],
                colorset: "expNoir",
                system: "marsRN"
            });
        break;
        case "MarsNR":
            // Mars Noir - Rouge
            dice3d.addSystem({id:"marsNR",name:"Mars noir - rouge"},"preferred");

            dice3d.addDicePreset({
                type:"ds",
                labels:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Mars-rouge.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Mars-rouge.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Mars-rouge.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Mars-rouge.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Mars-rouge.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Mars-rouge.png'
                ],
                bumpMaps:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Mars-bump.png'
                ],
                colorset: "expRouge",
                system: "marsNR"
            });

            dice3d.addDicePreset({
                type:"dn",
                labels:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Mars-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Mars-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Mars-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Mars-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Mars-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Mars-noir.png'
                ],
                bumpMaps:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Mars-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Mars-bump.png'
                ],
                colorset: "expNoir",
                system: "marsNR"
            });
            break;
        case "CeintureBN":
            // Ceinture Blanc - Noir
            dice3d.addSystem({id:"ceintureBN",name:"Ceinture blanc - noir"},"preferred");

            dice3d.addDicePreset({
                type:"dn",
                labels:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Ceinture-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Ceinture-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Ceinture-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Ceinture-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Ceinture-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Ceinture-blanc.png'
                ],
                bumpMaps:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Ceinture-bump.png'
                ],
                colorset: "expBlanc",
                system: "ceintureBN"
            });

	        dice3d.addDicePreset({
                type:"ds",
                labels:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Ceinture-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Ceinture-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Ceinture-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Ceinture-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Ceinture-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Ceinture-noir.png'
                ],
                bumpMaps:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Ceinture-bump.png'
                ],
                colorset: "expNoir",
                system: "ceintureBN"
            });
        break;
        case "CeintureNB":
            // Ceinture Noir - Blanc
            dice3d.addSystem({id:"ceintureNB",name:"Ceinture noir - blanc"},"preferred");

            dice3d.addDicePreset({
                type:"ds",
                labels:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Ceinture-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Ceinture-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Ceinture-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Ceinture-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Ceinture-blanc.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Ceinture-blanc.png'
                ],
                bumpMaps:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Ceinture-bump.png'
                ],
                colorset: "expBlanc",
                system: "ceintureNB"
            });

	        dice3d.addDicePreset({
                type:"dn",
                labels:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Ceinture-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Ceinture-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Ceinture-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Ceinture-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Ceinture-noir.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Ceinture-noir.png'
                ],
                bumpMaps:[
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/1-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/2-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/3-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/4-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/5-Ceinture-bump.png',
                    '/systems/the-expanse/resources/imgs/expanse-dice/dice-so-nice/6-Ceinture-bump.png'
                ],
                colorset: "expNoir",
                system: "ceintureNB"
            });
        break;
    }
});