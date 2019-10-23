import React from 'react';
import reactOnboardingPro from '../lib';

const App = () => {
 
  const showOnboarding = () => {
    const submitName = (formData) => {
      console.log('Name details submitted.')
      console.log(formData);
    }
    const config = {
      steps: [
        {
          title: 'Welcome to the platform',
          description: 'Navigate around the UI to start using it',
        },
        {
          title: 'Add your profile details',
          description: 'We use this information in order to tailor your experience',
        },
        {
          title: 'Who are you?',
          description: 'Help the community identify you',
          type: 'form',
          fields: [
            {
              label: 'First Name',
              name: 'first_name',
              type: 'text',
              placeholder: 'John',
              validation: '[a-zA-Z]'
            },
            {
              label: 'Last Name',
              name: 'last_name',
              type: 'text',
              placeholder: 'Doe',
              validation: ''
            },
          ],
          onSubmit: submitName
        }
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
