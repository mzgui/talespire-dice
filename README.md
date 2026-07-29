# Talespire Dice Relay (Foundry V14 Ready)

A Foundry VTT module that seamlessly sends your dice roll formulas directly to TaleSpire. 

Originally created by [DeVelox](https://github.com/DeVelox/talespire-dice), this fork has been completely rewritten and modernized by **mzgui** to support the latest Foundry VTT architecture (V10 through V14) and provide a seamless, invisible integration.

---

## 🎲 Features

* **Silent Execution:** Uses a self-destructing hidden iframe to send rolls to TaleSpire silently. No more annoying blank tabs opening in your browser!
* **Customizable Rolling Experience:** Choose where your dice actually roll. You can configure the module per player to roll in:
  * TaleSpire Only
  * Foundry VTT Only
  * Both simultaneously
* **Modifier Support:** Automatically calculates and forwards flat modifiers along with the dice formula.

---

## ⚙️ Installation

To install this module in your Foundry VTT world:

1. Open Foundry VTT and navigate to the **Add-on Modules** tab.
2. Click on **Install Module**.
3. Paste the following URL into the **Manifest URL** field at the bottom:
```text
[https://raw.githubusercontent.com/mzgui/talespire-dice/main/module.json](https://raw.githubusercontent.com/mzgui/talespire-dice/main/module.json)
```
4. Click **Install**.
5. Launch your world and enable the **Talespire Dice Relay** module in the Manage Modules settings.

---

## ⚠️ Compatibility & Notes

* **Supported Systems:** Currently only compatible and tested with the **D&D5e** game system.
* **Core Dice Only:** Not compatible with `BetterRolls5e` or anything not using core Foundry dice rolls. An error notification will appear if `BetterRolls5e` and this module are active simultaneously.
* **Critical Hits (D&D5e):** TaleSpire currently does not support multiplication to calculate critical hits natively through formulas. For critical hits, you need to roll damage normally, then double it manually.
