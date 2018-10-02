const productReducer = (state = '', {type, payload}) => {
	switch (type) {
		case 'updateProduct':
			return payload.user
	}
	return state;
}

export default productReducer;