/*
lib functions for chart data process
 */

//get the dates array
function getAllDates(data){
	let dateArray =[];
	data.forEach(function(element){
  		let date = element._id.date;
  		if (!dateArray.some(function(ele){
      			return ele ===date;
  		})){
    		dateArray.push(date);
  		}
	});
	return dateArray.sort();
};

//get the actualOwner array
function getAllActualOwners(data){
	let actualOwnerArray =[];
	data.forEach(function(element){
  		let actualOwner = element._id.owner;
  		if (!actualOwnerArray.some(function(ele){
      			return ele === actualOwner;
  		})){
    		actualOwnerArray.push(actualOwner);
  		}
	});
	return actualOwnerArray.sort();
};

//get the chart data array
exports.getChartData = function(data){
	let chartData = []
	let dateArray = getAllDates(data);
	dateArray.sort();
	let ownerArray = getAllActualOwners(data);
	ownerArray.sort();
	let firstRow = ['date'].concat(ownerArray);
	chartData.push(firstRow);
	dateArray.forEach(function(date){
  		let row = [];
  		row.push(date);
  		ownerArray.forEach(function(owner){
    		let one = data.find(function(element){
      			return (element._id.owner === owner&&element._id.date===date);
    		});
    		if (!one){
      			row.push(0);
    		}else{
      			row.push(one.count);
    		}
    
  		})
  		chartData.push(row);
	});
	return chartData;
}