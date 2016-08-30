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
			  args: [courseid]//
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
                }
                var courses2 = courses.slice(0);
                courses2.sort(function(a,b) {
                return b.cosinesimilarity-a.cosinesimilarity ;
                });
                //console.log(courses2);
                return res.ok(courses2);
            });
        }
      });
		},
    filterbydepartment:function(req,res){
      var departmentid=req.param('departmentid');
      //console.log(departmentid);
      Course.find({departmentindex:departmentid, sort:'courseName ASC'})
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
      Course.find({coursesubjectindex:coursesubjectid,sort:'courseName ASC'})
        .populate('departmentid',{
            sort:'departmentName ASC'
          })
            .populate('coursesubjectid',{
              sort:'coursesubjectName ASC'
            })
            .exec(function(err,courses){
                //console.log(courses);
                return res.ok(courses);
            });
      },
      courserelationship:function(req,res){
        Department.find(function(err,departments){
         Coursesubject.find()
                      .populate('departmentid',{
                        sort:'departmentName DESC'
                      })
                      .exec(function(err,coursesubjects){
                        if(err) return FlashService.error(req, 'There is something wrong...');
                        return res.view({title:'Investigate course relationships',departments:departments,coursesubjects:coursesubjects});
                      })
        })
      }, 
      course_rela_analysis:function(req,res){//
      var PythonShell = require('python-shell');
      var pos1_courseid=req.param('pos1_courseid');
      var pos2_courseid=req.param('pos2_courseid');
      var pos3_courseid=req.param('pos3_courseid');
      var neg1_courseid=req.param('neg1_courseid');
      var neg2_courseid=req.param('neg2_courseid');
      var neg3_courseid=req.param('neg3_courseid');
      if (pos1_courseid == '') {pos1_courseid = 0} else {pos1_courseid = Number(pos1_courseid)}
      if (pos2_courseid == '') {pos2_courseid = 0} else {pos2_courseid = Number(pos2_courseid)}
      if (pos3_courseid == '') {pos3_courseid = 0} else {pos3_courseid = Number(pos3_courseid)}
      if (neg1_courseid == '') {neg1_courseid = 0} else {neg1_courseid = Number(neg1_courseid)}
      if (neg2_courseid == '') {neg2_courseid = 0} else {neg2_courseid = Number(neg2_courseid)}
      if (neg3_courseid == '') {neg3_courseid = 0} else {neg3_courseid = Number(neg3_courseid)}
      //sails.log.debug(courseid);
      var options = {
        args: [pos1_courseid,pos2_courseid,pos3_courseid,neg1_courseid,neg2_courseid,neg3_courseid]
      };
      console.log(options)
      PythonShell.run('course_rela_analysis.py', options, function (err, results) {
        if (err) throw err;
        // results is an array
         //consisting of messages collected during execution
        //console.log('results: %s', results);// be careful here it should be '%s', it doesn't show any thing if I use -%j'     
        if(results.length<=1)
        {
          console.log(results)
          FlashService.error(req, results)
          return res.badRequest('Sorry, there is not sufficient records about this course, so we can not give you recommendation with strong confidence')        
        }
        else{
          idresults=results.slice(0,10);
          cosinesimilar=results.slice(10,20);
          total=[]
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
                }
                var courses2 = courses.slice(0);
                courses2.sort(function(a,b) {
                return b.cosinesimilarity-a.cosinesimilarity ;
                });
                //console.log(courses2);
                return res.ok(courses2);
            });
        }
      });
    }, 
};

