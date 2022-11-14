const Envelope = require('h:/Coding/Project/Personal Budget/models/envelope')
let totalBudget = 0;

UpdateEnvelope = async (res, body, id) => {
    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'You must provide an envelope',
      })
    }

    Envelope.findOneAndUpdate({_id: id}, {$set:{category: body.category, cost:body.cost}},
        {new:true},(err, data)=>{
            if (err) {
                return res.status(400).json({ success: false, error: err })
              }
              if (!data) {
                return res
                  .status(404)
                  .json({ success: false, error: `Update not found` })
              }
        }).catch(err => console.log(err))

  }





function calculateBudget(envelopes){
    let sum = 0;
    envelopes.forEach(envelope => {sum += envelope.cost;});
    totalBudget = sum;
    return totalBudget;
}

function addcost(envelope){
    totalBudget += envelope.cost;
    console.log(totalBudget);
}

module.exports = {
    calculateBudget,
    addcost, 
    UpdateEnvelope,
    totalBudget }