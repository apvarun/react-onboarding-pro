import React, { useState } from 'react';
import { render } from 'react-dom';
import { OnboardingSteps } from "./OnboardingSteps";
import "./ReactOnboardingPro.css"

const OnboardingStep = ({ step, isActive, displayNext, goToNextStep, displayFinish }) => {

  const [form, setForm] = useState(
    Object.assign({},
      {
        invalid: (step.fields || []).reduce((acc, field) => {
          return Boolean(acc | !!field.validation);
        }, false)
      },
      ...(step.fields || []).map(field => ({ [field.name]: '' }))
    )
  )

  if (!isActive) return null;

  let buttonText, buttonFunction;
  if (displayFinish) {
    buttonText = 'Finish';
    buttonFunction = removeContainerElement;
  } else if (displayNext) {
    buttonText = 'Next';
    buttonFunction = goToNextStep;
  }
  if (step.type === 'form' && step.onSubmit) {
    const defaultButtonFunction = buttonFunction;
    buttonFunction = () => {
      if (form.invalid) {
        return;
      }
      const { invalid, ...formData } = form;
      step.onSubmit(formData);
      defaultButtonFunction();
    }
  }

  const validateForm = (name, value) => {
    const validation = step.fields.reduce((data, field) => {
      if (!field.validation) {
        return data & true;
      }
      if (field.name === name) {
        return data & RegExp(field.validation, 'gm').test(value);
      }
      return data & RegExp(field.validation, 'gm').test(form[field.name]);
    }, true);
    // Valid
    return !validation;
  }

  let updateForm;
  if (step.type === 'form') {
    updateForm = (event) => {
      const { name, value } = event.target;
      setForm({
        ...form,
        [name]: value,
        invalid: validateForm(name, value)
      })
    }
  }

  return (
    <div className="rop-step">
      {step.title && <div className="rop-title">{step.title}</div>}
      {step.description && <div className="rop-description">{step.description}</div>}
      {step.type === 'form' && <form className="rop-form">
        {
          step.fields.map((field, index) =>
            <div className="rop-input-container" key={field.name + index}>
              {field.label && <label className="rop-input-label" htmlFor={field.name}>{field.label}</label>}
              <input
                className="rop-input"
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                onChange={updateForm}
              />
            </div>
          )
        }
      </form>}
      <div className="rop-button-container">
        <button className="rop-button" onClick={buttonFunction} disabled={form.invalid}>{buttonText}</button>
      </div>
    </div>
  )
}

const renderOnboardingPopup = (config) => (
  <>
    <div className="react-onboarding-pro-blur-background full-screen" />
    <OnboardingSteps onClickOutside={config.overlayClose && removeContainerElement}>
      {config.steps.map((step, index) => <OnboardingStep step={step} key={index} />)}
    </OnboardingSteps>
  </>
);

const CONTAINER_CLASS = 'react-onboarding-pro-container';

const createContainerElement = () => {
  let containerDiv = document.querySelector(`.${CONTAINER_CLASS}`);
  if (containerDiv) {
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
  if (!Array.isArray(config.steps) || !config.steps.length) {
    console.error('Invalid configuration for Onboarding')
  }
  const container = createContainerElement();
  render(renderOnboardingPopup(config), container);
};

export default reactOnboardingPro;
