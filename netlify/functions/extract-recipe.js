// Netlify Function - Claude API Proxy
// Path: netlify/functions/extract-recipe.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { text, image, apiKey, sourceType } = JSON.parse(event.body);

    if (!apiKey) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Missing API key' })
      };
    }

    if (!text && !image) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Missing text or image' })
      };
    }

    // Build content based on input type
    let messageContent;
    
    if (image) {
      // Image input - use vision
      messageContent = [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: image.mediaType || 'image/jpeg',
            data: image.data
          }
        },
        {
          type: 'text',
          text: `Extract the recipe from this image and return ONLY valid JSON with this exact structure (no markdown, no explanation):

{
  "name": "Recipe Name",
  "cuisine": "Cuisine Type",
  "dishType": "Main Course/Appetizer/etc",
  "cookingMethod": "Baking/Frying/etc",
  "prepTime": 15,
  "cookTime": 30,
  "servings": 4,
  "tags": ["tag1", "tag2"],
  "folders": ["folder1"],
  "ingredients": [
    {"item": "ingredient name", "amount": 1, "unit": "cup", "category": "fresh"}
  ],
  "steps": [
    {"step": 1, "instruction": "Do this", "duration": 5}
  ],
  "nutrition": {"calories": 400, "protein": 25},
  "costRating": "medium",
  "notes": "Any notes"
}

IMPORTANT RULES FOR INGREDIENTS:
- Consolidate duplicate ingredients (e.g., "water for sauce" + "water for pickling" = "water")
- Remove usage descriptors like "for X", "for the Y" - just use the base ingredient name
- If same ingredient appears multiple times with different amounts, add them together
- Convert to the same unit when consolidating if possible (e.g., all water in ml or cups)
- Keep the ingredient list clean and minimal`
        }
      ];
    } else {
      // Text input (bookmarklet or PDF)
      messageContent = `Extract the recipe from this text and return ONLY valid JSON with this exact structure (no markdown, no explanation):

{
  "name": "Recipe Name",
  "cuisine": "Cuisine Type",
  "dishType": "Main Course/Appetizer/etc",
  "cookingMethod": "Baking/Frying/etc",
  "prepTime": 15,
  "cookTime": 30,
  "servings": 4,
  "tags": ["tag1", "tag2"],
  "folders": ["folder1"],
  "ingredients": [
    {"item": "ingredient name", "amount": 1, "unit": "cup", "category": "fresh"}
  ],
  "steps": [
    {"step": 1, "instruction": "Do this", "duration": 5}
  ],
  "nutrition": {"calories": 400, "protein": 25},
  "costRating": "medium",
  "notes": "Any notes"
}

IMPORTANT RULES FOR INGREDIENTS:
- Consolidate duplicate ingredients (e.g., "water for sauce" + "water for pickling" = "water")
- Remove usage descriptors like "for X", "for the Y" - just use the base ingredient name
- If same ingredient appears multiple times with different amounts, add them together
- Convert to the same unit when consolidating if possible (e.g., all water in ml or cups)
- Keep the ingredient list clean and minimal

Recipe text:
${text}`;
    }

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: messageContent
        }]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: `API Error: ${error}` })
      };
    }

    const data = await response.json();
    let content = data.content[0].text;
    
    // Strip markdown code fences and any surrounding text
    // Try to extract JSON from between ``` markers first
    const codeBlockMatch = content.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (codeBlockMatch) {
      content = codeBlockMatch[1];
    } else {
      // If no code blocks, strip any ``` markers and trim
      content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    }
    
    // Parse the JSON response
    let recipe;
    try {
      recipe = JSON.parse(content);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Content that failed to parse:', content.substring(0, 500));
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Failed to parse recipe data. The AI response was not valid JSON.',
          details: parseError.message
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ recipe })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
