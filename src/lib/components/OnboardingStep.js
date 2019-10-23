import React, { useState } from "react"; 
import { removeContainerElement } from "../utils/removeContainer";

export const OnboardingStep = ({ step, isActive, displayNext, goToNextStep, displayFinish }) => {

  let defaultButtonState = false;
  if (step.type === 'form') {
    defaultButtonState = step.fields.reduce((acc, field) => {
      return Boolean(acc | !!field.validation);
    }, false);
  } else if (step.type === 'component') {
    defaultButtonState = true;
  }

  const [form, setForm] = useState(
    Object.assign({},
      {
        invalid: defaultButtonState
      },
      ...step.fields.map(field => ({ [field.name]: '' }))
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

  const setButtonState = (state) => {
    setForm({
      ...form,
      invalid: state
    })
  }

  let CustomComponent = () => <></>;
  if (step.type === 'component' && step.component) {
    CustomComponent = step.component;
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
      <CustomComponent disable={form.invalid} setButtonState={setButtonState} />
      <div className="rop-button-container">
        <button className="rop-button" onClick={buttonFunction} disabled={form.invalid}>{buttonText}</button>
      </div>
    </div>
  )
}