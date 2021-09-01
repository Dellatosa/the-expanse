export const ageSystem = {
    abilitiesSettings: {}
};

// Ability set for "main" - core AGE System games
ageSystem.abilitiesSettings.main = {
    "acc": "the-expanse.acc",
    "comm": "the-expanse.comm",
    "cons": "the-expanse.cons",
    "dex": "the-expanse.dex",
    "fight": "the-expanse.fight",
    "int": "the-expanse.int",
    "per": "the-expanse.per",
    "str": "the-expanse.str",
    "will": "the-expanse.will",
};

// Ability set for "dage" - Dragon Age games
ageSystem.abilitiesSettings.dage = {
    "comm": "the-expanse.comm",
    "cons": "the-expanse.cons",
    "cunn": "the-expanse.cunn",
    "dex": "the-expanse.dex",
    "magic": "the-expanse.magic",
    "per": "the-expanse.per",
    "str": "the-expanse.str",
    "will": "the-expanse.will",
};

ageSystem.actionsToCast = {
    noAction: "the-expanse.noAction",
    minorAction: "the-expanse.minorAction",
    majorAction: "the-expanse.majorAction",
    oneMinute: "the-expanse.oneMinute",
    fiveMinutes: "the-expanse.fiveMinutes",
    tenMinutes: "the-expanse.tenMinutes",
    twentyMinutes: "the-expanse.twentyMinutes",
    oneHour: "the-expanse.oneHour",
    fourHours: "the-expanse.fourHours",
    twelveHours: "the-expanse.twelveHours"
};

ageSystem.reloadDuration = {
    noAction: "the-expanse.noAction",
    minorAction: "the-expanse.minorAction",
    majorAction: "the-expanse.majorAction",
    d6minor: "the-expanse.d6minor"
};

ageSystem.fatigueConditions = {
    noFatigue: "the-expanse.noFatigue",
    winded: "the-expanse.winded",
    fatigued: "the-expanse.fatigued",
    exhausted: "the-expanse.exhausted",
    dying: "the-expanse.dying"
};

// Conditions
ageSystem.conditions = [
    {
        name: "the-expanse.conditions.blinded",
        desc: "the-expanse.conditions.blindedDesc",
        id: "blinded"
    },
    {
        name: "the-expanse.conditions.deafened",
        desc: "the-expanse.conditions.deafenedDesc",
        id: "deafened"
    },
    {
        name: "the-expanse.conditions.exhausted",
        desc: "the-expanse.conditions.exhaustedDesc",
        id: "exhausted"
    },
    {
        name: "the-expanse.conditions.fatigued",
        desc: "the-expanse.conditions.fatiguedDesc",
        id: "fatigued"
    },
    {
        name: "the-expanse.conditions.freefalling",
        desc: "the-expanse.conditions.freefallingDesc",
        id: "freefalling"
    },
    {
        name: "the-expanse.conditions.helpless",
        desc: "the-expanse.conditions.helplessDesc",
        id: "helpless"
    },
    {
        name: "the-expanse.conditions.hindered",
        desc: "the-expanse.conditions.hinderedDesc",
        id: "hindered"
    },
    {
        name: "the-expanse.conditions.prone",
        desc: "the-expanse.conditions.proneDesc",
        id: "prone"
    },
    {
        name: "the-expanse.conditions.restrained",
        desc: "the-expanse.conditions.restrainedDesc",
        id: "restrained"
    },
    {
        name: "the-expanse.conditions.injured",
        desc: "the-expanse.conditions.injuredDesc",
        id: "injured",
    },
    {
        name: "the-expanse.conditions.wounded",
        desc: "the-expanse.conditions.woundedDesc",
        id: "wounded"
    },
    {
        name: "the-expanse.conditions.unconscious",
        desc: "the-expanse.conditions.unconsciousDesc",
        id: "unconscious"
    },
    {
        name: "the-expanse.conditions.dying",
        desc: "the-expanse.conditions.dyingDesc",
        id: "dying"
    }
];

