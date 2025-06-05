import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const API_KEY = process.env.NEWS_DATA_API_KEY;
const BASE_URL = "https://newsdata.io/api/1/latest";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ticker = searchParams.get("ticker");

  if (!ticker) {
    return NextResponse.json({ message: "Ticker is required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&q=${ticker}&language=en&category=business`
    );
    const data = await res.json();

    if (data.status === "error" || !data.results || data.results.length === 0) {
      return NextResponse.json({ message: "Failed to fetch or no results" }, { status: 500 });
    }

    const validNews = data.results
      .filter((item: any) => item.title && item.description)
      .slice(0, 10); // 최대 10개

    const analysis = await Promise.all(
      validNews.map(async (item: any) => {
        const { title, description } = item;

        const prompt = `
You are a helpful assistant that analyzes the sentiment of a news article about a stock.

News Title: "${title}"
News Description: "${description}"

Classify the sentiment of this news into one of the three categories: Positive, Negative, or Neutral.

Only return one word: Positive, Negative, or Neutral.
        `;

        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0,
            max_tokens: 5,
          });

          const sentiment = completion.choices[0]?.message?.content.trim();

          const isValidSentiment = ["Positive", "Negative", "Neutral"].includes(sentiment || "");

          return {
            title,
            description,
            sentiment: isValidSentiment ? sentiment : "Unknown",
          };
        } catch (err) {
          console.error("Sentiment analysis error:", err);
          return null; // 오류 시 결과에서 제외
        }
      })
    );

    // null 또는 Unknown 아닌 값만 필터링
    const filteredNews = analysis.filter((item) => item !== null && item.sentiment !== "Unknown");

    return NextResponse.json({ news: filteredNews });
  } catch (error) {
    console.error("PRICE FETCH ERROR", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
