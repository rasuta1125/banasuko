import OpenAI from 'openai';
import { readFileSync } from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function testOpenAI() {
  try {
    console.log('Testing OpenAI API...');
    console.log('API Key prefix:', process.env.OPENAI_API_KEY?.substring(0, 10) + '...');
    
    // Simple text completion test
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "Hello! Just say 'OpenAI API is working!' in Japanese."
        }
      ],
      max_tokens: 50
    });

    console.log('✅ OpenAI API Response:', response.choices[0]?.message?.content);
    return true;
  } catch (error) {
    console.error('❌ OpenAI API Error:', error.message);
    if (error.status) {
      console.error('Status:', error.status);
    }
    return false;
  }
}

testOpenAI();