ageSystem.damageType = {
    stun: "the-expanse.stun",
    wound: "the-expanse.wound"
};
ageSystem.damageSource = {
    impact: "the-expanse.impact",
    ballistic: "the-expanse.ballistic",
    penetrating: "the-expanse.penetrating"
    // piercing: "the-expanse.piercing"
};
ageSystem.rof = {
    none: "the-expanse.rof.none",
    singleShot: "the-expanse.rof.singleShot",
    semiAuto: "the-expanse.rof.semiAuto",
    fullAuto: "the-expanse.rof.fullAuto"
};
    
// Vehicle parameters
ageSystem.velocityCategory = {
    velStandard: {colDmg: "1d6", sideDmg: "1d3"},
    velFast:  {colDmg: "2d6", sideDmg: "1d6"},
    velVeryFast:  {colDmg: "4d6", sideDmg: "2d6"},
    velExtreme:  {colDmg: "6d6", sideDmg: "3d6"}
};

// Spacehip sizes
ageSystem.spaceshipSize = {
    tiny: 1,
    small: 2,
    medium: 3,
    large: 4,
    huge: 5,
    gigantic: 6,
    colossal: 7,
    titanic: 8
};

// Spaceship hull by size
ageSystem.spaceshipHull = [
    "1",
    "1d3",
    "1d6",
    "2d6",
    "3d6",
    "4d6",
    "5d6",
    "6d6"
];

// Spaceship crew by size
ageSystem.spaceshipCrew = [
    {min: 1, typ: 2},
    {min: 1, typ: 2},
    {min: 2, typ: 4},
    {min: 4, typ: 16},
    {min: 16, typ: 64},
    {min: 64, typ: 512},
    {min: 256, typ: 2048},
    {min: 1024, typ: 8192}
];

// Spaceship crew competece
ageSystem.spaceshipCrewCompetence = {
    incompetent: 0,
    poor: 1,
    average: 2,
    capable: 3,
    skilled: 4,
    elite: 5
};

// Spaceship Features
ageSystem.featuresType = [
    "sensorMod", "maneuverSizeStep", "juiceMod", "special",
    "hullPlating", "hullMod",/* "rollable", */"weapon" // Maybe in the future I can add the rollable feature...
];

const itemIconPath = "systems/the-expanse/resources/imgs/item-icon/";
ageSystem.itemIcons = {
    "equipment": `${itemIconPath}briefcase.svg`,
    "stunts": `${itemIconPath}split-cross.svg`,
    //"talent": `${itemIconPath}skills.svg`,
    "talent": `${itemIconPath}Icon_Diamond.png`,
    "power": `${itemIconPath}embrassed-energy.svg`,
    "honorifics": `${itemIconPath}rank-3.svg`,
    "relationship": `${itemIconPath}player-next.svg`,
    "membership": `${itemIconPath}backup.svg`,
    "weapon": `${itemIconPath}fist.svg`,
    //"focus": `${itemIconPath}gift-of-knowledge.svg`,
    "focus": `${itemIconPath}Icon_Education.png`,
    "shipfeatures": `${itemIconPath}processor.svg`
};

const actorIconPath = "systems/the-expanse/resources/imgs/actor-icon/";
ageSystem.actorIcons = {
    "vehicle": `${actorIconPath}chariot.svg`,
    "char": `${actorIconPath}sensousness.svg`,
    "spaceship": `${actorIconPath}rocket.svg`,
}

const uiElementsPath = "systems/the-expanse/resources/imgs/ui-elements/";
ageSystem.uiElements = {
    //ageRoller: `${uiElementsPath}cube.svg`
    ageRoller: `${uiElementsPath}cubes.png`
}

