/**
 * Major.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection:'mysql',
  tableName:"major",
  schema:true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
  	 id:{
  	 	columnName:'majorid',
  	 	type:'integer',
  	 	primaryKey:true
  	 },

  	majorName:{
  		type:'STRING',
  		columnName:'majorName',
  		required:true,
  	}
  }
};

