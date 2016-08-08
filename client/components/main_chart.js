import React,{Component} from 'react';
import {Chart} from 'react-google-charts';
import {getChartData} from '../libs/chartData';

class MainChart extends Component {
	render(){
		let options = {
			title: 'Completed Cases Statistics By Date'
		};
		let data = getChartData(this.props.chartData);
		return(
			<div className="container">
				<Chart chartType="ColumnChart" data={data} options ={options} width={"100%"} height={"600px"} legend_toggle={true}/>
			</div>
		)
	}
}
export default MainChart;