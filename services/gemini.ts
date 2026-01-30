
import { GoogleGenAI } from "@google/genai";

// Guideline: Always use process.env.API_KEY directly for initialization.
// The availability of the key is handled externally.
export const getAIInsight = async (context: string, prompt: string) => {
  // Initialize the GenAI client within the function to use the latest environment variables.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  try {
    // Guideline: Call generateContent directly from ai.models.
    // 'gemini-3-flash-preview' is used for basic text analysis and summarization tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { text: `Context: ${context}` },
          { text: prompt }
        ]
      },
      config: {
        systemInstruction: "Você é um assistente de produtividade e treinador financeiro pessoal de alta performance chamado LifeOS IA. Sua missão é fornecer insights acionáveis, motivar o usuário e sugerir otimizações de rotina baseadas nos dados fornecidos.",
        temperature: 0.7,
      },
    });

    // Guideline: Use the .text property (not a method) to retrieve the content.
    return response.text || "Sem insights gerados no momento.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Desculpe, tive um problema ao processar seu pedido. Tente novamente em instantes.";
  }
};

export const analyzeFinances = async (transactions: any[]) => {
  const context = JSON.stringify(transactions);
  return getAIInsight(context, "Analise meus gastos recentes e sugira 3 áreas onde posso economizar este mês. Seja direto e prático.");
};

export const optimizeRoutine = async (habits: any[], tasks: any[]) => {
  const context = JSON.stringify({ habits, tasks });
  return getAIInsight(context, "Com base nos meus hábitos e tarefas pendentes, sugira uma rotina matinal ideal para maximizar minha produtividade amanhã.");
};
