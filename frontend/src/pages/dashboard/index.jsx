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
  const [quantidadePorMes, setQuantidadePorMes] = useState({});
  const [valoresPorMes, setValoresPorMes] = useState({});
  const [anoSelecionado, setAnoSelecionado] = useState('2024'); // Definido para o ano atual ou ano desejado

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
  const quantidadesMensais = meses.map((_, index) => quantidadePorMes[`${anoSelecionado}-${index + 1}`] || 0);
  const valoresMensaisSelecionado = meses.map((_, index) => valoresPorMes[`${anoSelecionado}-${index + 1}`] || 0);

  const chartDataAnual = {
    labels: anos,
    datasets: [
      {
        label: 'Quantidade de Licitações por Ano',
        data: quantidadesAnuais,
        backgroundColor: 'blue',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        yAxisID: 'y1',
      },
      {
        label: 'Valor Total das Licitações por Ano (R$)',
        data: valoresAnuais,
        backgroundColor: 'red',
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
        backgroundColor: 'green',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        yAxisID: 'y3',
      },
      {
        label: 'Valor Total das Licitações por Mês (R$)',
        data: valoresMensaisSelecionado,
        backgroundColor: 'orange',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        yAxisID: 'y4',
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
            size: 20,
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
            size: 20,
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className={style.dashboardContainer}>
      <div className={style.dashboardWrapper}>
        <Bar data={chartDataAnual} options={optionsAnual} className={style.dashboard} />
      </div>
      <div className={style.dashboardWrapper}>
        <select
          value={anoSelecionado}
          onChange={(e) => setAnoSelecionado(e.target.value)}
          className={style.selectYear}
        >
          {anos.map(ano => (
            <option key={ano} value={ano}>{ano}</option>
          ))}
        </select>
        <Bar data={chartDataMensal} options={optionsMensal} className={style.dashboard} />
      </div>
    </div>
  );
}
