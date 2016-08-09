/**
 * Course.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection:'mysql',//
  schema:true,
   tableName:'course_test2',
   autoCreatedAt: false,
   autoUpdatedAt: false,
  attributes: {
  id:{
    columnName:'id',
      type:'integer',
      primaryKey:true
     },
  	courseName:{
  		type:'STRING',
      columnName:'courseName',
  		required:true
  	},
  	coursesubjectid:{
        model:'coursesubject'
  	},
    departmentid:{
      model:'department'
    }

  }
};

