import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "audiocraft-musicgen", // modèle musique
      input: {
        prompt: prompt,
        duration: 30
      }
    }),
  });

  const data = await response.json();

  return NextResponse.json(data);
}
