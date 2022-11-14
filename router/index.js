const express = require('express')
const getBudget = require('../controller/Budget')
const {PostEnvelopes, GetEnvelopes, GetEnvelopesByID,
     DelEnvelopesByID, UpdateEnvelopesByID, TransferEnvelopesByID} = require('../controller/Envelope')
const router = express.Router()

router.post('/envelopes', (req, res) => { PostEnvelopes(res, req.body) })
router.get('/envelopes', (req, res) => { GetEnvelopes(res) })
router.get('/envelopes/:id', (req, res) => { envelope = GetEnvelopesByID(res, req.params.id) })
router.put('/envelopes/:id/update', (req, res) => { UpdateEnvelopesByID(res, req.body, req.params.id) })
router.put('/envelopes/:from/:to/:amount', (req, res) => { TransferEnvelopesByID(res, req.params.from, req.params.to, req.params.amount) })
router.delete('/envelopes/:id', (req, res) => { DelEnvelopesByID(res, req.params.id) })
router.get('/budget', getBudget.GetBudget)


module.exports = router