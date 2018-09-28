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

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.prefix && isValid) {
        	const availPrefix = this.state.prefixes;
        	isValid = Boolean(availPrefix.filter(prefix => {
        		return value.toUpperCase() === prefix.prefix.toUpperCase();
        	}).length);
        }

        if (rules.pastDate && isValid) {
        	if (value && value.fromNow) {
	        	const distanceString = value.fromNow();
	        	isValid = Boolean(distanceString.indexOf('ago') > -1);
        	} else {
        		isValid = false;
        	}
        }

        if (rules.isEmail && isValid) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric && isValid) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier, page) => {
        let updatedOrderForm = {
            ...this.state.orderForm[page]
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };

        let value = null;
        if (inputIdentifier === 'purchaseDate' || inputIdentifier === 'captcha') {
        	value = event;
        } else {
        	value = event.target.value;
        }
        updatedFormElement.value = value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
    	if (inputIdentifier === 'country') {
    		const showStates = this.setSelectStates(null, updatedFormElement.value);
    		if (showStates) {
		        updatedOrderForm.state.validation = { required: Boolean(showStates.length)};
		        updatedOrderForm.state.valid = this.checkValidity(updatedOrderForm.state.value, updatedOrderForm.state.validation);
		        updatedOrderForm.state.elementConfig.options = showStates;
    		}
    	}
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        const totalOrderForm = {...this.state.orderForm};
        totalOrderForm[page] = updatedOrderForm;
        this.setState((state, props) => {
	    		return {
	    			orderForm: totalOrderForm,
	    			formIsValid: formIsValid
	    		}
	    });
    }

    getErrorMessages(formElement) {
    	console.log(formElement);
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
        <Personal formElement={this.state.orderForm.personal} getErrorMessages={this.getErrorMessages} inputChangedHandler={this.inputChangedHandler} />
      </div>
    );
  }
}

export default App;
