/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt=require('bcrypt'); 
var settings = sails.config;
module.exports = {
	'signin':function(req,res){
		req.session.lastPage = 'signin';
		res.view({
			title:'Login'
		});
	},
	'signup':function(req,res){
		req.session.lastPage = 'signup';
		res.view({
			title:'Register'
		});
	},//
	create: function(req, res, next) {
    // To prevent users from directly accessing this page through the URL
    if (req.session.lastPage != 'signup') {
      return res.redirect('500');
    } else {
      //var params = req.params.all();//!!!it is not safe in this way
     // sails.log.debug(req.session.uid);
        var userObj={
          id:req.session.uid,
          firstName:req.param('firstName'),
          lastName:req.param('lastName'),
          email:req.param('email'),
          password:req.param('password'),
          comfirmation:req.param('comfirmation'),
          cas_login: false,
          admin: false
        };
    //  params['registered'] = true;
      User.findOneByEmail({email:userObj.email},function(err,user){
      	if(user){
      		FlashService.error(req,"Your email has been registered")
      	}else{
      		User.create(userObj, function userCreated(err, user) {
        if (err) {
          sails.log.debug('Error occurred: ' + err);
          FlashService.error(req, "Please fill in all fields and make sure your email address is correct");
          return res.redirect('/signup');
        } 
        else{
        	SessionService.createSession(req,user);
        	return res.redirect('/similarcourse/display');//!!!!!!!!be remember the route format!!! you need to do it by yourself
        }
      });
      	}
      })  
    }
  },
	show:function(req,res){
		User.findOne(req.param('id'))
        .populate("majorid")
        .exec(function(err,user){
			if(err) sails.log.debug(err);
			if(err || !user) return res.redirect('404');
			return res.view({
        title: 'User Information',
        user: user
      });
		});
	},
	 edit: function(req, res, next) {
    // Find the user from the id passed in via params
    if (req.session.user && !req.session.user.admin && req.session.user.id != req.param('id')) {
      sails.log.error("Attempt to access administrative action by " + req.session.user.id);
      return res.redirect('/user/edit/' + req.session.user.id);
    } else {
      User.findOne(req.param('id'))
          .populate('majorid')
          .exec(function (err, user) {
            Major.find({sort:'majorName ASC'})
                  .exec(function(err, majors){
              if (err) sails.log.debug(err);
              if (err || !user) return res.redirect('404');
              sails.log.debug(user.majorid)
              return res.view({ user: user, title: 'Edit',majors:majors });
        })
      });
    }
  },
  	update:function(req,res,next){
  		User.update({id:req.param('id')},{email:req.param('email'),firstName:req.param('firstName'),lastName:req.param('lastName'), majorid:req.param("majorid")},function(err,user){
			if(err){
				sails.log.debug(err);
				sails.log.debug(req.param('majorid'));
				sails.log.debug(req.params.all());
        FlashService.error(req, 'Sorry, this email has been taken');
				return res.redirect('/user/edit/'+req.param('id'));//it can not be /user/edit/req.param('id')
			};
			FlashService.success(req, 'Successfully updated user profile');
			res.redirect('/user/show/'+req.param('id'));
		})
  	},
    dev_login: function(req,res,next){
      if(req.session.lastPage != 'signin')
      {
        return res.redirect('/signin')
      }
      else{
        if(!req.param('email') || !req.param('password')){
        FlashService.error(req,'Please enter your email and password');
        return res.redirect('/signin');
        //here i forget to return
        }else{
        User.findOneByEmail(req.param('email'),function(err,user){
          if(err) return next(err);
          if(!user) {
            FlashService.error(req,'This account does not exists!');
            return res.redirect('/signin');
          }else{
            bcrypt.compare(req.param('password'),user.encryptedPassword,function(err,valid){//it return two parameters
              if(err) return next(err);
              if(!valid){
                FlashService.error(req,'Your password is not correct!')
                res.redirect('/signin');
              }else{
                FlashService.success(req, 'Bypassed login!');
                SessionService.createSession(req, user);
                if(req.session.user.admin){res.redirect('/admin/manage_users')}else{
                res.redirect('/similarcourse/display/');//we want to store user's information in the session
                  };
               }
              })
            }
          })
        }
      }
    },

  	login:function(req,res,next){
  	if (settings.env != 'production'&& settings.bypassLogin) { 
        res.redirect('/signin')
    }
  else{
    if (req.session.authenticated) return res.redirect('/dashboard');
    return res.redirect(AuthService.loginRoute({}));
    }
	},

	logout:function(req,res){
    if (req.session.user.cas_login == true){
      return SessionService.destroySession(req, res);
    }else{
      req.session.user = null;
      req.session.authenticated = false;
      return res.redirect('/');
    } 
	},
	// Delete a user
	destroy: function(req, res, next) {
    User.findOne(req.param('id'), function (err, user) {
      if (err) sails.log.debug(err);
      if (err || !user) return res.redirect('404');
      User.destroy(req.param('id'), function userDestroyed(err,user) {
        if (err) return next(err);
      });

      return res.redirect('/admin/manage_users');
    });
  },
  // Switches an admin to a regular user or vice versa
  switch: function(req, res) {
    sails.log.debug(req.params.all());
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) sails.log.debug(err);
      if (err || !user) return res.redirect('404');

      if (user.admin) {
        user.admin = false;
      } else {
        user.admin = true;
      }

      User.update({email:user.email},user,function (err,user) {
        if (err) {
          FlashService.error(req, 'Error while switching user role');
        } else {
          FlashService.success(req, 'Successfully switched user role');
        }
        return res.redirect('/admin/manage_users');
      });
    });
  },
    validate: function(req, res, next) {
    var ticket = req.param('ticket');
    var request = require('request');

    // If a ticket was retrieved from CAS, process and verify it
    if (ticket) {
      sails.log.debug('CAS ticket issued: ' + ticket);
      AuthService.validate(AuthService.validateRoute({ticket: ticket}), function(err, uid) {
        sails.log.debug('User authenticating...: ' + uid);
        // Check to see if user exists in our database
        User.findOne({where: {id: uid}}, function foundUser(err, user) {
          // If user already exists, continue to dashboard
          if (user) {  //&& user.registered
            SessionService.createSession(req, user);
            sails.log(user)
            return res.redirect('/similarcourse/display');
          }

          // If not, create one and go to dashboard
          if (!user ) {  //|| !user.registered
          var user={
          id:uid,
          firstName:'your_firstName',
          lastName:'your_lastName',
          email:'your_email'+uid+'@berkeley.edu',
          cas_login:true,
          majorid:0,
          admin: false
          };
          User.create(user, function userCreated(err, user) {
          if (err) {
            sails.log.debug('Error occurred: ' + err);
            FlashService.error(req, "There are some errors when you login");
            return res.redirect(AuthService.loginRoute({}));
            } 
          else{
            SessionService.createSession(req,user);
            return res.redirect('/similarcourse/display');//!!!!!!!!be remember the route format!!! you need to do it by yourself
            }
          });
          }
        });
      });
    } else {
      sails.log.debug('No ticket was found - redirecting to login again');
      return res.redirect(AuthService.loginRoute({}));
    }
  },
  getpaper: function(req,res,next){
    res.sendfile('../assets/askOski.pdf');
  } 
	
};

