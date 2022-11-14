const Envelope = require('../models/envelope')
const {calculateBudget, UpdateEnvelope} = require('../tools.js')


//-----------------------------------------------------------------------------------------------

function PostEnvelopes(res, body) {
    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'You must provide an envelope',
      })
    }
    const envelope = new Envelope(body)
    
    if (!envelope) { return res.status(400).json({ success: false, error: err }) }
  
    envelope
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: envelope._id,
          message: 'Envelope post created!',
        })
      })
      .catch(error => {
        return res.status(400).json({
          error,
          message: 'Envelope post not created!',
        })
      })
  }

//-----------------------------------------------------------------------------------------------

  function GetEnvelopes(res) {
      Envelope.find({}, (err, envelope) => {
      let sum = calculateBudget(envelope);

      if (err) { return res.status(400).json({ success: false, error: err }) }
      if (!envelope.length) {
        return res
          .status(404)
          .json({ success: false, error: `Envelope not found` })
      }
      return res.status(200).json({ success: true, data: envelope })
    }).clone().catch(err => console.log(err))
  }

//-----------------------------------------------------------------------------------------------

  function GetEnvelopesByID(res, id) {
    Envelope.find({_id: id}, (err, envelope) => {
      if (err) { return res.status(400).json({ success: false, error: err }) }
      if (!envelope.length) {
        return res
          .status(404)
          .json({ success: false, error: `Envelope not found` })
      }
      return res.status(200).json({ success: true, data: envelope })
    }).catch(err => console.log(err))
  }

//-----------------------------------------------------------------------------------------------

  function DelEnvelopesByID(res, id) {
    Envelope.deleteOne({"_id": id}, (err, envelope) => {
      if (err) { return res.status(400).json({ success: false, error: err }) }
      if (!envelope.length) {
        return res
        .status(200)
        .json({ success: true, error: `Envelope deleted` })
      }
      return res.status(400).json({ success: false, data: envelope })
    }).catch(err => console.log(err))
  }

//-----------------------------------------------------------------------------------------------

  function UpdateEnvelopesByID(res, envelope, id) {
    if (!envelope) {
      return res.status(400).json({
        success: false,
        error: 'You must provide an envelope',
      })
    }
  
    if (!envelope) { return res.status(400).json({ success: false, error: err })}

    Envelope.findOneAndUpdate({_id: id}, {$set:{category: envelope.category, cost:envelope.cost}},
        {new:true},(err, data)=>{
            if (err) { return res.status(400).json({ success: false, error: err })}
            if (!data) {
              return res
                .status(404)
                .json({ success: false, error: `Update not found` })
            }
            console.log(res.status(200).json({ success: true, data: envelope }));
        }).catch(err => console.log(err))

  }

//-----------------------------------------------------------------------------------------------

TransferEnvelopesByID = async (res, from, to, amount) => {
    if (!from || !to || !amount) {
      return res.status(400).json({
        success: false,
        error: 'One field is empty',
      })
    }

    let FromEnvelope = await Envelope.findOne({_id: from});
    let ToEnvelope = await Envelope.findOne({_id: to});
    FromEnvelope.cost = parseInt(FromEnvelope.cost) - parseInt(amount);
    ToEnvelope.cost = parseInt(ToEnvelope.cost) + parseInt(amount);

    UpdateEnvelope(res,FromEnvelope, from )
    UpdateEnvelope(res,ToEnvelope, to )

    FromEnvelope = await Envelope.findOne({_id: from});
    ToEnvelope = await Envelope.findOne({_id: to});
    return res.status(200).json({ success: true, to: ToEnvelope, from: FromEnvelope })
  }



module.exports = {
    PostEnvelopes,
    GetEnvelopes, 
    GetEnvelopesByID,
    DelEnvelopesByID,
    UpdateEnvelopesByID,
    TransferEnvelopesByID}

