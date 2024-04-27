export const productReducer = (state, action) => {
    console.log(action);
    switch (action.actionType) {
        case 'ADD_PRODUCT_TO_CART':
            return [...state, action.chosenItem];

        case 'REMOVE_PRODUCT_FROM_CART':
            return state.filter(product => product.id !== action.id);
                                                                                                
        default:
            break;
    }
};
