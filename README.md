# React Onboarding Pro

Onboarding flow for reducing friction to use the application and improving the workflow

- Highly Customizable
- Support for forms in the popups to collect information for getting started with the application

### Install

```
$ npm i -S react-onboarding-pro
```

### Usage

```js

import reactOnboardingPro from 'react-onboarding-pro';
import "react-onboarding-pro/build/index.css";

...


// Config for the onboarding flow
const config = {
  steps: [
    {
      title: 'Welcome to the platform',
      description: 'Navigate around the UI to start using it'
    },
    {
      title: 'Who are you?',
      description: 'Help the community identify you',
      type: 'form', // Have an embedded form
      fields: [
        {
          label: 'First Name',
          name: 'first_name',
          type: 'text',
          placeholder: 'John',
          validation: '[a-zA-Z]' // Regex expression to test for
        },
        {
          label: 'Last Name',
          name: 'last_name',
          type: 'text',
          placeholder: 'Doe',
          validation: ''
        },
      ],
      onSubmit: submitName // Function to be called when the form is submitted
    }
  ],
  overlayClose: false
};

// Display popup
reactOnboardingPro(config);

```
