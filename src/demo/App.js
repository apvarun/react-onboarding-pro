import React from 'react';
import reactOnboardingPro from '../lib';

const App = () => {
 
  const showOnboarding = () => {
    const config = {
      steps: [
        {
          title: 'Welcome to the platform',
          description: 'Navigate around the UI to start using it'
        },
        {
          title: 'Add your profile details',
          description: 'We use this information in order to tailor your experience'
        },
      ],
      overlayClose: false
    };
    reactOnboardingPro(config);
  }
  return (
    <div className="container">
      <button onClick={showOnboarding}>Show Onboarding Flow</button>
    </div>
  )
};

export default App;
