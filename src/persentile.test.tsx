import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Percentile from './percentile';

describe('Percentile first component', () => {

    

    test('should be rendered', () => {
        render(<Percentile/>);
        const percentileelement = screen.getByLabelText(/inputone/i);

        expect(percentileelement).toBeInTheDocument();
        expect((percentileelement as HTMLInputElement).className)
        .toEqual(expect.stringContaining('percentile'));
    });

    test('should change value', () => {
        render(<Percentile/>);
        const topNelement = screen.getByLabelText(/inputone/i);

        fireEvent.change(topNelement, { target: { value: '10' } })

        expect((topNelement as HTMLInputElement).value).toEqual("10");
        expect((topNelement as HTMLInputElement).className)
        .not.toEqual(expect.stringContaining('invalid'));
    });

    test.skip('should invalide state when value isnegative', () => {
        render(<Percentile/>);
        const topNelement = screen.getByLabelText(/inputone/i);

        fireEvent.change(topNelement, { target: { value: '-5' } })

        
        expect((topNelement as HTMLInputElement).className)
        .toEqual(expect.stringContaining('invalid'));
    });
    

    

    
})


