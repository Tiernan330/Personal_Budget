# Personal Budget (Portfolio)

A Node.js and Express application to manage your personal budget using MongoDB via the use of Envelope Budgeting method.

---
## Introduction

Personal implementation of the Personal Budget project by Codeacademy. Provides an API that allow users to manage budget envelopes and track the balance of each envelope.

## Technologies
* Javascript
* Node.js
* MongoDB
* Express.js
* VS Code

## APIs

- `/envelopes`
    - GET `/envelopes` to get array of envelopes
    - GET `/envelopes/:id` to a single envelope instance based on the envelope `id`.
    - POST `/envelopes` to create a new instance of envelopes
    - PUT `/envelopes/"id/update` to update an existing envelope
    - DELETE `/envelopes/:id` to delete a single envelope by id.
    - PUT `/envelopes/:from/:to/:amount` to transfer a budget value `amount` from the envelope `fromId` to envelope `toId`
- `/budget`
    - GET `/budget` to get the total budget of all envelopes

## Schema

Data representation of an envelope instance is based on JSON as shown below

```json
{
    "category": "Groceries",
    "cost": 150
}
```
