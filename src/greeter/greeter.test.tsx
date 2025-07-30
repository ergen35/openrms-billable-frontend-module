import React from 'react';
import { render, screen } from '@testing-library/react';
import { useConfig } from '@openmrs/esm-framework';
import { Config } from '../config-schema';
import Greeter from './greeter.component';

const mockUseConfig = jest.mocked(useConfig<Config>);

it('displays the expected default text', () => {
  const config: Config = { 
    casualGreeting: false, 
    whoToGreet: ['World'], 
    billingMetadata: {
      supplierName: 'Clinique St. Jean',
      supplierIFU: '68918198911',
      supplierNIM: 'df57d4c3-cd94-419f-8a35-f19361615ad4'
  } };
  mockUseConfig.mockReturnValue(config);

  render(<Greeter />);

  expect(screen.getByText(/world/i)).toHaveTextContent('hello World!');
});

it('casually greets my friends', () => {
  const config: Config = {
    casualGreeting: true,
    whoToGreet: ['Ariel', 'Barak', 'Callum'],
    billingMetadata: {
      supplierName: 'Clinique St. Adam',
      supplierIFU: '8117118119',
      supplierNIM: 'f19361615ad4'
    }
  };
  mockUseConfig.mockReturnValue(config);

  render(<Greeter />);

  expect(screen.getByText(/ariel/i)).toHaveTextContent('hey Ariel, Barak, Callum!');
});
