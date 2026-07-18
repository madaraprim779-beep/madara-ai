const axios = require("axios");

module.exports = async (req, res) => {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Méthode non autorisée"
        });
    }

    try {

        const { message } = req.body;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content:
                            "Tu es ♤☯MADARA☯♧ IA, une intelligence artificielle puissante, polie et utile. Tu réponds toujours en français sauf si l'utilisateur demande une autre langue."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const reply = response.data.choices[0].message.content;

        res.status(200).json({
            reply
        });

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({
            reply: "Une erreur est survenue lors de la communication avec l'IA."
        });

    }

};