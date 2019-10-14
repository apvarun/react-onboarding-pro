import React from 'react';
import reactOnboardingPro from '../lib';

const App = () => {
 
  const showOnboarding = () => {
    const config = [
      {
        title: 'Welcome to the platform',
        description: 'Navigate around the UI to start using it'
      },
      {
        title: 'Add your institution details',
        description: 'We use this information to uniquely identify your insititution'
      },
    ];
    reactOnboardingPro(config);
  }
  return (
    <div className="container">
      <button onClick={showOnboarding}>Show Onboarding Flow</button>
    </div>
  )
};

export default App;
