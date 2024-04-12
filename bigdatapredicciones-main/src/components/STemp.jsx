import React from "react";
import { useState, useEffect } from 'react';
import Table from './Table';
import ChartComponent from './Chart';
import TablaBody2 from './TablaBody2';
import TablaBody3 from './TablaBody3';
// import { Page, Text, View, Document, PDFDownloadLink } from '@react-pdf/renderer';
// import PdfB from "./CapturePageButton";
import PDFButton from "./CapturePageButton";
import SendEmailButton from "./SendEmailButton";
// import { json } from "react-router-dom";



export default function STemp() {

      const [tableData, setTableData] = useState([]);
      const [chartLabels, setChartLabels] = useState([]);
      const [chartData, setChartData] = useState([]);
      const [PTMAC, setPTMAC] = useState([]);
      const [Perr, setPerr] = useState([]);
      const [mej, setmej] = useState([]);
      const [Mat, setMat] = useState([]);
      
    
      useEffect(() => {
        let matriz = sessionStorage.getItem('matriz');
        let pmd = sessionStorage.getItem('pmd');
        pmd = parseInt(pmd);
        let pms = sessionStorage.getItem('pms');
        pms = parseInt(pms);
        matriz = JSON.parse(matriz);
        setMat(matriz);
        // console.log(matriz);

        // Lógica de cálculo de la matriz aquí
        let Perr = [];
        let PTMAC=[];
        let n = matriz.length-1;
        let c = matriz[0][1];
        let pps=0;
        let d = 1;
        let c1=0, c2=0, c3=0, c4=0, c5=0;
        let sumerr1=0, sumerr2=0, sumerr3=0, sumerr4 = 0, sumerr5 = 0; 
    
        for (let i = 1; i < matriz.length; i++) {
          d++;
          c = c + matriz[i][1];
          const promedio = c / d;
          pps=pps + matriz[i][1];
          const errorAbs = matriz[i][1] - promedio;
          sumerr1+=errorAbs;
          c1++;
          matriz[i][2] = parseFloat(promedio.toFixed(2)); // PromedioSimple 
          matriz[i][3] = parseFloat(Math.abs(errorAbs).toFixed(2));// Error absoluto
        }
        let proyps=pps/c1;
        PTMAC[0]= parseFloat(Math.abs(proyps).toFixed(2));
        Perr.push(sumerr1/c1);
    
        // Cálculo del Promedio Móvil Simple (PMS)
        let ppms=0;
        let vrec = pms; // Valor de recurrencia
        // console.log(vrec);
        for (let i = 0; i < matriz.length - vrec; i++) {
          let c = 0;
          pms=0;
          for (let j = 0; j < vrec; j++) {
              c += matriz[i+j][1];
          }
          let promedio = c / vrec; 
          matriz[i+vrec][4] = parseFloat(promedio.toFixed(2));
          let errorAbs = matriz[i+vrec][1] - matriz[i+vrec][4];
          sumerr2 += errorAbs;
          c2++;
          matriz[i+vrec][5] = parseFloat(Math.abs(errorAbs).toFixed(2));
        }
        let nppms = matriz.length-vrec;

        for(let i=nppms; i<matriz.length; i++)
        {
          ppms += matriz[i][1];
        }

        let proypms= ppms/vrec;
        PTMAC[1]= parseFloat(Math.abs(proypms).toFixed(2));

        Perr.push(sumerr2 / c2);
    
        //Promedio Movil Doble
      let vrecj = pmd; //valor recibido j 
      // console.log(vrecj);
      let t = matriz.length - vrec;
    
      for (let i = 0; i < t; i++) {
          let c = 0;
          if ((i + vrecj + 1) > (vrecj + vrec)) {
              for (let j = 0; j < vrecj; j++) {
                  c += matriz[i + j][4];
              }
              let Promedio = c / vrecj;
              matriz[i+vrecj][6] = parseFloat(Promedio.toFixed(2));
              let errorAbs = (matriz[i + vrecj][1] !== undefined ? matriz[i + vrecj][1] : 0) - matriz[i + vrecj][6];
              sumerr3+=errorAbs;
              c3++;
              matriz[i+vrecj][7] = parseFloat(Math.abs(errorAbs).toFixed(2));
              
          } else {
              matriz[i + vrecj][6] = 0;
              
          }
      }

        let ppmd=0;

        for(let i=nppms; i<matriz.length; i++)
        {
          ppmd += matriz[i][4];
        }

        let proypmd=ppmd/vrecj;
        PTMAC[2]= parseFloat(Math.abs(proypmd).toFixed(2));

          Perr.push(sumerr3/c3);
          
      //Obtener PTMAC
    
      for (let i = 0; i < matriz.length; i++) {
          // Calcular TMAC
          if (i > 0) {
              matriz[i][10] = ((matriz[i][1]) / (matriz[i - 1][1]) - 1) * 100;
          } else {
              matriz[i][10] = 0;
          }
    
          // Calcular PTMAC
          if (i > 1) {
              let ptmac = (matriz[i - 1][1]) + (matriz[i - 1][1] * (matriz[i - 1][10]) / 100);
              matriz[i][8] = parseFloat(ptmac.toFixed(2));
              let errorAbs = matriz[i][8] - matriz[i][1]
              sumerr4+=errorAbs;
              c4++;
              matriz[i][9] = parseFloat(Math.abs(errorAbs).toFixed(2));
          } else {
              matriz[i][8] = 0;
          }
      }
    
      Perr.push(sumerr4/c4);
            
      //Obtener Predicciones
      
      let TMAC=[];
      
    
      TMAC[0]=((matriz[n][1]) / (matriz[n-1][1]) - 1) * 100;
      let pptmac =(matriz[n][1]) + (matriz[n][1] * (TMAC[0]) / 100);
      PTMAC[3]= parseFloat(Math.abs(pptmac).toFixed(2));     
    

    ///--------------------------Suavizacion exponencial-------------------------/

    function suavizacionExponencial(datos, alpha) {
      let suavizado = [];
      let dataProyec = datos.length-1;
      suavizado[0] = datos[0]; 
    
      for (let i = 1; i < datos.length; i++) {
          suavizado[i] = alpha * datos[i] + (1 - alpha) * suavizado[i - 1];
      }

      const ultimoValor = suavizado[suavizado.length - 1];
      const proyeccionFutura = ultimoValor + (ultimoValor - suavizado[suavizado.length - 2]);
      suavizado.push(proyeccionFutura);
    
      return suavizado;
    }
    function aplicarSuavizacionExponencial(matriz, pronosticoElegido, alpha) {
      let pronostico;
      let indiceError;
    
      switch (pronosticoElegido) {
        case 'PS':
          pronostico = matriz.map(item => item[2]);
          for (let i = 0; i < pronostico.length; i++) if(pronostico[i] === undefined) pronostico[i] = 0;
          indiceError = 2;
          break;
        case 'PMS':
          pronostico = matriz.map(item => item[4]);
          for (let i = 0; i < pronostico.length; i++) if(pronostico[i] === undefined) pronostico[i] = 0;
          indiceError = 4;
          break;
        case 'PMD':
          pronostico = matriz.map(item => item[6]);
          for (let i = 0; i < pronostico.length; i++) if(pronostico[i] === undefined) pronostico[i] = 0;
          indiceError = 6;
          break;
        case 'PTMAC':
          pronostico = matriz.map(item => item[8]);
          for (let i = 0; i < pronostico.length; i++) if(pronostico[i] === undefined) pronostico[i] = 0;
          indiceError = 8;
          break;
        default:
          console.log("Error: Pronóstico no reconocido");
          return;
      }
      
      const pronosticoSuavizado = suavizacionExponencial(pronostico, alpha);
    let pmserror =0;
      // Actualizar el pronóstico suavizado en la matriz
      if(metodo == 'PMS'){
        pmserror= pms;
      }else {
          pmserror= pmd;
      }
      for (let i = 1+ pmserror; i < matriz.length; i++) {
        matriz[i][11] = parseFloat(pronosticoSuavizado[i].toFixed(2));
    
        // Calcular el error absoluto del pronóstico suavizado
        const errorAbs = Math.abs(matriz[i][1] - pronosticoSuavizado[i]);
        matriz[i][12] = parseFloat(errorAbs.toFixed(2));
        sumerr5+=errorAbs;
        c5++;
      }
      PTMAC[4] = parseFloat(pronosticoSuavizado[pronosticoSuavizado.length - 1].toFixed(2));

      Perr.push(sumerr5/c5);
      setTableData(matriz);
    
      return {
        label: pronosticoElegido,
        data: matriz.map(item => item[11]), 
        borderColor: 'rgb(255, 0, 255)',
        tension: 0.4,
        fill: false
      };
    }

      //Obtener el mejor error
    
      let menor;

      if (Perr[0] < Perr[1] && Perr[0] < Perr[2] && Perr[0] < Perr[3] && Perr[0] < Perr[4]) {
        menor = 2;
    } else if (Perr[1] < Perr[0] && Perr[1] < Perr[2] && Perr[1] < Perr[3] && Perr[1] < Perr[4]) {
        menor = 4;
    } else if (Perr[2] < Perr[0] && Perr[2] < Perr[1] && Perr[2] < Perr[3] && Perr[2] < Perr[4]) {
        menor = 6;
    } else if (Perr[3] < Perr[0] && Perr[3] < Perr[1] && Perr[3] < Perr[2] && Perr[3] < Perr[4]) {
        menor = 8;
    } else{
        menor = 11;
    } 
        
        // Obtener etiquetas y datos para el gráfico
        const etiquetas = matriz.map(item => item[0]);
        const datos = matriz.map(item => item[1]);
        
        // console.log(menor);
        // console.log(matriz.map(item => item[menor]));

        // setMat( matriz);
        let asd = matriz;
        // console.log(mej);
        
        const metodo = sessionStorage.getItem('metodo');
        const alpha = sessionStorage.getItem('alpha');

        const datosSuavizados = aplicarSuavizacionExponencial(asd, metodo, alpha);

        // Crear un evento personalizado y enviar los datos actualizados
        const evento = new CustomEvent('actualizarVariable', { detail: datosSuavizados });
        document.dispatchEvent(evento);
    
        const mej = matriz.map(item => item[menor]);
        // Establecer los datos calculados en los estados correspondientes
        // setTableData(matriz);
        setChartLabels(etiquetas);
        setChartData(datos);
        setPTMAC(PTMAC);
        setPerr(Perr);
        setmej(mej);
        
      }, []);


// console.log(sessionStorage.getItem('tabla'));
// const imageUrl = '';

      return (
        <div>

          <h1>Analisis Serie Temporal</h1>
          <Table data={tableData} />
          <h1>Promedio de errores de la Serie</h1>
          <table className='a'>
            <thead>
              <tr>
                <th className='a'>Promedio de error PS</th>
                <th className='a'>Promedio de error PMS</th>
                <th className='a'>Promedio de error PMD</th>
                <th className='a'>Promedio de error PTMAC</th>
                <th className='a'>Promedio de error PSE</th>

              </tr>
            </thead>
            <TablaBody3 Perr={Perr} />
          </table >
          <h1>Tabla de Proyecciones Futuras</h1>
          <table className='a'>
            <thead>
              <tr>
                <th className='a'>Proyeccion PS</th>
                <th className='a'>Proyeccion PMS</th>
                <th className='a'>Proyeccion PMD</th>
                <th className='a'>Proyeccion PTMAC</th>
                <th className='a'>Proyeccion PSE</th>
              </tr>
            </thead>
            <TablaBody2 PTMAC={PTMAC} />
          </table>
          
          <div className="comGrafico">
            <h1>Gráfico</h1>
            <ChartComponent labels={chartLabels} data={chartData} mej={mej} />
          </div>
          
          <PDFButton PTMAC={PTMAC} Perr={Perr} TableName={JSON.stringify(sessionStorage.getItem('tabla'))} />
          
        </div>
      );
} 