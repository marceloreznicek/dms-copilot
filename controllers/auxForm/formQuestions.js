const formQuestions = [
    {
        id: 'magicLevel',
        question: "How prevalent is magic in your world? (This affects everything from daily life to plot possibilities)",
        options: ["No Magic", "Rare and Mysterious", "Common but Regulated", "High Magic"],
        type: 'worldbuilding'
    },
    {
        id: 'techLevel',
        question: "What's the technological level of your setting?",
        options: ["Medieval", "Renaissance", "Industrial", "Steampunk"],
        type: 'worldbuilding'
    },
    {
        id: 'environment',
        question: "What's the primary environment where the adventure takes place?",
        options: ["Urban", "Wilderness", "Underground", "Coastal", "Mountain", "Desert", "Outer Space"],
        type: 'worldbuilding'
    },
    {
        id: 'races',
        question: "Which non-human races play significant roles in your world's society?",
        type: 'worldbuilding',
        multiSelect: true,
        options: ["Elves", "Dwarves", "Orcs", "Goblins", "Lizardfolk", "Vampires", "Werewolves", "Merfolk", "Centaurs", "Minotaurs"]
    },

    {
        id: 'conflictType',
        question: "What type of central conflict drives your story?",
        options: ["Heist", "Personal Vendetta", "Ancient Prophecy", "Mysterious Artifact", "Political Conspiracy", "Environmental Crisis", "Murder Mystery"],
        type: 'plot'
    },
    {
        id: 'hook',
        question: "What's the immediate hook that draws the players in?",
        options: ["Urgent Request for Help", "Discovery of a Secret", "Personal Connection", "Promise of Reward", "Moral Obligation"],
        type: 'plot'
    },
    {
        id: 'timeConstraint',
        question: "What time pressure exists in your story?",
        options: ["24 Hours", "A Week", "A Month", "No Time Pressure"],
        type: 'plot'
    },
    {
        id: 'antagonistType',
        question: "What type of antagonist opposes the party?",
        options: ["Individual Villain", "Monster/Creature", "Organization", "Natural Force", "Cosmic Entity"],
        type: 'plot'
    },
];

module.exports = {formQuestions}