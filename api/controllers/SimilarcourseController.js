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
			 // scriptPath: '/Users/luoyuetian/Desktop/junior/summerproject/course_recommendation_interface',
			 // the default route is the course_recommendation_interface
			  args: ['value1']
			};

			PythonShell.run('sum_test.py', options, function (err, results) {
			  if (err) throw err;
			  // results is an array consisting of messages collected during execution
			  console.log('results: %s', results[0]);// be careful here it should be '%s', it doesn't show any thing if I use -%j'
			});
		},
};

