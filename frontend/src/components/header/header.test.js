import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '.';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Deve renderizar os links das rotas: ', () => {
  test('Licitações', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const linkRoute = screen.getAllByText('Licitações');
    expect(linkRoute).toHaveLength(3);
  });
  test('Conheça o Projeto', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const linkRoute = screen.getAllByText('Conheça o Projeto');
    expect(linkRoute[0]).toBeInTheDocument();
  });
  test('Gráficos', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const linkRoute = screen.getAllByText('Gráficos');
    expect(linkRoute).toHaveLength(3);
  });
});

test('Deve renderizar a lista de links presentes no componente', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
  const listaDeLinks = screen.getAllByRole('listitem');
  expect(listaDeLinks).toHaveLength(8);
});

test('Deve renderizar o snapshot da lista de links do componente', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
  const listaDeLinks = screen.getAllByRole('listitem');
  expect(listaDeLinks).toMatchSnapshot();
});

describe('Deve renderizar um campo de input', () => {
  test('no documento', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const campoTexto = screen.getByPlaceholderText('Pesquise aqui');
    expect(campoTexto).toBeInTheDocument();
  });

  test('de type: text', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const campoTexto = screen.getByPlaceholderText('Pesquise aqui');
    expect(campoTexto).toBeInTheDocument('type', 'text');
  });

  test(' de type: text que pode ser preenchido', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const campoTexto = screen.getByPlaceholderText('Pesquise aqui');
    await userEvent.type(campoTexto, 'inputtest');
    expect(campoTexto).toHaveValue('inputtest');
  });
});
