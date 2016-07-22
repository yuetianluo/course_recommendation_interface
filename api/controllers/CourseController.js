/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function(req,res){
		Department.find(function(err,departments){//////!!!!!!!I can still use Department Model here!!!
		return res.view({
			title:'Add a new course',
			departments:departments
		});
		})
		
	},
	create:function(req,res,next){////////!!!!!!!!!!!!!!!!!!!!!the problem is the policy 'getOnly'
		Course.findOneByCourseName({courseName:req.param('courseName')},function(err,course){
      	if(course){
      		FlashService.error(req,"This course already exists.")
      		return res.redirect('/course/new');
      	}else{
      		Course.create(req.params.all(), function (err, course) {// here I forget 's' after the param
        if (err) {
          sails.log.debug('Error occurred: ' + err);
          FlashService.error(req, "There is some problem when you create the course");
          return res.redirect('/course/new');
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
        	return res.redirect('/admin/manage_courses');//!!!!!!!!be remember the route format!!! you need to do it by yourself
        }
      });
      	}
      })  
	},
  edit:function(req,res,next){//
      Course.findOne({id:req.param('id')})
      .populate('department')// if you use populate, you need quotation
      .exec(function (err, course) {
        Department.find(function(err,departments){
           if (err || !course) {
            sails.log.debug(err);
            return FlashService.error(req,"There is some problems to find the course")
          }
        return res.view({ course: course, title: 'Edit',departments:departments });
        })
      });
  },
  update:function(req,res,next){
        Course.update({id:req.param('id')},req.params.all(),function(err,course){
      if(err){
        sails.log.debug(req.params.all());
        return res.redirect('/course/edit/'+req.param('id'));//it can not be /user/edit/req.param('id')
      };
      FlashService.success(req, 'Successfully updated course information');
      res.redirect('/admin/manage_courses');//
    })
  },
  destroy:function(req,res,next){
    Course.findOne({id:req.param('id')}, function (err, course) {
      if (err) sails.log.debug(err);
      if (err || !course) return res.redirect('404');

      Course.destroy(req.param('id'), function courseDestroyed(err,course) {
        if (err) return next(err);
      });

      return res.redirect('/admin/manage_courses');
    });
  }
	

};

