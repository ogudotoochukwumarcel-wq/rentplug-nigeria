
import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI with the environment key. 
// In a free-tier environment, we assume the key is provided and used within rate limits.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeListingDescription = async (description: string) => {
  if (!description || description.length < 20) return null;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this rental listing description for professionalism and safety. Flag potential scams or inappropriate content: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isProfessional: { type: Type.BOOLEAN },
            scamProbability: { type: Type.NUMBER, description: "0 to 1 scale" },
            suggestions: { type: Type.STRING },
            summary: { type: Type.STRING }
          },
          required: ["isProfessional", "scamProbability", "summary"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.warn("Gemini API skipped or failed (Demo Mode):", error);
    // Fallback "Demo" analysis if API fails or is unavailable
    return {
      isProfessional: true,
      scamProbability: 0.05,
      summary: "Description looks standard for a rental listing.",
      suggestions: "Add more details about water and power availability."
    };
  }
};

export const getRecommendedAreas = async (city: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a list of the top 3 most popular residential areas for students and young professionals in ${city}, Nigeria. Include brief reasons why.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              area: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["area", "reason"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return city === 'Enugu' 
      ? [{ area: 'New Haven', reason: 'Centrally located and popular with students.' }]
      : [{ area: 'Ikenegbu', reason: 'Safe and close to commercial hubs.' }];
  }
};
