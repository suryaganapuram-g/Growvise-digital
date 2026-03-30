// pages/api/seo-audit.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, tool } = req.body;
  if (!url) return res.status(400).json({ error: 'Website URL is required.' });

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set in Vercel.' });
  }

  const prompts = {
    'seo-audit': `You are an expert SEO analyst. Perform a thorough SEO audit for: ${url}. Cover: Overall SEO Score (out of 100), Technical SEO, On-Page SEO, Content Quality, Backlink Profile, Top 3 Quick Wins, and Long-Term Strategy. Be specific and actionable. Use ## headings and bullet points.`,
    'keyword-research': `You are an SEO keyword expert. Analyze ${url} and provide: Primary Keywords (10), Long-tail Opportunities (10), Content Gap Keywords, Local SEO keywords, and a Quick Action Plan.`,
    'meta-generator': `You are an SEO meta tag expert. For ${url}, generate optimized Title Tags, Meta Descriptions, OG Tags, and H1s for the 5 main pages.`,
    'blog-writer': `You are a content marketing expert. For ${url}, create an SEO blog post outline with title, target keyword, meta description, full outline with H2s/H3s, sample introduction, and 3 CTA ideas.`,
    'ad-copy': `You are a performance marketing expert. For ${url}, write Google Search Ads (3 variations), Facebook/Instagram Ads (2 variations), and LinkedIn Ad (1 variation).`,
    'social-posts': `You are a social media expert. For ${url}, create a full 7-day social media content calendar with captions and hashtags for each day.`,
    'competitor': `You are a competitive analyst. For ${url}, provide: Brand Positioning, 5 Likely Competitors, Competitive Advantages, Content Gaps, SWOT Analysis, and Differentiation Strategy.`,
    'backlinks': `You are an SEO backlink expert. For ${url}, provide: Estimated DA, Backlink Profile Assessment, 5 Guest Post Targets, Directory Listings, a Outreach Email Template, and a Month-1 Action Plan.`,
  };

  const prompt = prompts[tool] || prompts['seo-audit'];

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const errData = await anthropicRes.json().catch(() => ({}));
      console.error('Anthropic error:', errData);
      return res.status(anthropicRes.status).json({
        error: `API error ${anthropicRes.status}: ${errData?.error?.message || 'Unknown error'}`,
      });
    }

    const data = await anthropicRes.json();
    const result = data.content?.[0]?.text || 'No response generated.';
    return res.status(200).json({ result });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
