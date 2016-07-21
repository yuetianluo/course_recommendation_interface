/**
 * DepartmentController
 *
 * @description :: Server-side logic for managing departments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function(req,res){
		res.view({
			title:'Department'
		});
	},
	create:function(req,res,next){////////!!!!!!!!!!!!!!!!!!!!!the problem is the policy 'getOnly'
		sails.log.debug(req.param('departmentName'));
		Department.findOneByDepartmentName({departmentName:req.param('departmentName')},function(err,department){
      	if(department){
      		FlashService.error(req,"This department already exists.")
      		return res.redirect('/department/new');
      	}else{
      		sails.log.debug(req.param('departmentName'));
      		Department.create(req.params.all(), function (err, department) {// here I forget 's' after the param
        if (err) {
          sails.log.debug('Error occurred: ' + err);
          FlashService.error(req, "There is some problem when you create the department");
          return res.redirect('/department/new');
        } /*else {
          EncryptionService.importPublicKey(user, function(success) {
            if (!success) {
              User.destroy(user.id, function(err) {
                FlashService.error(req, "Invalid GPG key - please enter a valid GPG key/id pair.");
                return res.redirect('/signup');
              });
            } else {
              SessionService.createSession(req, user);
              return res.redirect('/dashboard');
            }
          });
        }*/
        else{
        	sails.log.debug(department);
        	return res.redirect('/department/manage_departments');//!!!!!!!!be remember the route format!!! you need to do it by yourself
        }
      });
      	}
      })  
	},
	manage_departments:function(req,res){
		Department.find(function (err, departments) {
      return res.view({ title: 'Department Management', departments: departments });
    });
	}
	
};

