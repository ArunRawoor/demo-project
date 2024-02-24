// actions/portfolioActions.js

export const loadPortfolio = () => {
    return (dispatch) => {
      dispatch({ type: 'LOAD_PORTFOLIO_REQUEST' });
  
      // Simulate API call
      setTimeout(() => {
        const projects = [
          { id: 1, title: 'Project 1', description: 'Description of Project 1', techStack: 'React, Redux' },
          { id: 2, title: 'Project 2', description: 'Description of Project 2', techStack: 'Node.js, Express' },
          { id: 3, title: 'Project 3', description: 'Description of Project 3', techStack: 'Python, Django' }
        ];
  
        dispatch({ type: 'LOAD_PORTFOLIO_SUCCESS', projects });
      }, 2000); // Simulating delay
    };
  };
  