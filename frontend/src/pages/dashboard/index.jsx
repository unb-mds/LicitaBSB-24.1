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
  const [totalQuantidadeAnual, setTotalQuantidadeAnual] = useState(0);
  const [totalValorAnual, setTotalValorAnual] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quantidadeAnualResponse, valoresAnualResponse, quantidadeMensalResponse, valoresMensalResponse] = await Promise.all([
          fetch('https://licitabsbserer-a1c309841042.herokuapp.com/app/dash/quantidade-anual'),
          fetch('https://licitabsbserer-a1c309841042.herokuapp.com/app/dash/valores-anuais'),
          fetch('https://licitabsbserer-a1c309841042.herokuapp.com/app/dash/quantidade-mensal'),
          fetch('https://licitabsbserer-a1c309841042.herokuapp.com/app/dash/valores-mensais'),
        ]);

        if (!quantidadeAnualResponse.ok || !valoresAnualResponse.ok || !quantidadeMensalResponse.ok || !valoresMensalResponse.ok) {
          throw new Error('Erro na requisição');
        }

        const quantidadeAnualData = await quantidadeAnualResponse.json();
        const valoresAnualData = await valoresAnualResponse.json();
        const quantidadeMensalData = await quantidadeMensalResponse.json();
        const valoresMensalData = await valoresMensalResponse.json();

        const quantidadeAnualAgrupada = {};
        const valoresAnualAgrupados = {};
        const quantidadeMensalAgrupada = {};
        const valoresMensalAgrupados = {};

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

        quantidadeMensalData.forEach(({ ano, mes, total_licitacoes }) => {
          const key = `${ano}-${mes}`;
          const quantidadeNumerica = parseFloat(total_licitacoes);
          if (!isNaN(quantidadeNumerica)) {
            quantidadeMensalAgrupada[key] = (quantidadeMensalAgrupada[key] || 0) + quantidadeNumerica;
          }
        });

        valoresMensalData.forEach(({ ano, mes, valor_total }) => {
          const key = `${ano}-${mes}`;
          const valorNumerico = parseFloat(valor_total);
          if (!isNaN(valorNumerico)) {
            valoresMensalAgrupados[key] = valorNumerico;
          }
        });

        setQuantidadePorAno(quantidadeAnualAgrupada);
        setValoresPorAno(valoresAnualAgrupados);
        setQuantidadePorMes(quantidadeMensalAgrupada);
        setValoresPorMes(valoresMensalAgrupados);

        // Cálculo do total anual
        const totalQuantidadeAnual = Object.values(quantidadeAnualAgrupada).reduce((acc, curr) => acc + curr, 0);
        const totalValorAnual = Object.values(valoresAnualAgrupados).reduce((acc, curr) => acc + curr, 0);

        setTotalQuantidadeAnual(totalQuantidadeAnual);
        setTotalValorAnual(totalValorAnual);

      } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
      }
    };

    fetchData();
  }, []);


  const anos = Object.keys(valoresPorAno);
  const valoresAnuais = Object.values(valoresPorAno);
  const quantidadesAnuais = anos.map(ano => quantidadePorAno[ano] || 0);

  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  let quantidadesMensais, valoresMensaisSelecionado;

  if (anoSelecionado === 'Total') {
    quantidadesMensais = meses.map((_, index) => 
      anos.reduce((acc, ano) => acc + (quantidadePorMes[`${ano}-${index + 1}`] || 0), 0)
    );
    valoresMensaisSelecionado = meses.map((_, index) => 
      anos.reduce((acc, ano) => acc + (valoresPorMes[`${ano}-${index + 1}`] || 0), 0)
    );
  } else {
    quantidadesMensais = meses.map((_, index) => quantidadePorMes[`${anoSelecionado}-${index + 1}`] || 0);
    valoresMensaisSelecionado = meses.map((_, index) => valoresPorMes[`${anoSelecionado}-${index + 1}`] || 0);
  }

  const totalQuantidadeMensal = quantidadesMensais.reduce((acc, curr) => acc + curr, 0);
  const totalValoresMensal = valoresMensaisSelecionado.reduce((acc, curr) => acc + curr, 0);

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
        data: quantidadesMensais,
        backgroundColor: [
          '#FFB3B3', '#B3E5FC', '#FFF59D', '#C8E6C9', '#D1C4E9', '#FFAB91',
          '#FFE0B2', '#B3E5FC', '#E1BEE7', '#FFAB91', '#D1C4E9', '#C5E1A5'
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
      },
    },
    scales: {
      y1: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Quantidade de Licitações',
        },
      },
      y2: {
        beginAtZero: true,
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Valor Total das Licitações (R$)',
        },
      },
    },
  };

  const optionsMensal = {
    plugins: {
      title: {
        display: true,
        text: `Licitações por Mês - ${anoSelecionado === 'Total' ? 'Todos os Anos' : `Ano ${anoSelecionado}`}`,
        font: {
          size: 30,
        },
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    scales: {
      y3: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Quantidade de Licitações',
        },
      },
      y4: {
        beginAtZero: true,
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Valor Total das Licitações (R$)',
        },
      },
    },
  };

  return (
    <div className={style.dashboard}>
      <div className={style.header}>
        <h1>Dashboard de Licitações</h1>
        <select
          value={anoSelecionado}
          onChange={e => setAnoSelecionado(e.target.value)}
          className={style.select}
        >
          <option value="Total">Total</option>
          {anos.map(ano => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
      </div>
      <div className={style.total}>
        <p> <strong>Total de Licitações: {anoSelecionado === 'Total' ? totalQuantidadeMensal : quantidadePorAno[anoSelecionado]}</strong></p>
        <p><strong>Valor Total: R$ {anoSelecionado === 'Total' ? totalValoresMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : valoresPorAno[anoSelecionado]?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></p>
      </div>
      <div className={style.chartContainer}>
        <div className={style.chart01}>
        <Bar data={chartDataAnual} options={optionsAnual} className={style.chart} />
        </div>
        <div className={style.chart02}>
        <Bar data={chartDataMensal} options={optionsMensal} className={style.chart} />
        <Pie data={chartDataPizza} className={style.chart} />
        </div>
      </div>
    </div>
  );
}
