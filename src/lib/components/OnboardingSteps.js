import React from "react";

class OnboardingSteps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      totalSteps: this.props.children.length - 1,
    };
  }

  goToPreviousStep = () => {
    this.setState({ currentStep: this.state.currentStep - 1 });
  };

  goToNextStep = () => {
    this.setState({ currentStep: this.state.currentStep + 1 });
  };

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      const { currentStep, totalSteps } = this.state;

      return React.cloneElement(child, {
        isActive: index === currentStep,
        displayPrevious: currentStep > 0,
        displayNext: currentStep < totalSteps,
        displayFinish: currentStep === totalSteps,
        goToPreviousStep: () => this.goToPreviousStep(),
        goToNextStep: () => this.goToNextStep(),
      });
    });

    const clickOutsideFn = this.props.onClickOutside || null;

    return (
      <div className="react-onboarding-pro-popup-container full-screen" onClick={clickOutsideFn}>
        {children}
      </div>
    );
  }
}

export { OnboardingSteps };