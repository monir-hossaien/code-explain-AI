import dotenv from "dotenv";
dotenv.config();
import OpenAI from 'openai';

export const codeExplain = async (req, res) => {
    try {
        const {language, code} = req.body
        if (!language || !code) {
            res.status(400).json({status: false, message: 'language and code is missing'});
        }
        const API_KEY= process.env.NEBIUS_API_KEY;
        const client = new OpenAI({
            baseURL: 'https://api.studio.nebius.com/v1/',
            apiKey: API_KEY,
        });
        const messages = [
            {
                role: "user",
                content: `Please explain this ${language || ""} code in simple term: \n\n\`\`\`${language || ""}\n${code}\n\`\`\``,
            }
        ]

        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages,
            temperature: 0.3,
            max_tokens: 800,
        });
        const explanation = response?.choices[0]?.message?.content;
        if(!explanation) {
            return res.status(400).json({status: false, message: 'Failed to get a valid response from the OpenAI API'});
        }
        return res.status(200).json({status: true, data: explanation, language: language});

    }catch(error) {
        console.log(error)
        res.status(500).json({status: false, message: error.message});

    }
}

