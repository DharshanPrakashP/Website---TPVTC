// Netlify function to proxy TruckersMP API requests
export async function handler(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    // Fetch data from TruckersMP API
    const response = await fetch('https://api.truckersmp.com/v2/vtc/73933/members', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Tamil-Pasanga-VTC-Website/1.0',
      },
    })

    if (!response.ok) {
      throw new Error(`TruckersMP API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.error('Error fetching from TruckersMP API:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch team members',
        message: error.message 
      }),
    }
  }
}