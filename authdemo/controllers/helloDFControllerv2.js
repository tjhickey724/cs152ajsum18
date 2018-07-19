/*
* HTTP Cloud Function.
*
* @param {Object} req Cloud Function request context.
* @param {Object} res Cloud Function response context.
*/
//const functions = require('firebase-functions')
const { dialogflow } = require('actions-on-google')

const df = dialogflow(); // this is middleware


df.intent('Default Welcome Intent', (conv) => {
  conv.ask('Welcome to number echo! Say a number.');
});

df.intent('Name', (conv) => {
  console.log('inside Name')
  console.dir(conv)
  conv.ask('My name is DF test');
});

df.intent('Input Number', (conv, {num}) => {
  // extract the num parameter as a local string variable
  conv.close(`You said ${num}`);
});

exports.respondToDF = df

const v2Response =
{
  "fulfillmentText": "This is a text response",
  "fulfillmentMessages": [
    {
      "card": {
        "title": "card title",
        "subtitle": "card text",
        "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
        "buttons": [
          {
            "text": "button text",
            "postback": "https://assistant.google.com/"
          }
        ]
      }
    }
  ],
  "source": "example.com",
  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": "this is a simple response"
            }
          }
        ]
      }
    },
    "facebook": {
      "text": "Hello, Facebook!"
    },
    "slack": {
      "text": "This is a text response for Slack."
    }
  },
  "outputContexts": [
    {
      "name": "projects/${PROJECT_ID}/agent/sessions/${SESSION_ID}/contexts/context name",
      "lifespanCount": 5,
      "parameters": {
        "param": "param value"
      }
    }
  ],
  "followupEventInput": {
    "name": "event name",
    "languageCode": "en-US",
    "parameters": {
      "param": "param value"
    }
  }
};
