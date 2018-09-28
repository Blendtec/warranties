import React, { Component } from 'react';
import axios from '../../../axios-data';
import infoFiles from '../../../enum/info-files';

class States extends Component {

	state = {
		states: null
	}

    setSelectStates(states = null, country = null) {
    	if (this.state.states || states) {
	    	let currCountry = 'US';
	    	let availStates = states || this.state.states;
	    	
	    	let currStates = availStates.filter(state => {
	    		return state.country === currCountry;
	    	})
	    	.map(state => {
	    		return {value: state.name, displayValue: state.name};
	    	});
	    	if (currStates.length === 0) {

	    	} else {
	    		currStates.unshift({value: '', displayValue: 'Select State'});
	    	}
	    	return currStates;
	    } else {
	    	return null;
	    }
    }

  componentDidMount() {
    axios.get(infoFiles.statesFile)
      .then(res => {
	        const states = res.data;
	        console.log(states);
	        const showStates = this.setSelectStates(states);
	        let stateUpdater = {states: states};
	        console.log(states);
	        if (showStates) {
		        const updatedOrderForm = {
		            ...this.state.orderForm
		        };
		        updatedOrderForm.state.validation = { required: Boolean(showStates.length)};
		        updatedOrderForm.state.elementConfig.options = showStates;
	        	stateUpdater = {
	        		states: states,
	        		orderForm: updatedOrderForm
	        	};
	        }
	        this.setState((state, props) => {
	    		return stateUpdater;
	    	});
      })
      .catch(e => e);
  }

	render () {
		let options = null;
		if (this.state.states) {
			options = this.state.states.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ));
		}
		return (
                <select
                    className={this.props.classes}
                    value={this.props.value}
                    onChange={this.props.changed}>
                    {options}
                </select>
			);
	}
}

export default States;