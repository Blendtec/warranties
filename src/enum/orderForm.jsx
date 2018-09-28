const orderForm = Object.freeze({
    personal: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name',
                    errormessage: 'First Name is Required'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                classes: 'grid__item large--one-half medium--one-half small--one-half registration-top-padding'
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name',
                    errormessage: 'Last Name is Required'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                classes: 'grid__item large--one-half medium--one-half small--one-half registration-top-padding'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Addres',
                    errormessage: 'Street Address is Required'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                classes: 'grid__item registration-top-padding'
            },
            apt: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Apt/Suite'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                classes: 'grid__item large--one-half medium--one-half small--one-half registration-top-padding'
            },
            City: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                    errormessage: 'City is Required'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                classes: 'grid__item large--one-half medium--one-half small--one-half registration-top-padding'
            },
            state: {
                elementType: 'states',
                elementConfig: {
                    placeholder: 'State',
                    errormessage: 'Please Select your State',
                    options: [
                    ]
                },
                value: '',
                validation: {},
                valid: false,
                classes: 'grid__item large--one-half medium--one-half small--one-half registration-top-padding'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code',
                    errormessage: 'Please Enter your Zip Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                classes: 'grid__item large--one-half medium--one-half small--one-half registration-top-padding'
            },
            country: {
                elementType: 'select',
                elementConfig: {
                    placeholder: 'Country',
                    errormessage: 'Country is Required',
                    options: [
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                classes: 'grid__item registration-top-padding'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                    errormessage: 'Please enter a valid Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                classes: 'grid__item registration-top-padding'
            },
            phone_number: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone Number',
                    errormessage: null
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                classes: 'grid__item registration-top-padding'
            },
            purchaseDate: {
                elementType: 'date',
                elementConfig: {
                	type: 'text',
                	placeholder: 'Date of Purchase',
                    errormessage: 'Date of Purchase is required'
                },
                value: null,
                validation: {
                	pastDate: true
                },
                valid: false,
                touched: false,
                classes: 'grid__item registration-top-padding'
            }
        }
    });

export default orderForm;
