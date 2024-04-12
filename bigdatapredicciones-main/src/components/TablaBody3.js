import React from 'react';

const TablaBody3 = ({ Perr }) => {
  return (
    <tbody>
      <tr>
        {Perr.map((value, index) => (
          <td className='a' key={index}>{value}</td>
        ))}
      </tr>
    </tbody>
  );
};

export default TablaBody3;
