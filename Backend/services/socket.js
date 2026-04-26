const jwt = require('jsonwebtoken')

module.exports = (io) => {
  // Auth middleware for sockets
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token
    if (!token) return next(new Error('Authentication required'))
    try {
      socket.user = jwt.verify(token, process.env.JWT_SECRET)
      next()
    } catch {
      next(new Error('Invalid token'))
    }
  })

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.user.id} (${socket.user.role})`)

    // Join a booking room
    socket.on('join-booking', (bookingId) => {
      socket.join(`booking:${bookingId}`)
    })

    // Driver broadcasts location → all in booking room receive it
    socket.on('driver-location', ({ bookingId, lat, lng }) => {
      io.to(`booking:${bookingId}`).emit('driver-location', { lat, lng })
    })

    // Chat message within a booking room
    socket.on('chat-message', ({ bookingId, text }) => {
      const msg = {
        text,
        sender: socket.user.role === 'driver' ? 'Driver' : 'Customer',
        time: new Date().toLocaleTimeString()
      }
      socket.to(`booking:${bookingId}`).emit('chat-message', msg)
    })

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.user.id}`)
    })
  })
}
