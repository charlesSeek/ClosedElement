import React ,{Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {ClosedElements} from '../../collections/closed_element';
import MainChart from './main_chart';
import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'
class MainLayout extends Component {
	componentWillMount(){
		this.state={
			fromDate:'',
			toDate:'',
			chartData:''
		}
	}
	onClickGenerateChart(event){
		event.preventDefault();
		const fromDate = this.state.fromDate;
		const toDate = this.state.toDate;
		if (toDate < fromDate){
			alert('to date can not less than from date');
			return;
		}
		Meteor.call('countResult',fromDate,toDate,(err, res)=>{
			if (err){
				console.log(err)
			}else{
				this.setState({chartData:res.chartData,fromDate:fromDate,toDate:toDate});
			}
		})
	}
	render(){
		const  chart = this.state.chartData && this.state.chartData.length?<MainChart chartData={this.state.chartData}/>:'';
		console.log(this.state.chartData);
		return (
			<div className="container centered">
				<div className="row">
					<div className="col-md-1">
						<label>From</label>
					</div>
					<div className="col-md-3">
						<DateField dateFormat="YYYY-MM-DD" 
							onChange={(dateString,{dateMoment,timestamp})=>{this.setState({fromDate:dateString})}}
						/>
					</div>
					<div className="col-md-1">
						<label>To</label>
					</div>
					<div className="col-md-3">
						<DateField dateFormat="YYYY-MM-DD"
							onChange={(dateString,{dateMoment,timestamp})=>{this.setState({toDate:dateString})}}
						/>
					</div>
					<div className="col-md-4">
						<button className="btn btn-default" onClick={this.onClickGenerateChart.bind(this)}>Generate Chart</button>
					</div>
				</div>
				{chart}
			</div>
		)
	}
}
export default MainLayout;