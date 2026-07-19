import { injectable } from 'tsyringe';
import { GoogleGenAI } from '@google/genai';
import { envConfig } from '../config/env.config';
import { PlayerSuggestion, SuggestPlayersRequest } from '../shared';

@injectable()
export class AiService {
  private readonly ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: envConfig.GEMINI_API_KEY });
  }

  async suggestPlayers(playerInfo: SuggestPlayersRequest): Promise<PlayerSuggestion[]> {
    const { position, maxPrice } = playerInfo;

    const prompt = `
        You are an expert Fantasy Premier League analyst.

        Suggest 3 midfield players for a fantasy team.

        Position: ${position}
        Maximum price: £${maxPrice} million.

        Return ONLY JSON in this format:

        [
            {
            "name": "",
            "club": "",
            "price": "",
            "reason": ""
            }
        ]

        Do not invent players or prices.
        If you are unsure, say so.
    `;

    const response = await this.ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
    });

    return this.parseAiResponse(response.text ?? '');
  }

  private parseAiResponse(text: string): PlayerSuggestion[] {
    const cleanText = (text ?? '').replace(/```json|```/g, '').trim();
    return JSON.parse(cleanText) as PlayerSuggestion[];
  }
}
