/**
 * SimilarcourseController
 *
 * @description :: Server-side logic for managing similarcourses
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
                        if(err) return FlashService.error(req, 'There is something wrong...');
                        return res.view({title:'Find similar courses',departments:departments,coursesubjects:coursesubjects});
                      })
     		})
     	},	
     search:function(req,res){//
     	var PythonShell = require('python-shell');
      var courseid=req.param('courseid');
      console.log(courseid)
      //sails.log.debug(courseid);
			var options = {
			  args: [courseid]
			};
			PythonShell.run('word2vec.py', options, function (err, results) {
			  if (err) throw err;
			  // results is an array consisting of messages collected during execution
			  //console.log('results: %s', results);// be careful here it should be '%s', it doesn't show any thing if I use -%j'		  
        if(results.length<=1)
        {
          FlashService.error(req, results)
          return res.badRequest('Sorry, there is not sufficient records about this course, so we can not give you recommendation with strong confidence')        
        }
        else{
          idresults=results.slice(0,10);
          cosinesimilar=results.slice(10,20);
          total=[]
          console.log(cosinesimilar)
          console.log(idresults)
          res.locals.cosinesimilar=cosinesimilar;
          Course.find({id:idresults})
          .populate('departmentid',{
          })
            .populate('coursesubjectid',{
            })
            .exec(function(err,courses){
                index=0;
                for (var i=0; i<10;i++){
                  for (var j=0; j<10; j++)
                  {
                    if(courses[i].id==idresults[j])
                    {
                      courses[i].cosinesimilarity=Number(cosinesimilar[j]).toFixed(3);
                    }
                  }
                  //console.log(courses[i]);
                }
                var courses2 = courses.slice(0);
                courses2.sort(function(a,b) {
                return a.cosinesimilarity - b.cosinesimilarity;
                });
                console.log(courses2);
                return res.ok(courses2);
            });
        }
      });
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

