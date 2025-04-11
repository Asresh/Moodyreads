// Simple script to test if the OpenAI API key is working
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function testOpenAI() {
  try {
    console.log("Testing OpenAI API key...");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using a simpler model for testing
      messages: [
        { role: "user", content: "Hello, are you working? Please respond with a short message." }
      ],
      max_tokens: 20
    });
    
    console.log("API key is working! Response:", response.choices[0].message.content);
    return true;
  } catch (error) {
    console.error("API key is not working. Error:", error);
    return false;
  }
}

testOpenAI();