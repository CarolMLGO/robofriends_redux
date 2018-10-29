import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
// import {robots} from './robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField,setRequestRobots } from '../actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		err: state.requestRobots.err
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(setRequestRobots())
	}
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots()
	}

	// onSearchChange = (event) => {
		// this.setState({ searchfield: event.target.value })
	// }//any time making my own methods, using arrow functions, make sure that this belongs to 
	//where it was created, in this case, App

	render () {
		const { searchField, onSearchChange,robots,isPending} = this.props;
		const filteredRobots = robots.filter( robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})

		if (isPending) {
			return <h1 className='tc'>Loading</h1>
		} else {
		return (
		  <div className='tc'>
			<h1 className='f1'>RobotFriends</h1> 
			<SearchBox searchChange={onSearchChange} />
			<Scroll>
			  <ErrorBoundary>
				<CardList robots= {filteredRobots} />
			  </ErrorBoundary>
			</Scroll>
		  </div>
		)
	}

}

}

export default connect(mapStateToProps, mapDispatchToProps)(App);