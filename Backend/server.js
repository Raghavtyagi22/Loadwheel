require('dotenv').config()
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/trucks', require('./routes/trucks'))
app.use('/api/bookings', require('./routes/bookings'))
app.use('/api/pricing', require('./routes/pricing'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/payment', require('./routes/payment'))

// Socket.IO
require('./services/socket')(io)

// DB + Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    server.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  })
  .catch((err) => console.error('DB connection failed:', err))
