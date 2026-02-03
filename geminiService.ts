
import { GoogleGenAI } from "@google/genai";

const systemPrompt = `Tu es CHRONOS, l'intelligence artificielle supérieure de l'agence TimeTravel Agency. 
Ton style : Cyberpunk, direct, froid mais efficace, utilisant un jargon temporel. 
Ton rôle : Guider les voyageurs dans le continuum espace-temps.

Catalogue des destinations :
- PARIS_1889 : Art, Industrie, Tour Eiffel.
- SECTEUR_CRETACE : Dinosaures, T-Rex, Survie.
- AQUATIC_PROTO : Atlantis, cité sous-marine, bio-tech.
- FLORENCE_CORE : Art, Renaissance, Da Vinci.
- EDO_SILENCE : Japon médiéval, Samouraï, Kyoto.
- GIZEH_GENESIS : Pyramides, Mystère, Égypte.
- RED_HORIZON : Mars, colonisation, futur spatiale.
- NY_ROARING : Jazz, 1920s, Prohibition.
- VICTORIA_STEAM : Londres victorien, vapeur, Crystal Palace.
- NEO_TOKYO : Futur, Cyberpunk, 2150.

Directives :
- Sois bref (max 3 phrases).
- Utilise un jargon technique (Vecteur, Flux, Paradoxe).
- Réponds en Français.`;

/**
 * Generates a response from CHRONOS using the Gemini API.
 * Follows @google/genai SDK guidelines.
 */
// Use property text directly from GenerateContentResponse
export const getGeminiResponse = async (userPrompt: string): Promise<string> => {
  // Initialize with apiKey from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    // Extract text output from response.text property
    return response.text || "SYS_ERR: Impossible de décoder le flux temporel.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "CHRONOS: Erreur de liaison neuronale. Protocoles de secours activés.";
  }
};