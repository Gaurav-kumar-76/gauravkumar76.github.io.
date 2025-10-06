# Create updated data for TG-ULTRON portfolio with new stats and contact info
import json

# Updated TG-ULTRON data with all new specifications
updated_data = {
    "gamerTag": "TG-ULTRON",
    "freeFireID": "2813958275",
    "level": 71,
    "guild": "SOULMATES!",
    "role": "Fighter • Rusher • Level 71",
    "logo": "🥊",
    "bio": "Elite Free Fire fighter dominating battlegrounds with 3,757 matches and 8,185 eliminations! My 2.62 K/D ratio and 38.89% Top 3 rate speak for themselves. With 1,461 top 3 finishes and a record 19 eliminations in a single match, I bring the heat to every squad. Average survival time: 11:36 - I fight smart and fight hard!",
    "voiceNote": "Ready to fight! Add me for epic battles!",
    "stats": {
        "games": "3,757",
        "wins": "637", 
        "winRate": "16.96%",
        "eliminations": "8,185",
        "top3": "1,461",
        "top3Rate": "38.89%",
        "kdRatio": "2.62",
        "avgDistance": "4.41 KM",
        "avgSurvival": "11:36",
        "helpUps": "2,328",
        "highestKills": "19",
        "avgDamage": "1,285"
    },
    "achievements": [
        "Fighter Specialist (🥊)",
        "2.62 K/D Champion",
        "Top 3 Master (1,461 finishes)",
        "38.89% Top 3 Rate",
        "Highest Kills: 19 in one match",
        "Average Survival: 11:36",
        "8,185 Career Eliminations",
        "SOULMATES! Guild Fighter"
    ],
    "socialLinks": {
        "discord": "TG-ULTRON#1234",
        "instagram": "https://www.instagram.com/arise_abhiii_?igsh=eTU1bWQxOWp3ZmU2",
        "instagram_handle": "@arise_abhiii_",
        "youtube": "TG-ULTRON Gaming",
        "whatsapp": "+91 8864084619"
    },
    "qrCode": {
        "show": true,
        "label": "Scan to Add In-Game",
        "id": "2813958275"
    },
    "theme": {
        "primary": "fighter",
        "icon": "🥊",
        "colors": {
            "electricBlue": "#00BFFF",
            "fieryRed": "#FF4500", 
            "purple": "#8A2BE2"
        }
    }
}

print("Updated TG-ULTRON Portfolio Data:")
print(json.dumps(updated_data, indent=2))

# Save the data
with open('tg_ultron_final_data.json', 'w') as f:
    json.dump(updated_data, f, indent=2)

print("\nData saved successfully!")