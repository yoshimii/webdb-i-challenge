const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();


// Get an account
router.get('/', async (req, res) => {
    const [err, accounts] = await withCatch( db("accounts") )
    
    if (err) res.status(500).json(err)
    else if (!accounts.length) res.status(404).send("There are no accounts stored in the database yet")
    else res.status(200).json(accounts)
})

// Get an account by id
router.get('/:id', async (req, res) => {
    const [err, account] = await withCatch(
        db('accounts')
        .where('id', req.params.id)
    )
    // The db never rejects if it can't find a particular id. It just resolves with an empty ojbect.
    // That's why we're checking for an empty object.
    console.log('ACCOUNT', account)
    if (err || isEmptyObj(account)) res.status(500).json({error: "Account with specified ID does not exist"})
    else res.status(200).json(account)
})

// Create a post
router.post("/", async (req, res) => {
    const [err, account] = await withCatch(
        db('accounts')
        .insert(req.body)
        .then(_ => req.body)
    )
    
    if (err) res.status(500).json(err)
    else res.status(201).json(account)
})

// Update an account
router.put('/:id', async (req, res) => {
    const [err, accounts] = await withCatch(
        db('accounts')
        .update(req.body)
        .where({ id: req.params.id})
    )

    if (err) res.status(500).json(err)
    else res.status(200).json(accounts)
})

//Delete an account
router.delete('/:id', async (req, res) => {
    const [err, count] = await withCatch(
        db('accounts')
        .where('id', req.params.id)
        .delete()
    )

    if (err) res.status(500).json(err)
    else res.status(200).json({deleted: count + " account with the id of " + req.params.id })
})


/**
 * Helpers
 */

function withCatch(promise) {
    return promise
            .then(data => [null, data])
            .catch(err => [err])
}

function isEmptyObj(obj) {
    return !Object.keys(obj).length
}

module.exports = router;