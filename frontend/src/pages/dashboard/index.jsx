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
  const [quantidadePorAno, setQuantidadePorAno] = useState({});
  const [valoresPorAno, setValoresPorAno] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quantidadeResponse, valoresResponse] = await Promise.all([
          fetch('https://licitabsbserer-a1c309841042.herokuapp.com/app/dash/quantidade-anual'),
          fetch('https://licitabsbserer-a1c309841042.herokuapp.com/app/dash/valores-anuais'),
        ]);

        if (!quantidadeResponse.ok || !valoresResponse.ok) {
          throw new Error('Erro na requisição');
        }

        const quantidadeData = await quantidadeResponse.json();
        const valoresData = await valoresResponse.json();

        const quantidadeAgrupada = {};
        const valoresAgrupados = {};

        quantidadeData.forEach(({ ano, total_licitacoes }) => {
          const quantidadeNumerica = parseFloat(total_licitacoes);
          if (!isNaN(quantidadeNumerica)) {
            quantidadeAgrupada[ano] = (quantidadeAgrupada[ano] || 0) + quantidadeNumerica;
          }
        });

        valoresData.forEach(({ ano, valor_total }) => {
          const valorNumerico = parseFloat(valor_total);
          if (!isNaN(valorNumerico)) {
            valoresAgrupados[ano] = valorNumerico;
          }
        });

        setQuantidadePorAno(quantidadeAgrupada);
        setValoresPorAno(valoresAgrupados);
      } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
      }
    };

    fetchData();
  }, []);

  const anos = Object.keys(valoresPorAno);
  const valores = Object.values(valoresPorAno);
  const quantidades = anos.map(ano => quantidadePorAno[ano] || 0);

  const chartData = {
    labels: anos,
    datasets: [
      {
        label: 'Quantidade de Licitações por Ano',
        data: quantidades,
        backgroundColor: 'blue',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        yAxisID: 'y1',
      },
      {
        label: 'Valor Total das Licitações por Ano (R$)',
        data: valores,
        backgroundColor: 'red',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        yAxisID: 'y2',
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
          text: 'Quantidade de Licitações',
          font: {
            size: 20,
          },
        },
      },
      y2: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Valor Total (R$)',
          font: {
            size: 20,
          },
        },
        grid: {
          drawOnChartArea: false, // Evita a sobreposição das linhas de grade
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
        {/* Opcional: Adicione informações adicionais se necessário */}
      </div>
    </div>
  );
}
