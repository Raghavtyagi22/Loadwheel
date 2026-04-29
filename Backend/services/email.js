const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const send = (to, subject, html) =>
  transporter.sendMail({ from: `LoadWheel <${process.env.EMAIL_USER}>`, to, subject, html })

const emailTemplates = {
  welcome: (name) => ({
    subject: 'Welcome to LoadWheel! 🚚',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:16px">
        <div style="background:#2563eb;padding:24px;border-radius:12px;text-align:center;margin-bottom:24px">
          <h1 style="color:white;margin:0;font-size:28px">🚚 LoadWheel</h1>
        </div>
        <h2 style="color:#1e293b">Welcome, ${name}! 👋</h2>
        <p style="color:#475569">Your account has been created successfully. You can now book trucks, track deliveries and manage shipments.</p>
        <a href="http://localhost:3000/book" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:16px">Book a Truck</a>
        <p style="color:#94a3b8;font-size:12px;margin-top:32px">© 2024 LoadWheel Technologies</p>
      </div>`
  }),

  bookingConfirmed: (name, booking) => ({
    subject: `Booking Confirmed — ${booking.source} → ${booking.destination} 📦`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:16px">
        <div style="background:#2563eb;padding:24px;border-radius:12px;text-align:center;margin-bottom:24px">
          <h1 style="color:white;margin:0;font-size:28px">🚚 LoadWheel</h1>
        </div>
        <h2 style="color:#1e293b">Booking Confirmed! ✅</h2>
        <p style="color:#475569">Hi ${name}, your booking has been confirmed and payment received.</p>
        <div style="background:white;border-radius:12px;padding:20px;margin:20px 0;border:1px solid #e2e8f0">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#64748b">From</td><td style="padding:8px 0;font-weight:bold;color:#1e293b">${booking.source}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">To</td><td style="padding:8px 0;font-weight:bold;color:#1e293b">${booking.destination}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Distance</td><td style="padding:8px 0;font-weight:bold;color:#1e293b">${booking.distance} km</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Amount Paid</td><td style="padding:8px 0;font-weight:bold;color:#2563eb">₹${booking.price}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Payment ID</td><td style="padding:8px 0;font-weight:bold;color:#1e293b">${booking.paymentId}</td></tr>
          </table>
        </div>
        <a href="http://localhost:3000/tracking/${booking._id}" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Track Your Shipment</a>
        <p style="color:#94a3b8;font-size:12px;margin-top:32px">© 2024 LoadWheel Technologies</p>
      </div>`
  }),

  driverNewBooking: (driverName, booking) => ({
    subject: `New Booking Assigned — ${booking.source} → ${booking.destination} 🚚`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:16px">
        <div style="background:#2563eb;padding:24px;border-radius:12px;text-align:center;margin-bottom:24px">
          <h1 style="color:white;margin:0;font-size:28px">🚚 LoadWheel</h1>
        </div>
        <h2 style="color:#1e293b">New Booking Assigned! 📋</h2>
        <p style="color:#475569">Hi ${driverName}, you have a new delivery assigned to you.</p>
        <div style="background:white;border-radius:12px;padding:20px;margin:20px 0;border:1px solid #e2e8f0">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#64748b">Pickup</td><td style="padding:8px 0;font-weight:bold;color:#1e293b">${booking.source}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Delivery</td><td style="padding:8px 0;font-weight:bold;color:#1e293b">${booking.destination}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Distance</td><td style="padding:8px 0;font-weight:bold;color:#1e293b">${booking.distance} km</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Goods</td><td style="padding:8px 0;font-weight:bold;color:#1e293b">${booking.goodsType || 'N/A'}</td></tr>
          </table>
        </div>
        <a href="http://localhost:3000/driver" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Open Driver Panel</a>
        <p style="color:#94a3b8;font-size:12px;margin-top:32px">© 2024 LoadWheel Technologies</p>
      </div>`
  }),

  statusUpdate: (name, booking) => ({
    subject: `Shipment ${booking.status} — ${booking.source} → ${booking.destination}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:16px">
        <div style="background:#2563eb;padding:24px;border-radius:12px;text-align:center;margin-bottom:24px">
          <h1 style="color:white;margin:0;font-size:28px">🚚 LoadWheel</h1>
        </div>
        <h2 style="color:#1e293b">Shipment Update ${booking.status === 'Delivered' ? '✅' : '🚚'}</h2>
        <p style="color:#475569">Hi ${name}, your shipment status has been updated to <strong>${booking.status}</strong>.</p>
        <div style="background:white;border-radius:12px;padding:20px;margin:20px 0;border:1px solid #e2e8f0">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#64748b">Route</td><td style="padding:8px 0;font-weight:bold;color:#1e293b">${booking.source} → ${booking.destination}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Status</td><td style="padding:8px 0;font-weight:bold;color:#2563eb">${booking.status}</td></tr>
          </table>
        </div>
        ${booking.status !== 'Delivered' ? `<a href="http://localhost:3000/tracking/${booking._id}" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Track Shipment</a>` : '<p style="color:#16a34a;font-weight:bold">Your shipment has been delivered successfully! 🎉</p>'}
        <p style="color:#94a3b8;font-size:12px;margin-top:32px">© 2024 LoadWheel Technologies</p>
      </div>`
  })
}

exports.sendWelcome = (user) => {
  const { subject, html } = emailTemplates.welcome(user.name)
  return send(user.email, subject, html)
}

exports.sendBookingConfirmed = (user, booking) => {
  const { subject, html } = emailTemplates.bookingConfirmed(user.name, booking)
  return send(user.email, subject, html)
}

exports.sendDriverNewBooking = (driver, booking) => {
  const { subject, html } = emailTemplates.driverNewBooking(driver.name, booking)
  return send(driver.email, subject, html)
}

exports.sendStatusUpdate = (user, booking) => {
  const { subject, html } = emailTemplates.statusUpdate(user.name, booking)
  return send(user.email, subject, html)
}
