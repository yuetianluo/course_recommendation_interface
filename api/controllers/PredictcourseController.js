/**
 * PredictcourseController
 *
 * @description :: Server-side logic for managing predictcourses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	display:function(req,res){
     	Department.find(function(err,departments){
         Coursesubject.find()
                      .populate('departmentid',{
                        sort:'departmentName DESC'
                      })
                      .exec(function(err,coursesubjects){
                        if(err) return FlashService.error(req, 'There is something wrong...');;
                        return res.view({title:'recommend a sequence of courses',departments:departments,coursesubjects:coursesubjects});
                      })
     		})
     	},	
     search:function(req,res){
     	var PythonShell = require('python-shell');

      //wait for development
      res.redirect('/');
			// var options = {
			//   mode: 'text',
			//   scriptPath: 'path/to/my/scripts',
			//   args: ['value1', 'value2', 'value3']
			// };

			// PythonShell.run('my_script.py', options, function (err, results) {
			//   if (err) throw err;
			//   // results is an array consisting of messages collected during execution
			//   console.log('results: %j', results);
			// });
		},
    filterbydepartment:function(req,res){
      var departmentid=req.param('departmentid');
      //console.log(departmentid);
      Course.find({departmentindex:departmentid})
        .populate('departmentid',{
            sort:'departmentName DESC'
          })
            .populate('coursesubjectid',{
              sort:'coursesubjectName DESC'
            })
            .exec(function(err,courses){
                //console.log(courses);
                return res.ok(courses);
            });
    },
    filterbycoursesubject:function(req,res){
      var coursesubjectid=req.param('coursesubjectid');
      //console.log(coursesubjectid);
      Course.find({coursesubjectindex:coursesubjectid})
        .populate('departmentid',{
            sort:'departmentName DESC'
          })
            .populate('coursesubjectid',{
              sort:'coursesubjectName DESC'
            })
            .exec(function(err,courses){
                //console.log(courses);
                return res.ok(courses);
            });
    },
	
};

