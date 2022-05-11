// middleware to test is the user is logged in, and if not, send them to the login page
const isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    }
    else res.redirect('/login')
  }

module.exports = { isLoggedIn };