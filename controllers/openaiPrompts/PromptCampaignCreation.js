const campaignCreationPrompt = `Prompt Template:

Generate a [setting_type] tabletop RPG campaign set in a [key_locations]. The campaign should be [campaign_length] sessions long with a [plot_structure] narrative structure.

Setting Details:
Playable Races: [races]
Magic Level: [magic_level] (e.g., low magic where it is rare and unstable, or high magic where it is commonplace and powerful).
Technology Level: [tech_level] (e.g., primitive medieval, early renaissance, steampunk, or advanced magic-based civilization).
Tone: [tone] (e.g., grimdark, heroic, whimsical, high-stakes).

Main Conflict:
The central conflict is [main_conflict], where [villain_type] are the primary antagonists.
The villains' motives and actions should align with the [setting_type] tone, making them compelling and nuanced.

Key Elements & Special Requests:
The [key_locations] must play a crucial role in the story.
The [special_requests] should be a driving force behind the adventure, creating urgency, dilemmas, and player agency.
Design encounters that integrate roleplay, tactical combat, and impactful player decisions.
Provide a detailed campaign outline, including major NPCs, pivotal locations, and potential climactic moments. The adventure should feel tailored to the setting and the chosen themes, allowing for both player agency and a compelling narrative arc.

Expected Output Format - JSON:
{
  "campaign_name": "A campaign name, try to be create",

  "elevator_pitch": "3 to 4 senteces - A short, but very intriguing summary of the campaign's core premise, conflict, and stakes.",

  "core_elements": {
    "tone": "grimdark | heroic | intrigue | cosmic horror",
    "campaign_length": "Short | Medium | Long",
    "plot_structure": "Linear | Branching | Sandbox",
    "main_conflict": "Person-vs-person | Person-vs-nature | Person-vs-self",
    "villain_type": "Brief description of the antagonist (e.g., tyrant king, corrupted noble, rebel faction)",
    "setting_overview": "Brief description of the primary location.",
    "player_impact": "Summary of how player choices affect the world."
  },

  "campaign_flow": {
    "act_1": {
      "opening_scene": "Where the players start and what’s happening.",
      "inciting_incident": "What forces the party into action?",
      "key_npcs_introduced": ["NPC Name 1", "NPC Name 2"],
      "secrets_and_rumors": "What secrets or rumors can the players find that moves the plot forward?"
    },
    "act_2": {
      "major_challenges": ["Challenge 1", "Challenge 2"],
      "major_twists": ["Twist 1", "Twist 2"],
      "morality_and_consequences": ["Dilemma 1", "Dilemma 2"],
      "secrets_and_rumors": "What secrets or rumors can the players find that moves the plot forward?"
    },
    "act_3": {
      "final_confrontation": "What’s at stake in the climax?",
      "villains_final_move": "How does the antagonist escalate the conflict?",
      "players_ultimate_choice": "What decision determines the campaign's outcome?"
    }
  },

  "world_details": {
    "key_locations": {
      "main_location": "Description of the primary setting.",
      "secondary_locations": ["Location 1", "Location 2"]
    },
    "factions": [
      {
        "name": "Faction Name",
        "goal": "Faction's main goal",
        "alignment": "Allied | Neutral | Hostile"
      }
    ]
  },

  "dm_toolbox": {
    "random_encounters": ["Encounter 1", "Encounter 2"],
    "key_npcs": [
      {
        "name": "NPC Name",
        "role": "Their importance in the story",
        "stats": {
          "strength": 10,
          "dexterity": 12,
          "constitution": 14,
          "intelligence": 16,
          "wisdom": 10,
          "charisma": 8
        }
      }
    ],
    "artifacts_and_items": ["Artifact 1", "Artifact 2"],
    "secrets_and_twists": ["Secret 1", "Secret 2"]
  }
}



`;

module.exports = {
  campaignCreationPrompt,
};
