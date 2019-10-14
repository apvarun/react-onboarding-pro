import React from 'react';
import { render } from 'react-dom';
import { OnboardingSteps } from "./OnboardingSteps";
import "./ReactOnboardingPro.css"

const OnboardingStep = ({step, isActive, displayNext, goToNextStep, displayFinish}) => {

  if(!isActive) return null;
  
  return (
    <div className="rop-step">
      {step.title && <div className="rop-title">{step.title}</div>}
      {step.description && <div className="rop-description">{step.description}</div>}
      <div className="rop-button-container">
        {displayFinish && <button className="rop-button" onClick={removeContainerElement}>Finish</button>}
        {displayNext && <button className="rop-button" onClick={goToNextStep}>Next</button>}
      </div>
    </div>
  )
}

const renderOnboardingPopup = (config) => (
  <>
    <div className="react-onboarding-pro-blur-background full-screen" />
    <OnboardingSteps>
      {config.map((step,index) => <OnboardingStep step={step} key={index} />)}
    </OnboardingSteps>
  </>
);

const CONTAINER_CLASS = 'react-onboarding-pro-container';

const createContainerElement = () => {
  let containerDiv = document.querySelector(`.${CONTAINER_CLASS}`);
  if(containerDiv) {
    return containerDiv;
  }
  containerDiv = document.createElement('div');
  containerDiv.classList.add(CONTAINER_CLASS);
  containerDiv.classList.add('full-screen');
  document.body.append(containerDiv);
  return containerDiv;
}

const removeContainerElement = () => {
  let containerDiv = document.querySelector(`.${CONTAINER_CLASS}`);
  containerDiv.remove();
}

const reactOnboardingPro = (config) => {
  if(!Array.isArray(config) || !config.length) {
    console.error('Invalid configuration for Onboarding')
  }
  const container = createContainerElement();
  render(renderOnboardingPopup(config), container);
};

export default reactOnboardingPro;
