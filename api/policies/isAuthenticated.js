/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller

    var ismyfile=(req.session.user.id===req.param('id'));
	var isadmin=req.session.user.admin;
	if(ismyfile || isadmin ){ next();}else{
	var requireaccessError = 'You are not allowed to access';
	req.session.messages = { error: [requireAdminError] };
		return res.redirect('/signin');//I forget return
	}

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)

};
