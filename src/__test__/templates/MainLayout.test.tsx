/* eslint-disable testing-library/no-node-access */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import React from 'react';

import { MainLayout } from '../../components/templates/MainLayout/MainLayout';

jest.mock('../../components/common/Header', () => () => (
  <header data-testid="header">Mocked Header</header>
));
jest.mock('../../components/common/Footer', () => () => (
  <footer data-testid="footer">Mocked Footer</footer>
));

describe('MainLayout Component', () => {
  it('should render children correctly', () => {
    render(
      <MainLayout>
        <div data-testid="content">Main Content</div>
      </MainLayout>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should apply default wrapper styles', () => {
    render(
      <MainLayout>
        <div>Main Content</div>
      </MainLayout>
    );

    const wrapper = screen.getByRole('main').parentElement; // The <div> wrapping everything
    expect(wrapper).toHaveClass('flex flex-col min-h-screen');
  });

  it('should merge custom className with default styles', () => {
    render(
      <MainLayout className="custom-class">
        <div>Main Content</div>
      </MainLayout>
    );

    const wrapper = screen.getByRole('main').parentElement; // The <div> wrapping everything
    expect(wrapper).toHaveClass('flex flex-col min-h-screen custom-class');
  });
});
