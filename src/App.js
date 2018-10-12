import React, { Component } from 'react';
import './App.css';
import Personal from './containers/Personal/Personal';
import orderForm from './enum/orderForm';

class App extends Component {

    state = {
        orderForm: {...orderForm},
        formIsValid: false,
        loading: false,
    }

    getErrorMessages(formElement) {
    	const errorMessages = Object.keys(formElement).filter(key => {
    		if (formElement[key].valid === false && formElement[key].touched === true) {
    			return true;
    		} else {
    			return false;
    		}
    	}).map(errored => {
    		if (formElement[errored].elementConfig.errormessage) {
    			return formElement[errored].elementConfig.errormessage;
    		}
    		return null;
    	});
    	return errorMessages;
    }

    submitIt = () => {
    	let formElement = {...this.state.orderForm};
    	const valid = this.state.formIsValid;
    	if (valid) {
    		this.props.submit(formElement);
    	} else {
    		Object.keys(formElement).map(key => {
		        formElement[key].touched = true;
		        return formElement[key];
    		});
    		this.setState({orderForm: formElement});
    	}
    }


  render() {
    return (
      <div className="App grid">
        <Personal getErrorMessages={this.getErrorMessages} inputChangedHandler={this.inputChangedHandler} />
      </div>
    );
  }
}

export default App;
