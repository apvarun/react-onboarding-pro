import React from 'react';
import Onboarding from '../lib';

const CustomComponent = ({ disable, setButtonState, setOnSubmit, ...props }) => {

  setOnSubmit(() => {
    console.log('Custom component action completed');
  });
  
  return (
    <div>
      <p>I'm a custom CustomComponent with id {props.id}</p>
      <button onClick={() => setButtonState(!disable)}>Toggle button</button>
    </div>
  )
}

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
              validation: '[a-zA-Z]',
              value: 'John'
            },
            {
              label: 'Last Name',
              name: 'last_name',
              type: 'text',
              placeholder: 'Doe',
              validation: '',
              value: 'Doe'
            },
          ],
          onSubmit: submitName
        },
        {
          type: 'component',
          component: CustomComponent,
          props: {
            id: 100,
          }
        }
      ],
      overlayClose: false
    };
    Onboarding(config);
  }
  return (
    <div className="container">
      <button onClick={showOnboarding}>Show Onboarding Flow</button>
    </div>
  )
};

export default App;
