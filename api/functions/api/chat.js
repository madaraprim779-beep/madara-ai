export async function onRequestPost(context) {
  try {
    const { message } = await context.request.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${context.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Tu es ♤☯MADARA☯♧ IA, une intelligence artificielle puissante."
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    return Response.json({
      reply: data.choices[0].message.content
    });

  } catch (e) {

    return Response.json({
      reply: "Erreur lors de la connexion à l'IA."
    }, {
      status: 500
    });

  }
}