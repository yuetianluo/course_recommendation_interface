/**
 * CoursesubjectController
 *
 * @description :: Server-side logic for managing coursesubjects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function(req,res){
		Department.find(function(err,departments){//////!!!!!!!I can still use Department Model here!!!
      if(err) {
        FlashService.error(req,"This is some error to get departments");
        return res.redirect('/admin/manage_coursesubjects')
      }
      return res.view({
      title:'Add a new course subject',
      departments:departments,

          });
		})
	},
	create:function(req,res,next){////////!!!!!!!!!!!!!!!!!!!!!the problem is the policy 'getOnly'
		sails.log.debug(req.param('coursesubjectName'));
		Coursesubject.findOneBycoursesubjectName({coursesubjectName:req.param('coursesubjectName')},function(err,coursesubject){
      	if(coursesubject){
      		FlashService.error(req,"This coursesubject already exists.")
      		return res.redirect('/coursesubject/new');
      	}else{
      		sails.log.debug(req.param('coursesubjectName'));
      		Coursesubject.create(req.params.all(), function (err, coursesubject) {// here I forget 's' after the param
        if (err) {
          sails.log.debug('Error occurred: ' + err);
          FlashService.error(req, "There is some problem when you create the coursesubject");
          return res.redirect('/coursesubject/new');
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
        	sails.log.debug(coursesubject);
        	return res.redirect('/admin/manage_coursesubjects');//!!!!!!!!be remember the route format!!! you need to do it by yourself
        }
      });
      	}
      })  
	},
	  edit:function(req,res,next){//
      Coursesubject.findOne({id:req.param('id')})
      .populate('departmentid')// if you use populate, you need quotation
      .exec(function (err, coursesubject) {
        Department.find(function(err,departments){

             if (err || !coursesubject) {
            sails.log.debug(err);
            return FlashService.error(req,"There is some problems to find the coursesubject")
          }
        return res.view({ coursesubject: coursesubject, title: 'Edit',departments:departments});

        })
      });
  },
  update:function(req,res,next){
        Coursesubject.update({id:req.param('id')},req.params.all(),function(err,coursesubject){
      if(err){
        sails.log.debug(req.params.all());
        return res.redirect('/coursesubject/edit/'+req.param('id'));//it can not be /user/edit/req.param('id')
      };
      FlashService.success(req, 'Successfully updated coursesubject information');
      res.redirect('/admin/manage_coursesubjects');//
    })
  },
  destroy:function(req,res,next){
    Coursesubject.findOne({id:req.param('id')}, function (err, coursesubject) {
      if (err) sails.log.debug(err);
      if (err || !coursesubject) return res.redirect('404');

      Coursesubject.destroy(req.param('id'), function coursesubjectDestroyed(err,coursesubject) {
        if (err) return next(err);
      });

      return res.redirect('/admin/manage_coursesubjects');
    });
  }
	
};
  
