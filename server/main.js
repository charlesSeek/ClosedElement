import { Meteor } from 'meteor/meteor';
import {ClosedElements} from '../collections/closed_element';
Meteor.startup(() => {
  // code to run on server at startup
});
Meteor.methods({
	'countResult':function(fromDate,toDate){
		const start = fromDate+' 00:00:00';
		const end = toDate+' 23:59:59';
		const chartData = ClosedElements.aggregate({$match:{'type':'task',
			'status':'Completed',
			$and:[{completionDate:{$gte:start}},
			{completionDate:{$lte:end}}]}},
			{$group:{_id:{"date":{$substr:["$completionDate",0,10]},
			"owner":"$actualOwner"},count:{$sum:1}}});
		return {chartData:chartData};
	}
})


