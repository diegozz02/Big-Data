import React from 'react';

const Table = ({ data }) => {
  return (
    <table className='a'>
      <thead>
        <tr className='a'>
          <th className='a'>Periodo</th>
          <th className='a'>Frecuencia</th>
          <th className='a'>Promedio Simple</th>
          <th className='a'>Error Absoluto</th>
          <th className='a'>Promedio Movil Simple</th>
          <th className='a'>Error Absoluto</th>
          <th className='a'>Promedio Movil Doble</th>
          <th className='a'>Error Absoluto</th>
          <th className='a'>PTMAC</th>
          <th className='a'>Error Absoluto</th>
          <th className='a'>Suavización Exponencial</th>
          <th className='a'>Error Absoluto</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr className='a' key={index}>
            <td className='a'>{row[0]}</td>
            <td className='a'>{row[1]}</td>
            <td className='a'>{row[2]}</td>
            <td className='a'>{row[3]}</td>
            <td className='a'>{row[4]}</td>
            <td className='a'>{row[5]}</td>
            <td className='a'>{row[6]}</td>
            <td className='a'>{row[7]}</td>
            <td className='a'>{row[8]}</td>
            <td className='a'>{row[9]}</td>
            <td className='a'>{row[11]}</td>
            <td className='a'>{row[12]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;