import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import style from '../dashboard/style.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function Dashboard() {
  const [licitacoesPorAno, setLicitacoesPorAno] = useState({});

  useEffect(() => {
    const fetchLicitacoes = async () => {
      try {
        const response = await fetch('https://licitabsbserer-a1c309841042.herokuapp.com/app/dash/quantidade-anual');
        console.log('Response:', response); // Verificando a resposta
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Data received:', data); // Verificando os dados recebidos
        const licitacoesAgrupadas = data.reduce((acc, licitacao) => {
          const { ano, valor_total } = licitacao;
          console.log(`Processing year: ${ano}, value: ${valor_total}`); // Verificando cada valor
          acc[ano] = parseFloat(valor_total); // Converte para número
          return acc;
        }, {});
        console.log('Licitacoes Agrupadas:', licitacoesAgrupadas); // Verificando o objeto final
        setLicitacoesPorAno(licitacoesAgrupadas);
      } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
      }
    };
  
    fetchLicitacoes();
  }, []);
  
  const anos = Object.keys(licitacoesPorAno);
  const valores = Object.values(licitacoesPorAno);

  const chartData = {
    labels: anos,
    datasets: [
      {
        label: 'Valor Total das Licitações por Ano',
        data: valores,
        backgroundColor: 'blue',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Licitações por Ano',
        font: {
          size: 30,
        },
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 18,
          },
        },
      },
    },
    scales: {
      y1: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Valor Total (R$)',
          font: {
            size: 20,
          },
        },
      },
    },
  };

  return (
    <div className={style.dashboardContainer}>
      <div className={style.dashboardWrapper}>
        <Bar data={chartData} options={options} className={style.dashboard} />
      </div>
      <div className={style.dashboardDataWrapper}>
        <div className={style.dashboardData}>
          <h1 style={{ textAlign: 'center', fontSize: '1.5em' }}>
            Valor Total das Licitações por Ano
          </h1>
          {anos.map((ano, index) => (
            <p key={ano}>
              Em {ano}, o valor total das licitações foi de {valores[index].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
