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
// import data from '../../../../backend/data_collection/database/data.json';
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
  const [total2019, setTotal2019] = useState(0);
  const [total2020, setTotal2020] = useState(0);
  const [total2021, setTotal2021] = useState(0);
  const [total2022, setTotal2022] = useState(0);
  const [total2023, setTotal2023] = useState(0);
  const [total2024, setTotal2024] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const countLicitacoesPorAno = (licitacoes, selectedMonth) => {
      return licitacoes.reduce((acc, licitacao) => {
        const dateStr = licitacao['data_abertura'];
        if (dateStr) {
          const [day, month, year] = dateStr.split('/').map(Number);
          if (
            !isNaN(year) &&
            (selectedMonth === '' || month === selectedMonth)
          ) {
            const countYear = acc[year] || 0;
            acc[year] = countYear + 1;
          }
        }
        return acc;
      }, {});
    };

    const licitacoesPorAno = countLicitacoesPorAno(data, selectedMonth);

    setLicitacoesPorAno(licitacoesPorAno);
    setTotal2019(licitacoesPorAno[2019] || 0);
    setTotal2020(licitacoesPorAno[2020] || 0);
    setTotal2021(licitacoesPorAno[2021] || 0);
    setTotal2022(licitacoesPorAno[2022] || 0);
    setTotal2023(licitacoesPorAno[2023] || 0);
    setTotal2024(licitacoesPorAno[2024] || 0);
  }, [selectedMonth]);

  const anos = Object.keys(licitacoesPorAno);
  const quantidades = Object.values(licitacoesPorAno);

  const chartData = {
    labels: anos,
    datasets: [
      {
        label: 'Quantidade de licitações por ano',
        data: quantidades,
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
          text: 'Quantidade de Licitações',
          font: {
            size: 20,
          },
        },
      },
    },
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(
      event.target.value === '' ? '' : parseInt(event.target.value),
    );
  };

  const months = [
    { id: 1, name: 'Janeiro' },
    { id: 2, name: 'Fevereiro' },
    { id: 3, name: 'Março' },
    { id: 4, name: 'Abril' },
    { id: 5, name: 'Maio' },
    { id: 6, name: 'Junho' },
    { id: 7, name: 'Julho' },
    { id: 8, name: 'Agosto' },
    { id: 9, name: 'Setembro' },
    { id: 10, name: 'Outubro' },
    { id: 11, name: 'Novembro' },
    { id: 12, name: 'Dezembro' },
  ];

  return (
    <div className={style.dashboardContainer}>
      <div className={style.dashboardWrapper}>
        <Bar data={chartData} options={options} className={style.dashboard} />
      </div>
      <div className={style.dashboardDataWrapper}>
        <div className={style.dashboardData}>
          <h1 style={{ textAlign: 'center', fontSize: '1.5em' }}>
            Quantidade de Licitações por Ano
          </h1>
          <p>Em 2019 tivemos {total2019} licitações.</p>
          <p>Em 2020 tivemos {total2020} licitações.</p>
          <p>Em 2021 tivemos {total2021} licitações.</p>
          <p>Em 2022 tivemos {total2022} licitações.</p>
          <p>Em 2023 tivemos {total2023} licitações.</p>
          <p>Em 2024 tivemos {total2024} licitações.</p>
          <div className={style.selector}>
            <label htmlFor="selectMonth">Selecione o Mês:</label>
            <select
              id="selectMonth"
              onChange={handleMonthChange}
              value={selectedMonth}
            >
              <option value="">Todos os Meses</option>
              {months.map((month) => (
                <option key={month.id} value={month.id}>
                  {month.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={style.dashboardText}>
          <p>
            O gráfico representa o número de licitações por ano em Brasília,
            evidenciando um crescimento constante durante os anos analisados,
            mesmo durante a pandemia. Esse aumento pode ser atribuído à
            necessidade contínua de serviços públicos essenciais e à importância
            das licitações na manutenção da transparência e da economia local,
            sustentando empregos e garantindo a eficiência na gestão pública em
            um período desafiador.
          </p>
        </div>
      </div>
    </div>
  );
}
