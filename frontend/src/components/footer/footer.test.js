import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './';
import { BrowserRouter } from 'react-router-dom';

describe('Deve renderizar os links para as rotas: ', () => {
  test('Licitações', () => {
    render(<BrowserRouter>
      <Footer />
    </BrowserRouter>);
    const linkRoute = screen.getByText('Licitações');
    expect(linkRoute).toBeInTheDocument();
  });
  test('artigos', () => {
    render(<BrowserRouter>
      <Footer />
    </BrowserRouter>);
    const linkRoute = screen.getByText('Conheça o Projeto');
    expect(linkRoute).toBeInTheDocument();
  });
  test('Gráficos', () => {
    render(<BrowserRouter>
      <Footer />
    </BrowserRouter>);
    const linkRoute = screen.getByText('Gráficos');
    expect(linkRoute).toBeInTheDocument();
  });
  test('Fale conosco', () => {
    render(<BrowserRouter>
      <Footer />
    </BrowserRouter>);
    const linkRoute = screen.getByTestId('link-fale-conosco');
    expect(linkRoute).toBeInTheDocument();
  });
  test('Redes sociais', () => {
    render(<BrowserRouter>
      <Footer />
    </BrowserRouter>);
    const linkRoute = screen.getByTestId('link-redes-sociais');
    expect(linkRoute).toBeInTheDocument();
  });
});

test('Deve renderizar a lista de links presentes no componente', () => {
  render(<BrowserRouter>
    <Footer />
  </BrowserRouter>);
  const listaDeLinks = screen.getAllByRole('listitem');
  expect(listaDeLinks).toHaveLength(6);
});

test('Deve renderizar o snapshot da lista de links presentes no componente', () => {
  render(<BrowserRouter>
    <Footer />
  </BrowserRouter>);
  const listaDeLinks = screen.getAllByRole('listitem');
  expect(listaDeLinks).toMatchSnapshot();
});
