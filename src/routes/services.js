const express = require('express')
const router = express.Router()
const { accounts, writeJSON } = require('../data')

router.get('/transfer', (req, res) => res.render('transfer') )
router.post('/transfer', (req, res) => {
    const from = req.body.from
    const to = req.body.to
    const amount = parseInt(req.body.amount)

    const fromBalance = accounts[from].balance
    const newBalance = fromBalance - amount
    accounts[from].balance = newBalance

    const toBalance = accounts[to].balance
    accounts[to].balance = toBalance + amount

    writeJSON()

    res.render('transfer', { message: 'Transfer Completed'} )
} )

router.get('/payment', (req, res) => { res.render('payment', {account: accounts.credit}) })
router.post('/payment', (req, res) => {
    const amount = parseInt(req.body.amount)
    accounts["credit"].balance = accounts["credit"].balance - amount
    accounts["credit"].available = accounts["credit"].available + amount

    writeJSON()

    res.render('payment', { message: "Payment Successful", account: accounts.credit })
})

module.exports = router