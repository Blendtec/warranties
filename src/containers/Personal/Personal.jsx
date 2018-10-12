import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Aux from '../../hoc/Aux/Aux';
import infoFiles from '../../enum/info-files';
import { connect } from 'react-redux';

class Personal extends Component {
    state = {
        loading: false
    }


    render() {
    	let formElement = this.props.formElement;
    	const errorMessages = this.props.getErrorMessages(formElement);
    	let errors = null;
    	if (errorMessages.length) {
    		errors = (
	    		<div className="errors">
		    		<ul>
		    		{errorMessages.map((message, index) => {
		    			return (
		    				<li key={index}>{message}</li>
		    			);
		    		})}
		    		</ul>
	    		</div>
	    		);
    	}
	    let form = (
	    	<Aux>
	        <form onSubmit={this.orderHandler}>
	        	<div className="grid">
		    	<div className="grid__item">
		    		{errors}
		    	</div>
	        		<div className="grid__item">
		            {Object.keys(formElement).map(section => (
		                <Input 
		                    key={section}
		                    elementType={formElement[section].elementType}
		                    elementConfig={formElement[section].elementConfig}
		                    value={formElement[section].value}
		                    invalid={!formElement[section].valid}
		                    shouldValidate={formElement[section].validation}
		                    touched={formElement[section].touched}
		                    changed={(event) => this.props.inputChangedHandler(event, section, 'personal')} 
		                    classesInput={formElement[section].classes}/>
		            ))}
	        		</div>
	            </div>
	        </form>
	        </Aux>
	    );  	
	    return form;
    }

}

const mapStateToProps = state => {
    return {
        formElement: state.personal,
    }
};



export default connect(mapStateToProps, null)(Personal);
