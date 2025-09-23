const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const response = await fetch('https://api.truckersmp.com/v2/vtc/73933/events/attending', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `HTTP error! status: ${response.status}` }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch events' }),
    };
  }
};