const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PridictionSchema = new Schema({
	ticker :{
		type : String,
		required : [true,'Name field is required']
	},
	prediction :{
		type : Number
	},
	prediction_date : {
		type : Date
		
	},
	computation_date : {
		type : Date
		
	}
});
 
const Pridiction = mongoose.model('pridiction',PridictionSchema);
module.exports = Pridiction;