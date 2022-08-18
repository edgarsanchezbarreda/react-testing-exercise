import React from 'react';
import { render, fireEvent, queryByTestId } from '@testing-library/react';
import Carousel from './Carousel';

it('Renders without crashing', () => {
    render(<Carousel />);
});

it('Matches snapshot', () => {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
});

it('works when you click on the right arrow', function () {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // expect the first image to show, but not the second
    expect(
        queryByAltText('Photo by Richard Pasquarella on Unsplash')
    ).toBeInTheDocument();
    expect(
        queryByAltText('Photo by Pratik Patel on Unsplash')
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = queryByTestId('right-arrow');
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
        queryByAltText('Photo by Richard Pasquarella on Unsplash')
    ).not.toBeInTheDocument();
    expect(
        queryByAltText('Photo by Pratik Patel on Unsplash')
    ).toBeInTheDocument();
});

it('Goes back an image when clicking left arrow', () => {
    const { queryByTestId, queryByAltText } = render(<Carousel />);
    const rightArrow = queryByTestId('right-arrow');
    const leftArrow = queryByTestId('left-arrow');

    // Move forward one image in carousel.
    fireEvent.click(rightArrow);

    // Expect the second image to show after right arrow click, but not the first image.
    expect(
        queryByAltText('Photo by Richard Pasquarella on Unsplash')
    ).not.toBeInTheDocument();
    expect(
        queryByAltText('Photo by Pratik Patel on Unsplash')
    ).toBeInTheDocument();

    // Move back one image in carousel.
    fireEvent.click(leftArrow);

    // Expect the first image to show after left arrow click, but not the second or third.
    expect(
        queryByAltText('Photo by Pratik Patel on Unsplash')
    ).not.toBeInTheDocument();
    expect(
        queryByAltText('Photo by Richard Pasquarella on Unsplash')
    ).toBeInTheDocument();
});

it('Hides left arrow when on first image and right arrow when on last image', () => {
    const { queryByTestId, queryByAltText } = render(<Carousel />);
    const rightArrow = queryByTestId('right-arrow');
    const leftArrow = queryByTestId('left-arrow');

    // Left arrow is hidden when on first image
    expect(
        queryByAltText('Photo by Richard Pasquarella on Unsplash')
    ).toBeInTheDocument();
    expect(leftArrow).toHaveClass('hidden');

    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    // Right arrow is hidden when on the last image
    expect(
        queryByAltText('Photo by Josh Post on Unsplash')
    ).toBeInTheDocument();
    expect(rightArrow).toHaveClass('hidden');
});
