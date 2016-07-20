/**
 * SimilarcourseController
 *
 * @description :: Server-side logic for managing similarcourses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
     display:function(req,res){
     	res.view();
     },	
     search:function(req,res){
     	var PythonShell = require('python-shell');

			var options = {
			  mode: 'text',
			  pythonPath: 'path/to/python',
			  pythonOptions: ['-u'],
			  scriptPath: 'path/to/my/scripts',
			  args: ['value1', 'value2', 'value3']
			};

			PythonShell.run('my_script.py', options, function (err, results) {
			  if (err) throw err;
			  // results is an array consisting of messages collected during execution
			  console.log('results: %j', results);
			});
			     }
};

