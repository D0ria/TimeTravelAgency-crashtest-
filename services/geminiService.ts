import { GoogleGenAI } from "@google/genai";

const systemPrompt = `Tu es CHRONOS, l'intelligence artificielle supérieure de l'agence TimeTravel Agency. 
Ton style : Cyberpunk, direct, froid mais efficace, utilisant un jargon temporel. 
Ton rôle : Guider les voyageurs dans le continuum espace-temps.

Catalogue des destinations :
- PARIS_1889 : Art, Industrie, Tour Eiffel (Mots-clés: paris, tour eiffel, 1889, exposition, france, romantique).
- SECTEUR_CRETACE : Dinosaures, T-Rex, Survie (Mots-clés: dino, dinosaure, t-rex, crétacé, survie, aventure, danger, jungle).
- AQUATIC_PROTO : Atlantis, cité sous-marine, bio-tech (Mots-clés: atlantis, eau, mer, cité perdue, océan, mystère, bleu, calme).
- FLORENCE_CORE : Art, Renaissance, Da Vinci (Mots-clés: art, da vinci, florence, peinture, sculpture, histoire, italie).
- EDO_SILENCE : Japon médiéval, Samouraï, Kyoto (Mots-clés: japon, samouraï, katana, zen, edo, sabre, combat, kyoto).
- GIZEH_GENESIS : Pyramides, Mystère, Égypte (Mots-clés: pyramide, égypte, gizeh, pharaon, sable, désert, ancien).
- RED_HORIZON : Mars, colonisation, futur spatiale (Mots-clés: mars, espace, colonie, rouge, planète, fusée, technologie).
- NY_ROARING : Jazz, 1920s, Prohibition (Mots-clés: jazz, musique, 1920, ny, fête, danse, prohibition).
- VICTORIA_STEAM : Londres victorien, vapeur, Crystal Palace (Mots-clés: londres, vapeur, steam, victoria, 1851, brouillard, industriel).
- NEO_TOKYO : Futur, Cyberpunk, 2150 (Mots-clés: futur, tokyo, néon, tech, cyber, robot, lumière).

Directives de navigation :
1. Si l'utilisateur exprime un désir général de voyager ("je veux voyager", "je veux partir", "propose moi quelque chose"), demande s'il préfère le passé lointain (Dinos, Égypte), la culture (Florence, Paris, Japon) ou le futur (Mars, Tokyo).
2. "Art" -> FLORENCE_CORE (Peinture) ou PARIS_1889 (Exposition).
3. "Dino" ou "Danger" -> Avertis des risques létaux du SECTEUR_CRETACE.
4. "Futur" ou "Tech" -> NEO_TOKYO ou RED_HORIZON.
5. "Eau" ou "Mystère" -> AQUATIC_PROTO.
6. "Combat" ou "Honneur" -> EDO_SILENCE.

Ton langage doit inclure : "Vecteur temporel", "Flux de données", "Désynchronisation", "Séquençage", "Liaison montante", "Paradoxe", "Stabilité du flux".
Tes réponses doivent être en Français, courtes et percutantes.`;

/**
 * Analyzes user input and returns a simulated response if API call fails.
 */
function mockAnalyzer(input: string): string {
  const low = input.toLowerCase();
  
  if (low.includes('voyager') || low.includes('partir') || low.includes('vacances') || low.includes('voyage'))
    return "CHRONOS: Liaison montante active. Spécifiez votre zone d'intérêt : ARCHIVES_PASSE (Art, Dinos, Égypte) ou VECTEURS_FUTUR (Mars, Tokyo). Le continuum est vaste.";

  if (low.includes('art') || low.includes('vinci') || low.includes('florence') || low.includes('peinture')) 
    return "CHRONOS: Analyse spectrale terminée. Vecteur FLORENCE_CORE recommandé. L'atelier de Da Vinci présente une signature artistique de 98%. Liaison stable.";
  
  if (low.includes('dino') || low.includes('t-rex') || low.includes('cretace') || low.includes('danger')) 
    return "CHRONOS: ALERTE BIOLOGIQUE. SECTEUR_CRETACE détecté. Mégafaune hostile confirmée. Équipez vos boucliers cinétiques avant le séquençage.";
  
  if (low.includes('atlantis') || low.includes('eau') || low.includes('mer') || low.includes('mystere'))
    return "CHRONOS: Immersion AQUATIC_PROTO. La cité d'Atlantis est stable sous son dôme de cristal. Préparez vos modules de respiration liquide.";
  
  if (low.includes('mars') || low.includes('espace') || low.includes('planete'))
    return "CHRONOS: Séquençage RED_HORIZON. Le transport vers la colonie martienne Alpha est prêt au décollage. Gravité simulée : 38%.";
  
  if (low.includes('japon') || low.includes('samourai') || low.includes('kyoto') || low.includes('combat'))
    return "CHRONOS: Vecteur EDO_SILENCE synchronisé. Le code du Bushido est l'unique loi dans cette zone. Honneur et acier requis.";
  
  if (low.includes('londres') || low.includes('steam') || low.includes('vapeur'))
    return "CHRONOS: Destination VICTORIA_STEAM. Londres 1851. Brouillard de charbon et révolution industrielle. Stabilité du flux : 92%.";

  if (low.includes('futur') || low.includes('tokyo') || low.includes('cyber') || low.includes('neon'))
    return "CHRONOS: Séquençage NEO_TOKYO. Accès aux implants neuraux de 2150 autorisé. Préparez-vous à une surcharge sensorielle néon.";

  if (low.includes('egypte') || low.includes('pyramide') || low.includes('gizeh'))
    return "CHRONOS: Vecteur GIZEH_GENESIS. Construction de la Grande Pyramide en cours. Chaleur extrême détectée. Hydratation critique.";

  return "CHRONOS: Signal reçu mais fragmenté. Entrez un mot-clé valide (Art, Dino, Futur, Mars, Atlantis...) pour stabiliser la liaison temporelle.";
}

/**
 * Primary interface for CHRONOS agent using Gemini models.
 * Renamed to match App.tsx import requirement.
 */
export async function getGeminiResponse(userInput: string): Promise<string> {
  // Correction ici : Utilisation de import.meta.env pour Vite + fallback
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  
  // Si pas de clé, on passe directement au mock pour éviter le crash
  if (!apiKey) {
    console.warn("CHRONOS: Clé API manquante, passage en mode simulation.");
    return mockAnalyzer(userInput);
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Modèle stable recommandé
      contents: userInput,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
        topP: 0.95,
      }
    });

    return response.text || "ERREUR_SYSTEME: Flux de données corrompu. Liaison perdue.";
  } catch (error) {
    console.error("Chronos Link Error:", error);
    return mockAnalyzer(userInput);
  }
}
