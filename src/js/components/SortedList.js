/** @jsx React.DOM */
var React = require('react');

var SortedList = React.createClass({

	render: function () {

		var movies = this.props.list;

		d = [];

		movies.map(function (movie) {
			d.push(
				<div className="row" style={{cursor: 'pointer', border: '1px solid black', padding: '5px'}}>
					<div className="col-sm-4" style={{height: '150px', textAlign: 'center'}}>
						<img src={movie.Poster} alt={movie.Title} style={{maxHeight: '100%', width: 'auto'}} />
					</div>
					<div className="col-sm-8">
						<ul style={{listStyle: 'none', padding: '0'}}>
							<li>{movie.Title} ({movie.Year})</li>
							<li>{movie.Plot}</li>	
							<li>Rating: <span style={{fontWeight: 'bold'}}>{movie.imdbRating}</span></li>
						</ul>
						<span style={{fontWeight: 'bold'}}>Click to add</span>
					</div>
				</div>
			);
		});

		return (
			<div style={{margin: '10px'}}>
				{d}
			</div>
		);

	}

});

module.exports = SortedList;