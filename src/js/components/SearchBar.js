/** @jsx React.DOM */
var React = require('react');

var SearchBar = React.createClass({

	render: function () {

		return (
			<div>
				<form action="#" onSubmit={this.onSearchSubmit}>
					<input type="search" placeholder="Type movie's name and press Enter" className="form-control" ref="searchBar" />
					<input type="submit" style={{display: 'none'}} value="Search" />
				</form>
			</div>
		);

	},

	onSearchSubmit: function (e) {
		e.preventDefault();	
		var searchInput = this.refs.searchBar.getDOMNode();
		var queryString = searchInput.value;
		searchInput.value = '';
		if (queryString.length > 0) {
			queryString = queryString.split(' ').join('+');
			this.props.onSubmit(queryString);
		}
	}

});

module.exports = SearchBar;