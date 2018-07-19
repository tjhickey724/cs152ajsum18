/*
* HTTP Cloud Function.
*
* @param {Object} req Cloud Function request context.
* @param {Object} res Cloud Function response context.
*/



exports.respondToDF =  (req, res) => {
  console.dir(req.body)

  let response = "Could you repeat that?"
  const intent = req.body.queryResult.intent;
  const parameters = req.body.queryResult.parameters;
  switch (req.body.queryResult.intent.displayName) {
    case "name": response = "My name is Al"; break;
    case "languages": response = "Nihongo omoshiroii desu ne"; break;
    default: response = "Huh?";
  }

  res.json({fulfillmentText: response});
};
