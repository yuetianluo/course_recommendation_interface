/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  // NOTE: Potentially useful: http://stackoverflow.com/questions/23446484/sails-js-populate-nested-associations
  display: function(req, res,next) {
  		User.findOne(req.param('id'),function(err,user){
  			if(err) sails.log.debug(err);
  			if(!user) return next();
  			res.view({
  			user:user,
        	title:'Dashboard'
        });
  		})
        
  	}
    /*User.findOne(req.session.user.id).populateAll().exec(function foundRequests(err, user) {
      DataModel.find().exec(function foundDataModels(err, dataModels) {

        var fillDataModels = function (i, n, cb) {
          if (i >= n) {
            cb();
          } else {
            Request.findOne(user.requests[i]['id']).populate('dataModel').exec(function (err, request) {
              user.requests[i] = request;
              fillDataModels(i+1, n, cb);
            });
          }
        }

        fillDataModels(0, user.requests.length, function() {
          var pii_datasets = {}
          var non_pii_datasets = {};
          for (i = 0; i < dataModels.length; i++) { 
            var dataModelFolder = dataModels[i].fileSafeName;
            fs.ensureDirSync(path.join(sails.config.paths.DATASET_NON_PII, dataModelFolder));
            fs.ensureDirSync(path.join(sails.config.paths.DATASET_PII, dataModelFolder));

            var datasets = fs.readdirSync(path.join(sails.config.paths.DATASET_NON_PII, dataModelFolder));
            for (j = 0; j < datasets.length; j++) {
              datasets[j] = UtilService.fileMinusExt(datasets[j]);
            }
            non_pii_datasets[dataModels[i].displayName] = datasets;

            datasets = fs.readdirSync(path.join(sails.config.paths.DATASET_PII, dataModelFolder));
            for (j = 0; j < datasets.length; j++) {
              datasets[j] = UtilService.fileMinusExt(datasets[j]);
            }
            pii_datasets[dataModels[i].displayName] = datasets;
            dataModels[i] = dataModels[i].displayName;
          }

          // var non_pii_datasets = fs.readdirSync(sails.config.paths.DATASET_NON_PII);
          // for (i = 0; i < non_pii_datasets.length; i++) {
          //   non_pii_datasets[i] = UtilService.fileMinusExt(non_pii_datasets[i]); // filter file extensions
          // }
          
          res.view({
            user: user,
            title: 'Dashboard',
            dataModels: dataModels,
            starredAnalytics: user.starredAnalytics,
            analytics: user.analytics,
            maxCount: 5
          });
        });
      });
    });*/

	
};

