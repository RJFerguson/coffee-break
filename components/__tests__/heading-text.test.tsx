// HeadingText.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeadingText from '../heading-text';


describe('HeadingText Component', () => {
  it('renders the main heading text', () => {
    render(<HeadingText>Test Heading</HeadingText>);
    const headingElement = screen.getByText('Test Heading');
    expect(headingElement.innerHTML).toEqual('Test Heading');
  });


});
