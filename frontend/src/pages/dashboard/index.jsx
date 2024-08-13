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
    options: {
      legend: {
        labels: {
          padding: 100, // Aumente ou diminua este valor para afastar mais ou menos
        },
      },
    },
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
          '#FF6666', // Vermelho suave
          '#6666FF', // Azul suave
          '#FFFF66', // Amarelo suave
          '#66FF66', // Verde suave
          '#FF7F50', // Coral
          '#9A5BE2', // Azul violeta suave
          '#FF7F7F', // Tomate suave
          '#5A9BD4', // Azul aço suave
          '#FFE066', // Ouro suave
          '#32CD32', // Verde lima
          '#E3425A', // Carmesim suave
          '#5FAEFF'  // Azul-dodger suave
        ],
        
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
      },
    ],
  };
  
  const optionsPizza = {
    plugins: {
      title: {
        display: true,
        text: 'Quantidade Total por Mês',
        font: {
          size: 30,
        },
      },
      legend: {
        display: true,
        position: 'top', // Posiciona a legenda à direita
        labels: {
          font: {
            size: 18,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          },
        },
      },
    },
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
          font: {
            size: 17, // Aumente o tamanho da fonte
          },
        },
      },
      y2: {
        beginAtZero: true,
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Valor Total das Licitações (R$)',
          font: {
            size: 17, // Aumente o tamanho da fonte
          },
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
          font: {
            size: 17, // Tamanho da fonte definido para 17
          },
        },
      },
      y4: {
        beginAtZero: true,
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Valor Total das Licitações (R$)',
          font: {
            size: 17, // Tamanho da fonte definido para 17
          },
        },
      },
    },
  };
  

  return (
    <div className={style.dashboard}>
      <div className={style.chartContainer}>
        <div className={style.chart01}>
          <div className={style.wrapper}>
          <Bar data={chartDataAnual} options={optionsAnual} className={style.chart} />
          <Bar data={chartDataMensal} options={optionsMensal} className={style.chart} />
          </div>
        </div>
        <div className={style.chart02}>
        <div className={style.header}>
        <h1>Selecione o Ano</h1>
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
      <div className={style.total}>
        <p>Total de Licitações: <span>{anoSelecionado === 'Total' ? totalQuantidadeMensal : quantidadePorAno[anoSelecionado]}</span></p>
        <p>Valor Total: R$ <span>{anoSelecionado === 'Total' ? totalValoresMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : valoresPorAno[anoSelecionado]?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
      </div>
      </div>
        <Pie data={chartDataPizza} options= {optionsPizza} className={style.chartPizza} />
        </div>
        </div>
      </div>
  );
}
