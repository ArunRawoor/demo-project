// reducers/portfolioReducer.js

const initialState = {
    projects: [],
    loading: false
  };
  
  const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOAD_PORTFOLIO_REQUEST':
        return { ...state, loading: true };
      case 'LOAD_PORTFOLIO_SUCCESS':
        return { ...state, projects: action.projects, loading: false };
      default:
        return state;
    }
  };
  
  export default portfolioReducer;
  