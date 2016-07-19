/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AdminController)
   */
  _config: {},

  // View to show all users on page
  manage_users: function(req, res) {
    User.find(function foundUsers(err, users) {
      return res.view({ title: 'User Management', users: users });
    });
  },

  
};

