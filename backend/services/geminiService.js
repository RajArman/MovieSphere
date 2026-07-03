import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getMovieNamesFromPrompt = async (userPrompt) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are a movie recommendation assistant.

The user will describe what kind of movies they want.

Return only 5 movie names.
Do not add numbering.
Do not add explanation.
Do not add extra text.

User request: ${userPrompt}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text
    .split("\n")
    .map((movie) => movie.trim())
    .filter(Boolean)
    .slice(0, 5);
};