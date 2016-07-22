/**
 * Course.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
   
  attributes: {
  	courseName:{
  		type:'STRING',
  		required:true
  	},
  	teacherName:{
  		type:'STRING'
  	},
  	credit:{
  		type:'INTEGER',
  		required:true
  	},
  	department:{
  		model:'department'
  	}

  }
};

