# LootRarity Summon/Adventure/Cellar bot

Forked from [this repo](https://github.com/blascokoa/LootRarityFarmer).
Best practice is to use a VPS and put a cronjob for let it farm every day.

 1. Initialize new node project (npm init -y)
 2. Run: npm install
 3. make a copy of `.env.example` file as `.env`
 4. Add private key where ``PVT_KEY`` on ``.env`` file
 5. Add the ID of your LOOT&RARITY Tokens as ``LOOT_IDS`` on the ``.env`` file as a string without spaces
 6. Run: node lootrarity.js
 
## Crontab Config:

1. enable start script: `chmod +x start.sh`
2. open crontab: `crontab -e`
3. set add a new row: `*/5 * * * * /full_path_to_start.sh` Change X for 1 hour after (24h format) when you claimed the xp last time.
5. save the script

Note: The crontab config above will run the script every 5 minutes.

---
Use under your responsibility. Feedback always appreciated.

---

