import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { biddingTypes } from './bidding-types';

test('O array biddingTypes deve conter dois tipos de licitações', () => {
    expect(biddingTypes).toHaveLength(2)
})