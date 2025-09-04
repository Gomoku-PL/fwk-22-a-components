import React from 'react';
import Board from './Board.jsx';

export default {
    title: 'Game/Board',
    component: Board,
    argTypes: {
        size: {
            control: { type: 'number', min: 5, max: 20, step: 1 },
            description: 'Board size (NxN)',
            defaultValue: 15,
        },
    },
};

const Template = (args) => <Board {...args} />;

export const Default = Template.bind({});
Default.args = {
    size: 15,
};

export const SmallBoard = Template.bind({});
SmallBoard.args = {
    size: 8,
};
