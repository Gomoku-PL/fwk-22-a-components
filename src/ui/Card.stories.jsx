
import React from 'react';
import Card from './Card';

export default {
    title: 'ui/Card',
    component: Card,
};

const Template = (args) => <Card {...args} />;

export const WithTitle = Template.bind({});
WithTitle.args = {
    title: 'Player Stats',
    children: <p>This section shows the player statistics.</p>,
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
    children: <p>This card has no title.</p>,
};
