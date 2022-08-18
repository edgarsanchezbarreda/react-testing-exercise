import React from 'react';
import { getByText, render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

test('Renders a card', () => {
    render(<Card />);
});

test('Matches snapshot of DOM structure', () => {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
});
