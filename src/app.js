const { accounts, users, writeJSON } = require('./data')
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const accountRoutes = require('./routes/accounts')
const servicesRoutes = require('./routes/services')

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended:true }))

app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts: accounts,}) )
app.use('/account', accountRoutes)
app.use('/services', servicesRoutes)

app.get('/profile', (req, res) =>  res.render('profile', { user: users[0] }))

app.listen(port, () => console.log(`PS Project Running on port ${port}!`))