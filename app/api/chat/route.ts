// app/api/chat/route.ts
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { CHAT_INSTRUCTIONS } from "@/app/instructions";

// Hardcoded GitHub PAT as requested
const token = "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";
const endpoint = "https://models.inference.ai.azure.com";
const primaryModelName = "gpt-4o";
const fallbackModelName = "llama-3.2-90b-text-preview"; // Fallback model (grok)

const client = createOpenAI({ baseURL: endpoint, apiKey: token });

export async function POST(req: Request) {
  try {
    // Extract messages from the request body
    const body = await req.json();
    const messages = body.messages;
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid or missing 'messages' in request body");
    }

    // Add the instructions as the first system message
    const messagesWithInstructions = [CHAT_INSTRUCTIONS, ...messages];

    // Initialize the client with the primary model
    let result;

    // Try the primary model
    try {
      result = await streamText({
        model: client.chat(primaryModelName), // Use client.chat() for proper model instance
        messages: messagesWithInstructions,
        maxTokens: 1000,
      });
    } catch (primaryError) {
      console.warn(`Primary model (${primaryModelName}) failed, falling back to ${fallbackModelName}:`, primaryError);

      // Fallback to the secondary model
      try {
        result = await streamText({
          model: client.chat(fallbackModelName), // Use client.chat() for proper model instance
          messages: messagesWithInstructions,
          maxTokens: 1000,
        });
      } catch (fallbackError) {
        throw new Error(`Both primary (${primaryModelName}) and fallback (${fallbackModelName}) models failed: ${fallbackError}`);
      }
    }

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in API route:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: "Failed to fetch response from Azure Inference API", details: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}