import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import data from '../../../../backend/data_analysis/output.json';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [licitacoesPorAno, setLicitacoesPorAno] = useState({});
  const [valoresPorAno, setValoresPorAno] = useState({});
  const [total2023, setTotal2023] = useState(0);
  const [total2024, setTotal2024] = useState(0);

  useEffect(() => {
    const countLicitacoesPorAno = (licitacoes) => {
      const licitacoesFlat = licitacoes.reduce((acc, arr) => acc.concat(arr), []);
      return licitacoesFlat.reduce((acc, licitacao) => {
        const dateStr = licitacao['Data Resultado Compra'];
        if (dateStr) {
          const [day, month, year] = dateStr.split('/').map(Number);
          if (!isNaN(year)) {
            acc[year] = (acc[year] || 0) + 1;
          }
        }
        return acc;
      }, {});
    };

    const sumValoresPorAno = (licitacoes) => {
      const licitacoesFlat = licitacoes.reduce((acc, arr) => acc.concat(arr), []);
      return licitacoesFlat.reduce((acc, licitacao) => {
        const dateStr = licitacao['Data Resultado Compra'];
        const valor = parseFloat(licitacao['Valor Licita��o'].replace(',', '.'));
        if (dateStr && !isNaN(valor)) {
          const [day, month, year] = dateStr.split('/').map(Number);
          if (!isNaN(year)) {
            acc[year] = (acc[year] || 0) + valor;
          }
        }
        return acc;
      }, {});
    };

    const licitacoesPorAno = countLicitacoesPorAno(data);
    const valoresPorAno = sumValoresPorAno(data);

    setLicitacoesPorAno(licitacoesPorAno);
    setValoresPorAno(valoresPorAno);
    setTotal2023(licitacoesPorAno[2023] || 0);
    setTotal2024(licitacoesPorAno[2024] || 0);
  }, []);

  const anos = Object.keys(licitacoesPorAno);
  const quantidades = Object.values(licitacoesPorAno);
  const valores = Object.values(valoresPorAno);

  const chartData = {
    labels: anos,
    datasets: [
      {
        label: 'Quantidade de Licitações',
        data: quantidades,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        yAxisID: 'y1',
      },
      {
        label: 'Valor Total das Licitações',
        data: valores,
        backgroundColor: 'rgba(153,102,255,1)',
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
        fontSize: 20,
      },
      legend: {
        display: true,
        position: 'right',
      },
    },
    scales: {
      y1: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Quantidade de Licitações',
        },
      },
      y2: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Valor Total das Licitações',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '1.5em' }}>Quantidade de Licitações por Ano</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p>Em 2023 tivemos {total2023} licitações.</p>
        <p>Em 2024 tivemos {total2024} licitações.</p>
      </div>
      <div style={{ height: '80%', width: "90%"}}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
