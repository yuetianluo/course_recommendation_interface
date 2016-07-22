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
        	return res.redirect('/admin/manage_departments');//!!!!!!!!be remember the route format!!! you need to do it by yourself
        }
      });
      	}
      })  
	},
  edit:function(req,res,next){//
      Department.findOne({id:req.param('id')},function(err,department){
         if (err || !department) {
            sails.log.debug(err);
            return FlashService.error(req,"There is some problems to find the department")
          }
        return res.view({ department: department, title: 'Edit' });
      });
  },
  update:function(req,res,next){
        Department.update({id:req.param('id')},req.params.all(),function(err,department){
      if(err){
        sails.log.debug(req.params.all());
        return res.redirect('/department/edit/'+req.param('id'));//it can not be /user/edit/req.param('id')
      };
      FlashService.success(req, 'Successfully updated department information');
      res.redirect('/admin/manage_departments');//
    })
  },
  destroy:function(req,res,next){
    Department.findOne({id:req.param('id')}, function (err, department) {
      if (err) sails.log.debug(err);
      if (err || !department) return res.redirect('404');

      Department.destroy(req.param('id'), function departmentDestroyed(err,department) {
        if (err) return next(err);
      });

      return res.redirect('/admin/manage_departments');
    });
  }
	
	
};

