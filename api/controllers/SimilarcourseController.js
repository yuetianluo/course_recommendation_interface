/**
 * SimilarcourseController
 *
 * @description :: Server-side logic for managing similarcourses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
     display:function(req,res){
     	Department.find(function(err,departments){
     		Course.find()
     			.populate('departmentid',{
     				sort:'departmentName DESC'
     			})
                    .populate('coursesubjectid',{
                         sort:'coursesubjectName DESC'
                    })
     			.exec(function(err,courses){//
                         Coursesubject.find()
                                      .populate('departmentid',{
                                        sort:'departmentName DESC'
                                      })
                                      .exec(function(err,coursesubjects){
                                        if(err) return FlashService.error(req, 'There is something wrong...');;
                return res.view({title:'Find similar courses',departments:departments,courses:courses,coursesubjects:coursesubjects});
                                      })
                  });
     		})
     	},	
     search:function(req,res){//
     	var PythonShell = require('python-shell');
      var courseid=req.param('courseid');
      //sails.log.debug(courseid);
			var options = {
			  args: [courseid]
			};

			PythonShell.run('word2vec.py', options, function (err, results) {
			  if (err) throw err;
			  // results is an array consisting of messages collected during execution
			  //console.log('results: %s', results);// be careful here it should be '%s', it doesn't show any thing if I use -%j'		  
        Course.find({id:results})
          .populate('departmentid',{
            sort:'departmentName DESC'
          })
            .populate('coursesubjectid',{
              sort:'coursesubjectName DESC'
            })
            .exec(function(err,courses){
                //console.log(courses);
                return res.ok(courses);
            })
      });
      
		},
};

