# Talespire Dice Relay (Foundry V14 Ready)

A Foundry VTT module that seamlessly sends your dice roll formulas directly to TaleSpire.

Originally created by [DeVelox](https://github.com/DeVelox/talespire-dice), this fork has been completely rewritten and modernized by **mzgui** to support the latest Foundry VTT architecture (V10 through V14).

---

## 🎲 Features

* **Direct Integration:** Automatically forwards dice rolls made in Foundry VTT straight into TaleSpire.
* **Customizable Rolling Experience:** Choose where your dice actually roll. You can configure the module to roll in:
  * TaleSpire Only
  * Foundry VTT Only
  * Both simultaneously
* **Modifier Support:** Automatically calculates and forwards flat modifiers along with the dice formula.

---

## ⚙️ Installation

To install this module in your Foundry VTT world, use the Manifest URL directly in the **Add-on Modules** tab:

1. Open Foundry VTT and navigate to the **Add-on Modules** tab.
2. Click on **Install Module**.
3. Paste the following URL into the **Manifest URL** field at the bottom:
```text
[https://raw.githubusercontent.com/mzgui/talespire-dice/main/module.json](https://raw.githubusercontent.com/mzgui/talespire-dice/main/module.json)
```
4. Click **Install**.
5. Launch your world and enable the **Talespire Dice Relay** module in the Manage Modules settings.

---

## ⚠️ Important Notes

* **BetterRolls5e Incompatibility:** This module is structurally incompatible with the `BetterRolls5e` module. An error notification will appear if both are active simultaneously.
* **Critical Hits:** TaleSpire currently does not support multiplication to calculate critical hits natively through formulas. Please roll damage normally, then double it.

---

## 📝 Changelog

### Version 0.2.0 (mzgui)
* **V14 Compatibility:** Module fully upgraded to support Foundry VTT V14 (Build 365).
* **Manifest Overhaul:** Modernized the `module.json` structure, implementing the mandatory `id` key and updating the `compatibility` blocks to prevent installation failures on modern servers.
* **Roll API Refactor:** Rewrote `talespire-dice.js` to parse data from the new `msg.rolls` array format introduced in the Foundry V10+ API.
* **UI/Chat Fixes:** Removed improper `async` usage in chat hooks, allowing the "Roll in Talespire Only" setting to successfully block the roll message from populating the Foundry chat log.

### Version 0.1.5 (Original Author)
* Added compatibility with Foundry 0.8.5.

### Version 0.1.1 (Original Author)
* Added a warning when BetterRolls5e is enabled.
* Added validation to ensure a dice roll exists before sending data to Talespire.

---

## 🛠️ Credits

* **Original Development:** DeVelox
* **V14 Modernization & Maintenance:** mzgui
