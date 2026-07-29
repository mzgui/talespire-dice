Hooks.once("ready", () => {
  console.log("talespire-dice | Initializing talespire-dice");
  if (!(game.modules.has("betterrolls5e") && game.modules.get("betterrolls5e").active)) {
    Hooks.on("preCreateChatMessage", (msg) => {
      // É necessário retornar o resultado para que o Foundry saiba se deve ou não cancelar a mensagem
      return processRolls(msg); 
    });
  }
  else {
    ui.notifications.error("Talespire Dice Relay is not compatible with BetterRolls5e.");
  }
});

Hooks.once("init", () => {
  game.settings.register("talespire-dice", "rollFoundry", {
    name: "Where to roll dice:",
    scope: "client",
    config: true,
    default: 2,
    type: Number,
    choices: {
      0: "Talespire",
      1: "Foundry",
      2: "Both"
    }
  });
});

function parseFlavorText(flavor) {
  if (!flavor) return "dice";
  if (flavor.indexOf("<") > -1) {
    let match = flavor.match(/>(.+?)</);
    if (match) flavor = match[1];
    flavor = flavor.replace(/:/g, "");
  }
  return encodeURI(flavor);
}

function parseRollFormula(formula) {
  if (!formula) return "nodice";
  if (formula.indexOf("*") > -1) {
    return "crit";
  }
  if (!formula.match(/\d*d\d+/)) {
    return "nodice";
  }
  if (formula.indexOf("2d20k") > -1) {
    formula = formula.replace(/^2/, "1");
    formula = addMods(formula);
    return formula + "/" + formula;
  }
  return addMods(formula);
}

function addMods(formula) {
  formula = formula.replace(/[,]/g, "+");
  formula = formula.replace(/[{} ]/g, "");
  const dice = Array.from(formula.matchAll(/(\d*d\d+)/g), i => i[0]);
  const mods = Array.from(formula.matchAll(/([+-]\d+)(?!d)/g), i => i[0]).reduce((a, b) => a + parseInt(b), 0);
  return dice.join("+") + (mods >= 0 ? "+" : "") + mods;
}

// Removido o 'async' para que o 'return false' funcione e bloqueie o chat quando necessário
function processRolls(msg) {
  let flavor = "dice";
  let formula;
  let isRoll = false;

  // Atualizado para a API do Foundry V10+ (onde usamos msg.rolls ao invés de msg.roll)
  if (msg.isRoll && msg.rolls && msg.rolls.length > 0) {
    isRoll = true;
    // O flavor pode estar na mensagem ou nas opções da primeira rolagem
    let rawFlavor = msg.flavor || (msg.rolls[0].options && msg.rolls[0].options.flavor);
    flavor = parseFlavorText(rawFlavor);
    formula = parseRollFormula(msg.rolls[0].formula);
  }

  if (isRoll && game.settings.get("talespire-dice", "rollFoundry") !== 1) {
    if (formula === "crit") {
      ui.notifications.error("Talespire currently doesn't support multiplication to calculate critical hits. Please roll damage normally then double it.");
      return false; // Cancela no Foundry também para manter consistência
    }
    if (formula === "nodice") {
      console.log("talespire-dice | No dice roll found.");
    }
    else {
      window.open("talespire://dice/" + flavor + ":" + formula);
      if (game.settings.get("talespire-dice", "rollFoundry") === 0) {
        return false; // Retorna falso para impedir que o Foundry role o dado virtual dele
      }
    }
  }
  else {
    console.log("talespire-dice | No dice roll found.");
  }
}
