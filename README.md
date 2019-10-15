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

...


// Config for the onboarding flow
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

// Display popup
reactOnboardingPro(config);

```
