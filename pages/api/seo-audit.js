// pages/api/seo-audit.js
// This runs on Vercel's servers (not the browser), so ANTHROPIC_API_KEY is safe here.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, tool } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Website URL is required.' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY is not set. Please add it in Vercel → Settings → Environment Variables.',
    });
  }

  const prompts = {
    'seo-audit': `You are an expert SEO analyst with 15 years of experience. Perform a thorough SEO audit for: ${url}

Provide a detailed, actionable report covering:

## 🎯 Overall SEO Score
Give a score out of 100 with a brief verdict.

## ⚙️ Technical SEO
- Page speed & Core Web Vitals (estimated)
- Mobile-friendliness
- HTTPS & security
- XML sitemap & robots.txt
- Crawlability issues

## 📝 On-Page SEO
- Title tag quality
- Meta descriptions
- Header tag structure (H1, H2, H3)
- Keyword usage & density
- Image alt text

## 📄 Content Quality
- Readability & depth
- Content uniqueness
- E-E-A-T signals

## 🔗 Backlink Profile
- Estimated domain authority
- Link building opportunities

## 🚀 Quick Wins (Top 3 Priority Fixes)
Number these clearly — what to fix first for fastest impact.

## 📈 Long-Term Strategy
3–5 strategic recommendations for sustainable growth.

Be specific and actionable. Format cleanly with emojis for section headers.`,

    'keyword-research': `You are an SEO keyword research expert. Analyze the website ${url} and suggest a comprehensive keyword strategy.

## Primary Keywords (High Intent)
List 10 high-value keywords with estimated search volume and competition level.

## Long-tail Opportunities
List 10 specific long-tail keywords that are easier to rank for.

## Content Gap Keywords
Keywords competitors likely rank for that this site should target.

## Local SEO Keywords (if applicable)
Location-based opportunities.

## Quick Action Plan
Top 5 keywords to target immediately and why.`,

    'meta-generator': `You are an SEO meta tag expert. Analyze the website ${url} and generate optimized meta tags.

For each of the main 5 pages (Home, About, Services, Blog, Contact — adapt based on the site type), provide:

**Page: [Page Name]**
- Title Tag (50-60 chars): 
- Meta Description (150-160 chars): 
- OG Title:
- OG Description:
- Suggested H1:

Make them compelling, keyword-rich, and click-worthy.`,

    'blog-writer': `You are a content marketing expert. Based on the website ${url}, create a detailed blog post outline and sample introduction.

## Blog Post Title (SEO-optimized)

## Target Keyword

## Meta Description (150-160 chars)

## Full Outline
With H2s and H3s, estimated word count per section.

## Sample Introduction (150 words)
Engaging, hooks the reader, includes the target keyword naturally.

## Call to Action Ideas
3 CTAs that align with the site's goals.`,

    'ad-copy': `You are a performance marketing expert. Analyze ${url} and create ad copy for multiple platforms.

## Google Search Ads (3 variations)
Each with Headline 1, Headline 2, Headline 3, Description 1, Description 2

## Facebook/Instagram Ads (2 variations)
Primary text, headline, description, CTA button

## LinkedIn Ads (1 variation, B2B focused)
Introductory text, headline, description

## Key Value Propositions Identified
List the main selling points from the website.`,

    'social-posts': `You are a social media marketing expert. Based on ${url}, create a 1-week social media content calendar.

## Monday – Awareness Post
Platform: [LinkedIn/Instagram/Twitter/X]
Caption + hashtags

## Tuesday – Educational Content
## Wednesday – Engagement/Question
## Thursday – Product/Service Highlight
## Friday – Social Proof/Testimonial style
## Saturday – Behind the Scenes / Casual
## Sunday – Inspiration / Week Ahead

For each: write the full caption, emoji usage, and 5–8 relevant hashtags.`,

    'competitor': `You are a competitive intelligence analyst. Based on the website ${url}, conduct a competitor analysis.

## Brand Positioning Assessment
How this brand is currently positioned.

## Likely Direct Competitors
Name 5 probable competitors in this space with reasoning.

## Competitive Advantages to Leverage
What unique angles this site could own.

## Content Strategy Gaps
Topics and formats competitors likely cover that this site should too.

## SWOT Analysis
Strengths, Weaknesses, Opportunities, Threats.

## Differentiation Strategy
3 specific ways to stand out from competitors.`,

    'backlinks': `You are an SEO backlink analyst. Evaluate the backlink strategy for ${url}.

## Estimated Domain Authority
Give an estimated DA range and reasoning based on the site type and age.

## Current Backlink Profile Assessment
What types of backlinks this site likely has based on its niche.

## High-Value Link Opportunities
- Guest posting targets (5 sites)
- Directory listings to pursue
- Resource page opportunities
- Partnership link opportunities

## Outreach Templates
A ready-to-send guest post outreach email template.

## Link Building Action Plan
Week-by-week plan for the first month.`,
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
        model: 'claude-opus-4-5-20251101',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const errData = await anthropicRes.json().catch(() => ({}));
      console.error('Anthropic error:', errData);
      return res.status(anthropicRes.status).json({
        error: errData?.error?.message || 'Anthropic API returned an error.',
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
