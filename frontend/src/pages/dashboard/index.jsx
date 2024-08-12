import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import style from '../dashboard/style.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

export default function Dashboard() {
  const [quantidadePorAno, setQuantidadePorAno] = useState({});
  const [valoresPorAno, setValoresPorAno] = useState({});
  const [quantidadePorMes, setQuantidadePorMes] = useState({});
  const [valoresPorMes, setValoresPorMes] = useState({});
  const [anoSelecionado, setAnoSelecionado] = useState('2024');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quantidadeAnualResponse, valoresAnualResponse] = await Promise.all([
          fetch('https://licitabsbserer-a1c309841042.herokuapp.com/app/dash/quantidade-anual'),
          fetch('https://licitabsbserer-a1c309841042.herokuapp.com/app/dash/valores-anuais'),
        ]);
  
        if (!quantidadeAnualResponse.ok || !valoresAnualResponse.ok) {
          throw new Error('Erro na requisição');
        }
  
        const quantidadeAnualData = await quantidadeAnualResponse.json();
        const valoresAnualData = await valoresAnualResponse.json();
  
        const quantidadeAnualAgrupada = {};
        const valoresAnualAgrupados = {};
  
        quantidadeAnualData.forEach(({ ano, total_licitacoes }) => {
          const quantidadeNumerica = parseFloat(total_licitacoes);
          if (!isNaN(quantidadeNumerica)) {
            quantidadeAnualAgrupada[ano] = (quantidadeAnualAgrupada[ano] || 0) + quantidadeNumerica;
          }
        });
  
        valoresAnualData.forEach(({ ano, valor_total }) => {
          const valorNumerico = parseFloat(valor_total);
          if (!isNaN(valorNumerico)) {
            valoresAnualAgrupados[ano] = valorNumerico;
          }
        });
  
        setQuantidadePorAno(quantidadeAnualAgrupada);
        setValoresPorAno(valoresAnualAgrupados);
      } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
      }
    };
  
    fetchData();
  }, []);


  const anos = Object.keys(valoresPorAno);
  const valoresAnuais = Object.values(valoresPorAno);
  const quantidadesAnuais = anos.map(ano => quantidadePorAno[ano] || 0);
  const totalQuantidadeAnual = Object.values(quantidadePorAno).reduce((acc, curr) => acc + curr, 0);


  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const quantidadesMensais = meses.map((_, index) => quantidadePorMes[`${anoSelecionado}-${index + 1}`] || 0);
  const valoresMensaisSelecionado = meses.map((_, index) => valoresPorMes[`${anoSelecionado}-${index + 1}`] || 0);

  const totalQuantidadeMensal = meses.map((_, index) => quantidadesMensais[index] || 0);
  const totalValoresMensal = meses.map((_, index) => valoresMensaisSelecionado[index] || 0);

  

  const chartDataAnual = {
    labels: anos,
    datasets: [
      {
        label: 'Quantidade de Licitações por Ano',
        data: quantidadesAnuais,
        backgroundColor: 'cyan',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        yAxisID: 'y1',
      },
      {
        label: 'Valor Total das Licitações por Ano (R$)',
        data: valoresAnuais,
        backgroundColor: '#FF3131',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        yAxisID: 'y2',
      },
    ],
  };

  const chartDataMensal = {
    labels: meses,
    datasets: [
      {
        label: 'Quantidade de Licitações por Mês',
        data: quantidadesMensais,
        backgroundColor: '#4FFFB0',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        yAxisID: 'y3',
      },
      {
        label: 'Valor Total das Licitações por Mês (R$)',
        data: valoresMensaisSelecionado,
        backgroundColor: '#FA5F55',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        yAxisID: 'y4',
      },
    ],
  };

  const chartDataPizza = {
    labels: meses,
    datasets: [
      {
        label: 'Quantidade Total por Mês',
        data: totalQuantidadeMensal,
        backgroundColor: [
        '#FFB3B3',
'#B3E5FC',
'#FFF59D',
'#C8E6C9',
'#D1C4E9',
'#FFAB91',
'#FFE0B2',
'#B3E5FC',
'#E1BEE7',
'#FFAB91',
'#D1C4E9',
'#C5E1A5'
        ],
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
      },
    ],
  };

  const optionsAnual = {
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
            size: 18,
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
            size: 18,
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const optionsMensal = {
    plugins: {
      title: {
        display: true,
        text: 'Licitações por Mês',
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
      y3: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Quantidade de Licitações',
          font: {
            size: 18,
          },
        },
      },
      y4: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Valor Total (R$)',
          font: {
            size: 18,
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const optionsPizza = {
    plugins: {
      title: {
        display: true,
        text: 'Total Mensal de Licitações',
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
  };

  return (
    <div className={style.dashboard}>
      <div className={style.chartContainer}>
      <h2>Total Anual</h2>
      <div>Total Quantidade Anual de Todos os Anos: {totalQuantidadeAnual}</div>
      {/* Adicione aqui o gráfico ou outras informações, se necessário */}
      </div>
      <div className={style.chart}>
        <Bar data={chartDataAnual} options={optionsAnual} />
      </div>
      <div className={style.monthsCharts}>
      <div className={style.chart}>
        <Bar data={chartDataMensal} options={optionsMensal} />
        <div className={style.selector}>
        <label htmlFor="ano">Escolha o Ano:</label>
        <select
          id="ano"
          value={anoSelecionado}
          onChange={(e) => setAnoSelecionado(e.target.value)}
        >
          {anos.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className={style.chart}>
        <Pie data={chartDataPizza} options={optionsPizza} />
      </div>
    </div>
    </div>
  );
}
