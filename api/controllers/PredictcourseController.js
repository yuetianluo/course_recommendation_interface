/**
 * PredictcourseController
 *
 * @description :: Server-side logic for managing predictcourses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	display:function(req,res){
     	Department.find(function(err,departments){
     		Course.find()
     			.populate('department',{
     				sort:'departmentName DESC'
     			})
     			.exec(function(err,courses){
     			if(err) return FlashService.error(req, 'There is something wrong...');;
                return res.view({title:'Find similar courses',departments:departments,courses:courses});
     			});
     		})
     	},	
     search:function(req,res){
     	var PythonShell = require('python-shell');

			var options = {
			  mode: 'text',
			  scriptPath: 'path/to/my/scripts',
			  args: ['value1', 'value2', 'value3']
			};

			PythonShell.run('my_script.py', options, function (err, results) {
			  if (err) throw err;
			  // results is an array consisting of messages collected during execution
			  console.log('results: %j', results);
			});
		},
	
};

