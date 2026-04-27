import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
        input: {
          prompt,
          duration: 30,
        },
      }),
    });

    const prediction = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: prediction.detail }, { status: 500 });
    }

    let result = prediction;

    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 2000));

      const poll = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });

      result = await poll.json();

      if (result.status === "succeeded") {
        return NextResponse.json({
          audio: Array.isArray(result.output) ? result.output[0] : result.output,
        });
      }

      if (result.status === "failed") {
        return NextResponse.json({ error: "La génération a échoué" }, { status: 500 });
      }
    }

    return NextResponse.json({ error: "Temps trop long" }, { status: 504 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
