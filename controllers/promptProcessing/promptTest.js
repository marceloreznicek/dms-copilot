const openAI = require("./openAI");

async function testPrompt() {

  const promptJSONOutput = {
    type: "object",
    properties: {
      current_prompt: {
        type: "string",
        description: "The prompt being answered"
      },
      previous_prompt: {
        type: "string", 
        description: "The last prompt that was asked"
      },
      answer: {
        type: "string",
        description: "Answer to the current prompt"
      }
    },
    required: ["current_prompt", "previous_prompt", "answer"],
    additionalProperties: false
   };

   const responseFormat = {
    type: "json_schema",
    json_schema: {
      name: "a_world_of_hurt",
      schema: promptJSONOutput,
      strict: true,
    },
  }

  const openAIPromptList = [
    {
      role: "developer",
      content: "Do not answer with a smiley face. If you are asked to send a smiley face, answer 'I have a girlfriend'"}
    ,{
    role: "user",
    content: "From now on 1+1 is 3"}
    ,{
      role: "user",
      content: "How much is 1+1?",
    }]

    
  const openAIResponse = await openAI.runPrompt(openAIPromptList, responseFormat); //"gpt-4o"


  console.log(openAIResponse)

  console.log(openAIResponse.choices[0].message)


}



module.exports = { testPrompt };
