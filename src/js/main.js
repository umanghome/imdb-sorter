/** @jsx React.DOM */

var Router = require('react-router'),
	Route = Router.Route,
	Link = require('react-router').Link;

var React = require('react'),
	_ = require('lodash');

var SearchBar = require('./components/SearchBar'),
	SearchResult = require('./components/SearchResult'),
	SortedList = require('./components/SortedList');

var Home = React.createClass({

	getInitialState: function () {
		return {
			searchQuery: '',
			searchResultsLoaded: true,
			searchResult: {},
			moviesArray: [],
			searchError: ''
		};
	},

	render: function () {

		var searchResultBox;
		if (this.state.searchError != '') {
			searchResultBox = <div>{this.state.searchError}</div>
		}
		else if (this.state.searchQuery == '') {
			searchResultBox = <div></div>
		} else if (this.state.searchQuery.length > 0 && !this.state.searchResultsLoaded) {
			searchResultBox = <div>Loading..</div>
		} else if (this.state.searchQuery.length > 0 && this.state.searchResultsLoaded) {
			searchResultBox = <SearchResult data={this.state.searchResult} addMovie={this.addMovie} />
		}

		return (
			<div>
				<SearchBar onSubmit={this.onSearchSubmit} />
				{searchResultBox}
				<SortedList list={this.state.moviesArray} />
			</div>
		);
	},

	onSearchSubmit: function (queryString) {
		console.log(queryString);
		this.setState({
			searchQuery: queryString,
			searchResultsLoaded: false
		});

		$.ajax({
			url: 'http://www.omdbapi.com/?t=' + queryString + '&plot=short&type=movie',
			method: 'GET',
			success: function (data) {
				console.log(data);
				if (typeof data.Error != 'undefined') {
					this.setState({
						searchError: 'Movie not found. Try using it\'s exact name.'
					});
				} else {
					this.setState({
						searchResultsLoaded: true,
						searchResult: data,
						searchError: ''
					});
				}
			}.bind(this),
			error: function () {

			}.bind(this)
		});
	},

	addMovie: function () {
		var moviesArray = this.state.moviesArray;
		moviesArray.push(this.state.searchResult);

		moviesArray = _.sortBy(moviesArray, function (movie) {
			return movie.imdbRating;
		});

		moviesArray = moviesArray.reverse();

		console.log('Added: ' + this.state.searchResult.Title);
		this.setState({
			moviesArray: moviesArray,
			searchResult: {},
			searchQuery: '',
			searchResultsLoaded: false
		});
		console.log(moviesArray);
	}

});

React.render(<Home />, document.getElementById('app'));