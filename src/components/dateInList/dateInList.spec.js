import React from 'react';
import renderer from 'react-test-renderer';
import { DateInList } from "./";

test('Should match snapshot', () => {
    const date = '20th';
    const month = 'Feb';

    const component = renderer.create(
        <DateInList date={date} month={month} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});