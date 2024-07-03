import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import data from '../../../../backend/data_collection/database/data.json';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [licitacoesPorAno, setLicitacoesPorAno] = useState({});
  const [total2019, setTotal2019] = useState(0);
  const [total2020, setTotal2020] = useState(0);
  const [total2021, setTotal2021] = useState(0);
  const [total2022, setTotal2022] = useState(0);
  const [total2023, setTotal2023] = useState(0);
  const [total2024, setTotal2024] = useState(0);
  const [showMonths, setShowMonths] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const countLicitacoesPorAno = (licitacoes) => {
      return licitacoes.reduce((acc, licitacao) => {
        const dateStr = licitacao['data_abertura'];
        if (dateStr) {
          const [day, month, year] = dateStr.split('/').map(Number);
          if (!isNaN(year) && (!showMonths || selectedMonth === '' || month === selectedMonth)) {
            const countYear = acc[year] || 0;
            acc[year] = countYear + 1;
          }
        }
        return acc;
      }, {});
    };

    const licitacoesPorAno = countLicitacoesPorAno(data);

    setLicitacoesPorAno(licitacoesPorAno);
    setTotal2019(licitacoesPorAno[2019] || 0);
    setTotal2020(licitacoesPorAno[2020] || 0);
    setTotal2021(licitacoesPorAno[2021] || 0);
    setTotal2022(licitacoesPorAno[2022] || 0);
    setTotal2023(licitacoesPorAno[2023] || 0);
    setTotal2024(licitacoesPorAno[2024] || 0);
  }, [showMonths, selectedMonth]);

  const anos = Object.keys(licitacoesPorAno);
  const quantidades = Object.values(licitacoesPorAno);

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
    },
  };

  const handleMonthFilter = (month) => {
    if (month === selectedMonth) {
      setSelectedMonth('');
    } else {
      setSelectedMonth(month);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '1.5em' }}>Quantidade de Licitações por Ano</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p>Em 2019 tivemos {total2019} licitações.</p>
        <p>Em 2020 tivemos {total2020} licitações.</p>
        <p>Em 2021 tivemos {total2021} licitações.</p>
        <p>Em 2022 tivemos {total2022} licitações.</p>
        <p>Em 2023 tivemos {total2023} licitações.</p>
        <p>Em 2024 tivemos {total2024} licitações.</p>
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => setShowMonths(!showMonths)}>
            {showMonths ? 'Ocultar Meses' : 'Mostrar Meses'}
          </button>
          {showMonths && (
            <div>
              <button onClick={() => handleMonthFilter(1)}>Janeiro</button>
              <button onClick={() => handleMonthFilter(2)}>Fevereiro</button>
              <button onClick={() => handleMonthFilter(3)}>Março</button>
              <button onClick={() => handleMonthFilter(4)}>Abril</button>
              <button onClick={() => handleMonthFilter(5)}>Maio</button>
              <button onClick={() => handleMonthFilter(6)}>Junho</button>
              <button onClick={() => handleMonthFilter(7)}>Julho</button>
              <button onClick={() => handleMonthFilter(8)}>Agosto</button>
              <button onClick={() => handleMonthFilter(9)}>Setembro</button>
              <button onClick={() => handleMonthFilter(10)}>Outubro</button>
              <button onClick={() => handleMonthFilter(11)}>Novembro</button>
              <button onClick={() => handleMonthFilter(12)}>Dezembro</button>
              <button onClick={() => handleMonthFilter('')}>Todos os Meses</button>
            </div>
          )}
        </div>
      </div>
      <div style={{ height: '80%', width: '90%' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
