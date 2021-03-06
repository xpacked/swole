import React from 'react';
import { SignUpPage } from '.';
import { renderComponentAndCreateDriver } from './index.driver';
import {} from '../../hooks/useAuth';

const mockedSignup = jest.fn();

jest.mock('../../hooks/useAuth', () => {
  return {
    useAuth: () => {
      return {
        signUp: mockedSignup
      };
    }
  };
});

describe('Sign up screen', () => {
  it('Renders correctly', async () => {
    const driver = renderComponentAndCreateDriver(<SignUpPage />);

    const email = await driver.get.emailInput();
    const password = await driver.get.passwordInput();
    const passwordConfirmation = await driver.get.confirmPasswordInput();
    const submitButton = await driver.get.submitButton();

    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(passwordConfirmation).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  it('Signs the user up', async () => {
    const mockEmail = 'test@mail.com';
    const mockPassword = '111111';
    const driver = renderComponentAndCreateDriver(<SignUpPage />);

    await driver.perform.typeEmail(mockEmail);
    await driver.perform.typePassword(mockPassword);
    await driver.perform.typeConfirmation(mockPassword);
    await driver.perform.tapSubmitButton();

    expect(mockedSignup).toHaveBeenCalledWith({ email: mockEmail, password: mockPassword });
  });

  it('Does not sign the user up when password and confirmation are misaligned', async () => {
    const mockEmail = 'test@mail.com';
    const mockPassword = '111111';
    const mockConfirmation = '222222';
    const driver = renderComponentAndCreateDriver(<SignUpPage />);

    await driver.perform.typeEmail(mockEmail);
    await driver.perform.typePassword(mockPassword);
    await driver.perform.typeConfirmation(mockConfirmation);
    await driver.perform.tapSubmitButton();
    const error = await driver.get.passwordConfirmationError();

    expect(mockedSignup).not.toHaveBeenCalled();
    expect(error).toBeDefined();
  });

  it('Does not sign the user up when the email is invalid', async () => {
    const mockEmail = 'invalidEmail';
    const mockPassword = '111111';
    const driver = renderComponentAndCreateDriver(<SignUpPage />);

    await driver.perform.typeEmail(mockEmail);
    await driver.perform.typePassword(mockPassword);
    await driver.perform.typeConfirmation(mockPassword);
    await driver.perform.tapSubmitButton();
    const error = await driver.get.invalidEmailError();

    expect(mockedSignup).not.toHaveBeenCalled();
    expect(error).toBeDefined();
  });

  it('Does not sign the user in when password is shorter than 6 characters', async () => {
    const mockEmail = 'test@mail.com';
    const mockPassword = '1';
    const driver = renderComponentAndCreateDriver(<SignUpPage />);

    await driver.perform.typeEmail(mockEmail);
    await driver.perform.typePassword(mockPassword);
    await driver.perform.typeConfirmation(mockPassword);
    await driver.perform.tapSubmitButton();
    const error = await driver.get.passwordLengthError();

    expect(mockedSignup).not.toHaveBeenCalled();
    expect(error).toBeDefined();
  });
});