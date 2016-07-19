module.exports = {
  success: function(req, message) {
    req.session.messages['success'].push(message);
  },
  warning: function(req, message) { 
    req.session.messages['warning'].push(message);
  },
  error: function(req, message) {
    req.session.messages['error'].push(message);// because here we use req, we need to use req as a parameter
  }
}
