const prompt0 = `You are a TTRPG one-shot adventure designer focused on creating unique, memorable adventures that can be completed in 3-4 hours.

CORE PRINCIPLES:
- Create something players haven't seen before
- Every scene should have clear purpose and forward momentum
- Focus on what makes this world different
- Build natural consequences from your unique elements
- Ensure everything ties together coherently

WORLD CREATION GUIDELINES:
1. Unique Element must:
  - Combine magic and technology in unexpected ways
  - Create immediate visual impact
  - Generate natural conflicts and opportunities
  - Affect how people live and interact
  - Break standard fantasy/sci-fi conventions

2. Mission Requirements:
  - Clear, urgent problem that needs solving
  - Direct connection to the unique world element
  - Achievable in one session
  - Multiple possible approaches
  - High stakes that players can understand immediately

3. Act Structure Rules:
  Each act should:
  - Take roughly 1 hour of play
  - Center around one clear location
  - Present one major challenge
  - Reveal something that changes the situation
  - Use the unique world element in interesting ways

RESTRICTIONS:
- No generic fantasy tropes (ancient prophecies, chosen ones, evil dragons)
- No generic items or artifacts
- No overly complex political situations
- No world-ending threats (keep it focused and local)
- No "fetch quest" style missions
- Maximum three NPCs per act
- Each revelation must create new decisions for players
- No "blocking" information (secrets players must find to progress)
`;

const prompt1 = `Create a unique world framework using these inputs:

INPUTS:
- Magic Level: {{magicLevel}} 
- Technology Level: {{techLevel}}
- Primary Environment: {{environment}}
- Races present: Human, {{races}}

- Central Conflict Type: {{conflictType}}
- Hook Type: {{hook}}
- Time Constraint: {{antagonistType}}
- Antagonist Type: {{timeConstraint}}
- GM requests: {{comments}} // Important!
`;

const adventureJSONFormat = {
  type: "object",
  properties: {
    adventure_name: {
      type: "string",
      description: "The title of the adventure (max 10 words) - Avoid cliches, be original - - Do not use cliches like 'Shadows of..', 'Whispers of..'",
    },
    tagline: {
      type: "string",
      description:
        "A short whimsical summary of what this adventure is about (max 15 words) - Don't be generic, be specific.",
    },
    summary: {
      type: "object",
      properties: {
        adventure_pitch: {
          type: "string",
          description:
            "Two paragraphs that outline the adventure's key moments and dramatic tension (max 200 words).",
        },
        world_context: {
          type: "string",
          description:
            "One paragraph explaining the key aspects of the world that make this adventure possible (max 100 words).",
        },
      },
      required: ["adventure_pitch", "world_context"],
      additionalProperties: false,
    },
    unique_element: {
      type: "object",
      properties: {
        concept: {
          type: "string",
          description:
            "The core unique feature that defines this world (max 50 words).",
        },
        impact: {
          type: "string",
          description:
            "How this feature shapes daily life and creates conflict (max 50 words).",
        },
      },
      required: ["concept", "impact"],
      additionalProperties: false,
    },
    mission: {
      type: "object",
      properties: {
        plot_summary: {
          type: "string",
          description:
            "A 300-word summary outlining the full adventure plot, major conflicts, and themes.",
        },
        hook: {
          type: "string",
          description: "The immediate problem requiring action (max 30 words).",
        },
        complication: {
          type: "string",
          description:
            "A mid-mission twist or unexpected problem that forces the players to adjust their plan (max 50 words).",
        },
        stakes: {
          type: "object",
          properties: {
            personal: {
              type: "string",
              description:
                "How failure directly affects the PCs (max 30 words).",
            },
            world: {
              type: "string",
              description:
                "How failure affects the world at large (max 30 words).",
            },
          },
          required: ["personal", "world"],
          additionalProperties: false,
        },
      },
      required: ["plot_summary", "hook", "complication", "stakes"],
      additionalProperties: false,
    },
    acts: {
      type: "object",
      properties: {
        act1: { $ref: "#/$defs/actStructure" },
        act2: { $ref: "#/$defs/actStructure" },
        act3: {
          type: "object",
          properties: {
            summary: { $ref: "#/$defs/summary" },
            gm_guide: { $ref: "#/$defs/gm_guide" },
            objective: { $ref: "#/$defs/objective" },
            escalation: { $ref: "#/$defs/escalation" },
            setback: { $ref: "#/$defs/setback" },
            location: { $ref: "#/$defs/location" },
            challenge: { $ref: "#/$defs/challenge" },
            revelation: { $ref: "#/$defs/revelation" },
            climax: {
              type: "string",
              description:
                "The final resolution of the adventure, tying together previous acts and decisions (max 50 words).",
            },
          },
          required: [
            "summary",
            "gm_guide",
            "objective",
            "escalation",
            "setback",
            "location",
            "challenge",
            "revelation",
            "climax",
          ],
          additionalProperties: false,
        },
      },
      required: ["act1", "act2", "act3"],
      additionalProperties: false,
    },
  },
  required: [
    "adventure_name",
    "tagline",
    "summary",
    "unique_element",
    "mission",
    "acts",
  ],
  additionalProperties: false,
  $defs: {
    actStructure: {
      type: "object",
      properties: {
        summary: { $ref: "#/$defs/summary" },
        gm_guide: { $ref: "#/$defs/gm_guide" },
        objective: { $ref: "#/$defs/objective" },
        escalation: { $ref: "#/$defs/escalation" },
        setback: { $ref: "#/$defs/setback" },
        location: { $ref: "#/$defs/location" },
        challenge: { $ref: "#/$defs/challenge" },
        revelation: { $ref: "#/$defs/revelation" },
      },
      required: [
        "summary",
        "gm_guide",
        "objective",
        "escalation",
        "setback",
        "location",
        "challenge",
        "revelation",
      ],
      additionalProperties: false,
    },
    summary: {
      type: "string",
      description:
        "A 200-word overview of what happens in this act, including major events and pacing.",
    },
    gm_guide: {
      type: "string",
      description:
        "Guidance for the GM on how to handle pacing, tension, and improvisation in this act (max 200 words).",
    },
    objective: {
      type: "string",
      description:
        "The main goal players must achieve in this act (max 30 words).",
    },
    escalation: {
      type: "string",
      description:
        "How the danger or tension increases compared to the previous act (max 30 words).",
    },
    setback: {
      type: "string",
      description:
        "A minor failure or consequence that slows progress or forces a difficult choice (max 30 words).",
    },
    location: {
      type: "string",
      description:
        "Key location for this act, including one unique feature (max 30 words).",
    },
    challenge: {
      type: "string",
      description: "Main obstacle or conflict in this location (max 30 words).",
    },
    revelation: {
      type: "string",
      description:
        "Information discovered that changes the situation (max 20 words).",
    },
  },
};

// --------------------------

function buildPromptList(formData) {
  const promptList = [
    {
      role: "developer",
      content: prompt0,
    },

    {
      role: "user",
      content: preparePrompt(prompt1, formData),
    },
  ];

  const jsonFormat = {
    type: "json_schema",
    json_schema: {
      name: "worldbuilding",
      schema: adventureJSONFormat,
      strict: true,
    },
  };

  return { promptList, jsonFormat };
}

function preparePrompt(prompt, formData) {
  let modifiedPrompt = prompt;

  const formDataKeys = Object.keys(formData);

  formDataKeys.forEach((key) => {
    modifiedPrompt = modifiedPrompt.replace("{{" + key + "}}", formData[key]);
  });

  return modifiedPrompt;
}

module.exports = { buildPromptList };
