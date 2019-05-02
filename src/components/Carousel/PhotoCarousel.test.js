import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr, findById } from '../../../test/testUtils';

import PhotoCarousel from './PhotoCarousel';

Enzyme.configure({ adapter: new Adapter() });

// Default values for the wrapper component
const defaultProps = { items: [] };
const defaultState = { activeIndex: 0 };

const setup = (props = {}, state = {}) => {
  const carouselProps = { ...defaultProps, ...props };
  const carouselState = { ...defaultState, ...state };
  const wrapper = mount(<PhotoCarousel {...carouselProps} />);

  wrapper.setState({ ...carouselState });
  // wrapper.update();

  return wrapper;
};

describe('carousel component renders properly', () => {
  test('carousel component renders without error', () => {
    // const wrapper = setup();
    // const component = findByTestAttr(wrapper, 'component-carousel');
    // expect(component.length).toBe(1);
  });

  test('carousel renders four slides when four items are on props', () => {
    // const wrapper = setup({
    //   items: [
    //     { src: '', title: '', id: '1' },
    //     { src: '', title: '', id: '2' },
    //     { src: '', title: '', id: '3' },
    //     { src: '', title: '', id: '4' }
    //   ]
    // });
    // const photoSlides = findByTestAttr(wrapper, 'photo-slide');
    // expect(photoSlides.length).toBe(4);
  });

  describe('interactions with carousel controlls', () => {
    const items = [
      { src: '', title: '', id: '1' },
      { src: '', title: '', id: '2' },
      { src: '', title: '', id: '3' }
    ];
    beforeEach(() => {
      // jest.useFakeTimers();
      // wrapper = setup({
      //   items: testItems
      // });
    });

    test('carousel returns to the first image when next is clicked on the last image', () => {
      // const wrapper = setup({ items }, { activeIndex: items.length - 1 });
      // const nextButton = findByTestAttr(wrapper, 'carousel-next-button');
      // const photoSlide = findByTestAttr(wrapper, 'photo-slide');
      // nextButton.simulate('click', { preventDefault() {} });
      // wrapper.instance().onExited();
      // wrapper.setContext({ animating: false });
      // photoSlide.setProps({ timeout: 0 });
      // console.log(photoSlide.debug());
      // setTimeout(() => {
      // expect(nextButton.length).toBe(1);
      // expect(wrapper.state().activeIndex).toBe(0);
      // }, 600);
      // wrapper.update();
    });

    test('carousel goes to the next image when next is clicked and not on the last image', () => {
      // const wrapper = setup({ items }, { activeIndex: 0 });
      // const nextButton = findByTestAttr(wrapper, 'carousel-next-button');
      // jest.setTimeout(600);
      // nextButton.simulate('click', { preventDefault() {} });
      // expect(nextButton.length).toBe(1);
      // expect(wrapper.state().activeIndex).toBe(1);
    });

    test('carousel goes to the previous image when prev is clicked and not on the first image', () => {
      // const wrapper = setup({ items }, { activeIndex: 1 });
      // const prevButton = findById(wrapper, 'carousel-prev-button');
      // jest.setTimeout(700);
      // Wait for carousel animating to finsish.
      // setTimeout(() => {
      //   prevButton.simulate('click', { preventDefault() {} });
      //   expect(prevButton.length).toBe(1);
      //   expect(wrapper.state().activeIndex).toBe(0);
      // }, 600);
    });
  });
});
