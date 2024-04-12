
import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import Chart from 'chart.js/auto';


const ChartComponent = ({ labels, data, mej }) => {
  const chartRef = useRef(null);
  const [Suave, setSuave] = useState({});
  const [imageUrl, setImageUrl] = useState(null);

  document.addEventListener('actualizarVariable', function(event) {
    const datosActualizados = event.detail;
    // Establecer los datos actualizados en el estado
    setSuave(datosActualizados);
    console.log(datosActualizados);
  });

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destruir el gráfico anterior si existe
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
    console.log(data);
    

    // Crear un nuevo conjunto de datos
    const datasets = [
      {
        label: 'Datos',
        data: data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Mejor Metodo',
        data: mej,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4,
        fill: false
      }
    ];

    // Agregar Suave a la lista de datasets si hay datos
    if (Object.keys(Suave).length !== 0 && Suave.constructor === Object) {
      // console.log(Suave);
      // datasets.push(Suave);
    }

    // Crear un nuevo gráfico
    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // const imageUrl = chartRef.current.toDataURL('image/png');
    // setImageUrl(imageUrl); 

    // Guardar la instancia del gráfico en la referencia
    chartRef.current.chart = chartInstance;
  }, [labels, data, mej, Suave]);

  return <canvas ref={chartRef} />;
}

export default ChartComponent;