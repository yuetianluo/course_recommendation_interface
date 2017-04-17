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
                User.findOne(req.param('id'))
                    .populate("majorid")
                    .exec(function(err, user){
                if (user.majorid  == undefined){
                  user.majorid = {
                    id : 0,
                  };
                  return res.view({title:'Find next courses',departments:departments,coursesubjects:coursesubjects, user:user});
                } else{
                        if(err) FlashService.error(req, 'There is something wrong to get departments');
                // sails.log(user);
                return res.view({title:'Find next courses',departments:departments,coursesubjects:coursesubjects, user:user});
                }
     					 })
     		})
      })
    },	
     predict:function(req,res){
      var allresults = req.param('data');
      sails.log(allresults);
      var history = req.param('history');
      //sails.log(history);
      var status = req.param('status');
      console.log(status)
      //console.log(allresults)
      var courseNum = 10
      if (status == 'OK'){
        pro = allresults.slice(courseNum,2*courseNum)
        results = allresults.slice(0,courseNum)
        //sails.log(history[0]);
        if (history[0] != ''){
          results = results.concat(history[0].reverse());
        }
        course_history_sem = history[1].reverse();
        //sails.log(results);
        len = results.length
        //console.log(pro)
        Course.find({where:{id:results}})
         .populate('departmentid',{
         })
           .populate('coursesubjectid',{
           })
           .exec(function(err,courses){
              //console.log(courses)
               index=0;
               for (var i=0; i<len ;i++){
                // console.log(courses[i].id)
                 for (var j=0; j<len ; j++)
                 {
                   if(courses[i]['id'] == results[j])
                   {
                     if (j < courseNum){
                      courses[i].rank=j;
                      courses[i].probability = Number(pro[j]).toFixed(4);
                     } else{
                      courses[i].rank=j;
                      courses[i].Sem = course_history_sem[j - courseNum];
                     }
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
      }else{
          FlashService.error(req, results)
          return res.badRequest('Sorry, This ppsk does not exist!')
      }
	},
	
};

