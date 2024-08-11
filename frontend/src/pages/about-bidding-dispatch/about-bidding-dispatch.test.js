import { render, renderHook, screen } from '@testing-library/react';
import { useState, useEffect } from 'react';
import '@testing-library/jest-dom';
import AboutBiddingDispatch from '.';

describe('Na página Sobre Dispensas de Licitações, deve ser renderizado ', () => {
    test('a lista de títulos do artigo', async () => {
        render(<AboutBiddingDispatch />)
        const lista = await screen.getAllByRole('heading')
        expect(lista).toHaveLength(11)
    })
    test('a lista de parágrafos do artigo', async () => {
        render(<AboutBiddingDispatch />)
        const lista = await screen.getAllByRole('paragraph')
        expect(lista).toHaveLength(10)
    })
    test('a imagem presente no artigo', () => {

    })
})