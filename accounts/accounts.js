const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();


// Get an account
router.get('./', async (req, res) => {
    const [err, accounts] = await withCatch(db("accounts"))
    
    if (err) res.status(500).json(err)
    else res.status(200).json(accounts)
})

// Get an account by id
router.get('./:id', async (req, res) => {
    const [err, account] = await withCatch(
        db('accounts')
        .where('id', req.param.id)
        .get(req.body)
    )
    
    if (err) res.status(500).json(err)
    else res.status(200).json(account)
})

// Create a post
router.post("/", async (req, res) => {
    const [err, account] = await withCatch(
        db('accounts')
        .insert(req.body)
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
    const [err, accounts] = await withCatch(
        db
        .where('id', req.params.id)
        .delete()
    )

    if (err) res.status(500).json(err)
    else res.status(204).json(count)
})

/**
 * Helpers
 */

function withCatch(promise) {    
    return promise
            .then(data => [null, data])
            .catch(err => [err])
}