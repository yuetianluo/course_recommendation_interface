/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
schema: true,

  attributes: {  	 
  	/* e.g.
  	nickname: 'string'
  	*/
    id: {
      tyep: 'NUMBER', 
    },
    // Instance variables
    firstName: {
      type: 'STRING',
      //required: true
    },
    lastName: {
      type: 'STRING',
      //required: true
    },
    email: {
    	type: 'STRING',
      unique: false
    },
    /*
    registered: {
      type: 'BOOLEAN',
      defaultsTo: false
    },*/
    admin: {
      type: 'BOOLEAN',
      defaultsTo: false
    }, 
    encryptedPassword:{
    	type:'STRING'
    },
    cas_login:{
      type:'BOOLEAN',
      defaultsTo:true
    },
    majorid:{
      model:'major'
    },
    /*
    requests: {
      collection: 'request',
      via: 'requestingUser'
    },
    analytics: {
      collection: 'analytic',
      via: 'owner'
    },
    starredAnalytics: {
      dominant: true,
      collection: 'analytic',
      via: 'usersWhoStarred'
    },*/

    // Instance methods
    toJSON: function() {
      var obj = this.toObject();
      delete obj._csrf;
      return obj;
    }
  },

  // 'beforeCreate' is a lifecycle callback; essentially, these are hooks that we
  // can tape into to change data
  // See Sails documentation on Models for more info/examples
  beforeCreate: function (values, next) {
    // Comment out if other emails are allowed
    /*User.find().exec(function (err, users) {

      if (err) {
        sails.log('Error occurred while creating user: ' + err);
      }
      // Seed initial user as an admin
      if (!users || users.length == 0) {
        values.admin = true;
      }
      /*
      var matchingBerkeleyEmail = /berkeley.edu$/;
      if (!matchingBerkeleyEmail.test(values.email)) {
        // TODO: Add some new page
        return next("Please use a Berkeley email address.");
      }    //!!!!!!!here we first do not require a berkeley email
      return next();
    });*/
    if (values.cas_login == true){
      return next();
    }//
    if(!values.password||values.password!=values.comfirmation){
      return next({err:("Password doesn't match password confirmation.")});
    };
      require('bcrypt').hash(values.password,10,function passwordEncrypted(err,encryptedPassword){
      if (err) return next(err);
      values.encryptedPassword=encryptedPassword;
      next();
    });

  }
};

