import React from "react";

function Text(props) {
	if (props.text === undefined) {
	  	return null;
	}

  	let logs = props.text;

	let headers = Object.keys(logs);
	return (
		<div>
	    {headers.map(header =>
	    	(<div>
	        	<h3>{header}</h3>
	          	<ul>
			    	{Object.values(logs[header]).map(log => (<li>{Object.values(log).join('; ')}</li>))}
			  	</ul>
	        </div>)
	    )}
	  </div>
	);
}

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {text: ''};
		this.onTextChange = this.onTextChange.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onLucky = this.onLucky.bind(this);
	}

	onTextChange(e) {
		this.setState({text: e.target.value});
	}

	onSearch(e) {
		fetch('/api/logs?rid='+this.state.text)
			.then(response => response.json())
			.then(json => this.setState({logs:json}));
	}

	onLucky(e) {
		fetch('/api/feelinglucky/')
			.then(response => response.json())
			.then(json => this.setState({text:json.rid}));
	}

	render() {
		return (
		    <div>
				<input type="text" onChange={this.onTextChange} value={this.state.text}/>
				<button onClick={this.onSearch}>Search</button>
				<button onClick={this.onLucky}>Lucky search</button>
				<Text text = {this.state.logs}/>
		    </div>
		);
	}
}