const AGEstatusEffectsPath = "systems/the-expanse/resources/imgs/effects/";
ageSystem.AGEstatusEffects = [
    {
        icon: `${AGEstatusEffectsPath}number.png`,
        id: `num0`,
        label: `0`,
        flags: {
            "the-expanse": {
                type: "counter"
            }
        }
    },
    {
        icon: `${AGEstatusEffectsPath}number-1.png`,
        id: `num1`,
        label: `1`,
        flags: {
            "the-expanse": {
                type: "counter"
            }
        }
    },
    {
        icon: `${AGEstatusEffectsPath}number-2.png`,
        id: `num2`,
        label: `2`,
        flags: {
            "the-expanse": {
                type: "counter"
            }
        }
    },
    {
        icon: `${AGEstatusEffectsPath}number-3.png`,
        id: `num3`,
        label: `3`,
        flags: {
            "the-expanse": {
                type: "counter"
            }
        }
    },
    {
        icon: `${AGEstatusEffectsPath}number-4.png`,
        id: `num4`,
        label: `4`,
        flags: {
            "the-expanse": {
                type: "counter"
            }
        }
    },
    {
        icon: `${AGEstatusEffectsPath}number-5.png`,
        id: `num5`,
        label: `5`,
        flags: {
            "the-expanse": {
                type: "counter"
            }
        }
    },
    {
        icon: `${AGEstatusEffectsPath}number-6.png`,
        id: `num6`,
        label: `6`,
        flags: {
            "the-expanse": {
                type: "counter"
            }
        }
    },
    {
        icon: `${AGEstatusEffectsPath}number-7.png`,
        id: `num7`,
        label: `7`,
        flags: {
            "the-expanse": {
                type: "counter"
            }
        }
    },
    {
        icon: `${AGEstatusEffectsPath}number-8.png`,
        id: `num8`,
        label: `8`,
        flags: {
            "the-expanse": {
                type: "counter"
            }
        }
    },
    {
        icon: `${AGEstatusEffectsPath}number-9.png`,
        id: `num9`,
        label: `9`,
        flags: {
            "the-expanse": {
                type: "counter"
            }
        }
    },
    {
        icon: `${AGEstatusEffectsPath}number-10.png`,
        id: `num10`,
        label: `10`,
        flags: {
            "the-expanse": {
                type: "counter"
            }
        }
    },
    {
        icon: `${AGEstatusEffectsPath}pirate-grave.svg`,
        id: `dead`,
        label: `EFFECT.StatusDead`,
        flags: {
            "the-expanse": {
                type: "core"
            }
        }
    },
    {
        label: "the-expanse.conditions.blinded",
        id: "blinded",
        icon: "icons/svg/blind.svg",
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "blinded",
            }
        }
    },
    {
        label: "the-expanse.conditions.deafened",
        id: "deafened",
        icon: "icons/svg/deaf.svg",
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "deafened",
            }
        }
    },
    {
        label: "the-expanse.conditions.dying",
        id: "dying",
        icon: `${AGEstatusEffectsPath}half-dead.svg`,
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "dying"
            }
        }
    },
    {
        label: "the-expanse.conditions.fatigued",
        id: "fatigued",
        icon: `${AGEstatusEffectsPath}despair.svg`,
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "fatigued"
            }
        }
    },
    {
        label: "the-expanse.conditions.exhausted",
        id: "exhausted",
        icon: `${AGEstatusEffectsPath}oppression.svg`,
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "exhausted"
            }
        },
        changes: [{
            key: "data.speed.total",
            mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
            value: "0.5"
        }]
    },
    {
        label: "the-expanse.conditions.freefalling",
        id: "freefalling",
        icon: `${AGEstatusEffectsPath}acrobatic.svg`,
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "freefalling"
            }
        }
    },
    {
        label: "the-expanse.conditions.helpless",
        id: "helpless",
        icon: `${AGEstatusEffectsPath}knockout.svg`,
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "helpless"
            }
        }
    },
    {
        label: "the-expanse.conditions.hindered",
        id: "hindered",
        icon: `${AGEstatusEffectsPath}knee-bandage.svg`,
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "hindered"
            }
        },
        changes: [{
            key: "data.speed.total",
            mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
            value: "0.5"
        }]
    },
    {
        label: "the-expanse.conditions.injured",
        id: "injured",
        icon: `${AGEstatusEffectsPath}backstab.svg`,
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "injured"
            }
        },
        changes: [{
            key: "data.testMod",
            mode: CONST.ACTIVE_EFFECT_MODES.ADD,
            value: "-1"
        }]
    },
    {
        label: "the-expanse.conditions.wounded",
        id: "wounded",
        icon: `${AGEstatusEffectsPath}arrowed.svg`,
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "wounded"
            }
        },
        changes: [{
            key: "data.speed.total",
            mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
            value: "0.5"
        },
        {
            key: "data.testMod",
            mode: CONST.ACTIVE_EFFECT_MODES.ADD,
            value: "-2"
        }]
    },
    {
        label: "the-expanse.conditions.prone",
        id: "prone",
        icon: "icons/svg/falling.svg",
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "prone"
            }
        }
    },
    {
        label: "the-expanse.conditions.restrained",
        id: "restrained",
        icon: `${AGEstatusEffectsPath}imprisoned.svg`,
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "restrained"
            }
        },
        changes: [{
            key: "data.speed.total",
            mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
            value: "0"
        }]
    },
    {
        label: "the-expanse.conditions.unconscious",
        id: "unconscious",
        icon: "icons/svg/unconscious.svg",
        flags: {
            "the-expanse": {
                type: "conditions",
                name: "unconscious"
            }
        },
        changes: [{
            key: "data.speed.total",
            mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
            value: "0"
        }]
    },
    // Below this line are Foundry Core token conditions
    {
        id: "sleep",
        label: "EFFECT.StatusAsleep",
        icon: "icons/svg/sleep.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "fly",
        label: "EFFECT.StatusFlying",
        icon: "icons/svg/wing.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "stun",
        label: "EFFECT.StatusStunned",
        icon: "icons/svg/daze.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "paralysis",
        label: "EFFECT.StatusParalysis",
        icon: "icons/svg/paralysis.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "silence",
        label: "EFFECT.StatusSilenced",
        icon: "icons/svg/silenced.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "fear",
        label: "EFFECT.StatusFear",
        icon: "icons/svg/terror.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "burning",
        label: "EFFECT.StatusBurning",
        icon: "icons/svg/fire.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "frozen",
        label: "EFFECT.StatusFrozen",
        icon: "icons/svg/frozen.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "shock",
        label: "EFFECT.StatusShocked",
        icon: "icons/svg/lightning.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "corrode",
        label: "EFFECT.StatusCorrode",
        icon: "icons/svg/acid.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
        {
        id: "bleeding",
        label: "EFFECT.StatusBleeding",
        icon: "icons/svg/blood.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "disease",
        label: "EFFECT.StatusDisease",
        icon: "icons/svg/biohazard.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "poison",
        label: "EFFECT.StatusPoison",
        icon: "icons/svg/poison.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "radiation",
        label: "EFFECT.StatusRadiation",
        icon: "icons/svg/radiation.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "regen",
        label: "EFFECT.StatusRegen",
        icon: "icons/svg/regen.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "degen",
        label: "EFFECT.StatusDegen",
        icon: "icons/svg/degen.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "upgrade",
        label: "EFFECT.StatusUpgrade",
        icon: "icons/svg/upgrade.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "downgrade",
        label: "EFFECT.StatusDowngrade",
        icon: "icons/svg/downgrade.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "target",
        label: "EFFECT.StatusTarget",
        icon: "icons/svg/target.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "eye",
        label: "EFFECT.StatusMarked",
        icon: "icons/svg/eye.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "curse",
        label: "EFFECT.StatusCursed",
        icon: "icons/svg/sun.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "bless",
        label: "EFFECT.StatusBlessed",
        icon: "icons/svg/angel.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "fireShield",
        label: "EFFECT.StatusFireShield",
        icon: "icons/svg/fire-shield.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "coldShield",
        label: "EFFECT.StatusIceShield",
        icon: "icons/svg/ice-shield.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "magicShield",
        label: "EFFECT.StatusMagicShield",
        icon: "icons/svg/mage-shield.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
    {
        id: "holyShield",
        label: "EFFECT.StatusHolyShield",
        icon: "icons/svg/holy-shield.svg",
        flags: {
            "the-expanse": {
                type: "general"
            }
        }
    },
];

ageSystem.ageEffectsKeys = {
    "testMod": {label: "the-expanse.bonus.testMod", mask: "data.testMod"},
    "attackMod": {label: "the-expanse.bonus.attackMod", mask: "data.attackMod"},
    "actorDamage": {label: "the-expanse.bonus.actorDamage", mask: "data.dmgMod"},
    "acc": {label: "the-expanse.bonus.acc", mask: "data.abilities.acc.total"},
    "comm": {label: "the-expanse.bonus.comm", mask: "data.abilities.comm.total"},
    "cons": {label: "the-expanse.bonus.cons", mask:"data.abilities.cons.total"},
    "cunn": {label: "the-expanse.bonus.cunn", mask: "data.abilities.cunn.total"},
    "dex": {label: "the-expanse.bonus.dex", mask: "data.abilities.dex.total"},
    "fight": {label: "the-expanse.bonus.fight", mask: "data.abilities.fight.total"},
    "int": {label: "the-expanse.bonus.int", mask: "data.abilities.int.total"},
    "magic": {label: "the-expanse.bonus.magic", mask: "data.abilities.magic.total"},
    "per": {label: "the-expanse.bonus.per", mask: "data.abilities.per.total"},
    "str": {label: "the-expanse.bonus.str", mask: "data.abilities.str.total"},
    "will": {label: "the-expanse.bonus.will", mask: "data.abilities.total"},
    "defense": {label: "the-expanse.bonus.defense", mask: "data.defense.total"},
    "impactArmor": {label: "the-expanse.bonus.impactArmor", mask: "data.armor.impact"},
    "ballisticArmor": {label: "the-expanse.bonus.ballisticArmor", mask: "data.armor.ballistic"},
    "defendMnv": {label: "the-expanse.bonus.defendMnv", mask: "data.defend.total"},
    "guardupMnv": {label: "the-expanse.bonus.guardupMnv", mask: "data.guardUp.total"},
    "allOutAtk": {label: "the-expanse.bonus.allOutAtkMnv", mask: "data.allOutAttack.total"},
    "maxHealth": {label: "the-expanse.bonus.maxHealth", mask: "data.health.max"},
    "maxConviction": {label: "the-expanse.bonus.maxConviction", mask: "data.conviction.max"},
    "maxPowerPoints": {label: "the-expanse.bonus.maxPowerPoints", mask: "data.powerPoints.max"},
    "aimMnv": {label: "the-expanse.bonus.aimMnv", mask: "data.aim.total"},
    "armorPenalty": {label: "the-expanse.bonus.armorPenalty", mask: "data.armor.penalty"},
    "armorStrain": {label: "the-expanse.bonus.armorStrain", mask: "data.armor.strain"},
    "speed": {label: "the-expanse.bonus.speed", mask: "data.speed.total"},
    "toughness": {label: "the-expanse.bonus.toughness", mask: "data.armor.toughness.total"},
}

ageSystem.itemEffectsKeys = {
    "powerForce": {label: "the-expanse.bonus.powerForce", mask: ""},
    "focus": {label: "the-expanse.bonus.focusValue", mask: ""},
    "itemDamage": {label: "the-expanse.bonus.itemAtk", mask: ""},
    "itemActivation": {label: "the-expanse.bonus.generalDmg", mask: ""}
}

// Age Tracker & Roller Initial Positions
ageSystem.ageTrackerPos = {xPos: "260px", yPos: "69px"};
ageSystem.ageRollerPos = {xPos: "800px", yPos: "10px"};

// Initializing variable to load focus Compendiaum
ageSystem.focus = [];

// List with world's Item compendia
ageSystem.itemCompendia = [];