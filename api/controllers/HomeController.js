/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'contact':function(req,res){
		res.view({
			title: 'contact' //!!!!here you need '' outside the contact
		})
	},
	'license':function(req,res){
		res.view({
			title:'license'
		});
	},
	'tos':function(req,res){
		res.view({
			title:'Terms of service'
		});
	},
	'privacy':function(req,res){
		res.view({
			title:'Privacy'
		});
	}
};

