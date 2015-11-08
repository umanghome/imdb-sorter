/** @jsx React.DOM */
var React = require('react');

var SearchResult = React.createClass({

	render: function () {

		return (
			<div className="row" style={{cursor: 'pointer', border: '1px solid black', padding: '5px'}} onClick={this.props.addMovie}>
				<div className="col-sm-4" style={{height: '150px', textAlign: 'center'}}>
					<img src={this.props.data.Poster} alt={this.props.data.Title} style={{maxHeight: '100%', width: 'auto'}} />
				</div>
				<div className="col-sm-8">
					<ul style={{listStyle: 'none', padding: '0'}}>
						<li>{this.props.data.Title} ({this.props.data.Year})</li>
						<li>{this.props.data.Plot}</li>	
						<li>Rating: <span style={{fontWeight: 'bold'}}>{this.props.data.imdbRating}</span></li>
					</ul>
					<span style={{fontWeight: 'bold'}}>Click to add</span>
				</div>
			</div>
		);

	}

});

module.exports = SearchResult;