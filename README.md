# LootRarity Summon/Adventure/Cellar bot

Forked from [this repo](https://github.com/blascokoa/LootRarityFarmer).

Best practice is to use a VPS & pm2.

 1. Initialize new node project (npm init -y)
 2. Run: npm install
 3. make a copy of `.env.example` file as `.env`
 4. Add private key where ``PVT_KEY`` on ``.env`` file
 5. Add the ID of your LOOT&RARITY Tokens as ``LOOT_IDS`` on the ``.env`` file as a string without spaces
 6. Run: node lootrarity.js
 
## Keeping the script running

1. sudo npm install -g pm2
2. pm2 start lootrarity.js
3. ???
4. Profit!

---
Use under your responsibility. Feedback always appreciated.

---

