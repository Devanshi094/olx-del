const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Get AI Response
const getChatbotResponse = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate message
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // OpenAI API Request
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or "gpt-4"
      messages: [{ role: "user", content: message }],
    });

    const reply = response.data.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error with OpenAI:", error.message);
    res.status(500).json({ error: "Error processing request" });
  }
};

module.exports = { getChatbotResponse };
