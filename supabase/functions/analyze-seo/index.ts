
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, keyword, results } = await req.json();

    const prompt = `As an SEO expert, analyze this webpage data and provide specific recommendations:
    URL: ${url}
    Target Keyword: ${keyword}
    Current Analysis:
    - Title contains keyword: ${results.title.hasKeyword}
    - Headings contain keyword: ${results.headings.hasKeyword}
    - Content word count: ${results.content.wordCount}
    - Loading speed: ${results.loadingSpeed.time}s

    Provide 3-5 specific, actionable recommendations to improve SEO ranking for this keyword. 
    You can use HTML tags like <b>, <i>, <ul>, <li>, <a> in your responses to format text.
    Format as JSON with:
    - priority (high/medium/low)
    - category (title, meta, content, technical, etc)
    - recommendation (specific action with HTML formatting allowed)
    - impact (brief explanation of why this matters with HTML formatting allowed)`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert SEO analyst providing actionable recommendations. You can use HTML formatting in your responses.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    const recommendations = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify({ recommendations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
