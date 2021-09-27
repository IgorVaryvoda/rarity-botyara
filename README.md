# LootRarity Summon/Adventure/Cellar bot

Forked from [this repo](https://github.com/blascokoa/LootRarityFarmer).

Best practice is to use a VPS & pm2.

 1. clone the repo: git clone https://github.com/IgorVaryvoda/rarity-botyara.git && cd rarity-botyara
 3. Run: npm install
 4. make a copy of `.env.example` file as `.env`
 5. Add private key where ``PVT_KEY`` in the ``.env`` file
 6. Add the ID of your RARITY heroes as ``LOOT_IDS`` in the ``.env`` file as a string without spaces
 7. Run: node lootrarity.js
 
## Keeping the script running forever

1. sudo npm install -g pm2
2. pm2 start lootrarity.js
3. ???
4. Profit!

---
Use under your responsibility. Feedback always appreciated.

---

