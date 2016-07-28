/**
 * Coursesubject.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection:'mysql',
  schema:true,
   tableName:'coursesubject_test',
   autoCreatedAt: false,
   autoUpdatedAt: false,
  attributes: {
   id:{
  	 	columnName:'id',
  	 	type:'integer',
  	 	primaryKey:true
  	 },

  	coursesubjectName:{
  		type:'STRING',
  		columnName:'coursesubjectName',
  		required:true,
  	},
  	departmentid:{
  		model:'department'
  	}
  }
};

