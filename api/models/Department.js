/**
 * Department.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection:'mysql',
  tableName:"department",
  schema:true,
  autoCreatedAt: false,
   autoUpdatedAt: false,
  attributes: {
  	 id:{
  	 	columnName:'departmentid',
  	 	type:'integer',
  	 	primaryKey:true
  	 },

  	departmentName:{
  		type:'STRING',
  		columnName:'departmentName',
  		required:true,
  	}
  }
};

