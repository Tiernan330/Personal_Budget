const Envelope = require('../models/envelope')
const {calculateBudget} = require('../tools.js')

GetBudget = async (req, res) => {
    await Envelope.find({}, (err, envelope) => {
      console.log(envelope);
      
      if (err) {
        return res.status(400).json({ success: false, error: err })
      }
      if (!envelope.length) {
        return res
          .status(404)
          .json({ success: false, error: `Envelope not found` })
      }
      let sum = calculateBudget(envelope);
      console.log(sum)
      return res.status(200).json({ success: true, data: sum })
    }).catch(err => console.log(err))
  }
    module.exports = {GetBudget}