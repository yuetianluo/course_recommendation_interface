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
      		sails.log.debug(req.param('courseName'));
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
        	sails.log.debug(course);
        	return res.redirect('/course/manage_courses');//!!!!!!!!be remember the route format!!! you need to do it by yourself
        }
      });
      	}
      })  
	},
	manage_courses:function(req,res){
		   Course.find()
			.populate('belongdepartment')
			.exec(function(err,courses) {
			if (err) return res.serverError(err);
			//sails.log('Wow, there are %d users named Finn.', courses.length);
  //sails.log('Check it out, some of them probably have a dad named Joshua or Martin:', courses);
		});
		sails.log.info(courses);
		//Course.find(function (err, courses) {
		
      //return res.view({ title: 'Course Management', courses: courses });
    }

};

