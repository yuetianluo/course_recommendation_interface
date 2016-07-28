/**
 * NextcourseController
 *
 * @description :: Server-side logic for managing nextcourses
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
     					 	if(err) FlashService.error(req, 'There is something wrong to get departments');
                return res.view({title:'Find next courses',departments:departments,coursesubjects:coursesubjects});
     					 })
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

