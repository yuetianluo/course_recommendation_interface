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
     predict:function(req,res){
     	var PythonShell = require('python-shell');
          var ppsk = req.param('ppsk');
		var options = {
		  args: [ppsk]
		};

		PythonShell.run('course_predict.py', options, function (err, results) {
		  if (err) throw err;
		  // results is an array consisting of messages collected during execution
               len = results.length  
               Course.find({where:{id:results},limit:100})
               .populate('departmentid',{
               })
                 .populate('coursesubjectid',{
                 })
                 .exec(function(err,courses){
                    console.log(courses)
                     index=0;
                     for (var i=0; i<len ;i++){
                       console.log(courses[i].id)
                       for (var j=0; j<len ; j++)
                       {
                         if(courses[i]['id'] == results[j])
                         {
                           courses[i].rank=j;
                         }
                       }
                     };
                     var courses2 = courses.slice(0);
                     courses2.sort(function(a,b) {
                     return a.rank-b.rank;
                     });
                     //console.log(courses2);
                     return res.ok(courses2);
                 });
		});
	},
	
};

