const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/messages')
  }
  res.render('login', {})
}

exports.postLogin = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: 'Please enter a valid email address.' })
  }
  if (validator.isEmpty(req.body.password)) {
    validationErrors.push({ msg: 'Password cannot be blank.' })
  }

  if (validationErrors.length) {
    return res.redirect('/login')
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  })

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('error auth')
      return next(err)
    }
    if (!user) {
      console.log('error on user POST login', info)
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }

      res.redirect(req.session.returnTo || '/messages')
    })
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })

  req.session.destroy((err) => {
    if (err) {
      console.log('Error : Failed to destroy the session during logout.', err)
    }
    req.user = null
    res.redirect('/')
  })
}

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/messages')
  }
  res.render('signup', {
    title: 'Create Account',
  })
}

exports.postSignup = async (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: 'Please enter a valid email address.' })
  }
  if (!validator.isLength(req.body.password, { min: 8 })) {
    validationErrors.push({
      msg: 'Password must be at least 8 characters long',
    })
  }
  if (req.body.password !== req.body.confirmPassword) {
    validationErrors.push({ msg: 'Passwords do not match' })
  }

  if (validationErrors.length) {
    console.log('error on POST signup: ', validationErrors)
    return res.redirect('../signup')
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  })

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  })

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err)
      }
      if (existingUser) {
        console.log(
          'Account with that email address or username already exists.'
        )
        req.flash('errors', {
          msg: 'Account with that email address or username already exists.',
        })
        return res.redirect('../signup')
      }
      user.save((err) => {
        if (err) {
          return next(err)
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/messages')
        })
      })
    }
  )
}
