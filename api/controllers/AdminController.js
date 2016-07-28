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
  manage_courses:function(req,res){
       Course.find()//if one course belongs to only one department, one department can have more than one courses, we need to add model in course, and the name of 
       //of that attribute should be the model name of the associated model. and sails will search based on the department id. so in course's attribute department, you should store department's id
            .populate('coursesubjectid')
            .populate('departmentid')
            .exec(function(err,courses){
              if(err) return res.serverError(err);
              //sails.log(courses[0].department.departmentName), a little bit strange that it does not print here
              return res.view({title:'Course Management',courses:courses});
            });
    //    Course.find()
    //  .populate('belongdepartment')
    //  .exec(function(err,courses) {
    //  if (err) return res.serverError(err);
    //  sails.log('Wow, there are %d users named Finn.', courses.length);
  // sails.log('Check it out, some of them probably have a dad named Joshua or Martin:', courses[0].belongdepartment);
  // sails.log(courses[1].belongdepartment)

    //sails.log.info(courses); !!!!!!!!this is obvious wrong!!! you can only use users in the function
    //Course.find(function (err, courses) {
      //return res.view({ title: 'Course Management', courses: courses });
    },
    manage_departments:function(req,res){
    Department.find(function (err, departments) {
      return res.view({ title: 'Department Management', departments: departments });
    });
  },
  manage_coursesubjects:function(req,res){
       Coursesubject.find()
            .populate('departmentid')
            .exec(function(err,coursesubjects){
              if(err) return res.serverError(err);
              return res.view({title:'Coursesubject Management',coursesubjects:coursesubjects});
            });
    },

  
};

