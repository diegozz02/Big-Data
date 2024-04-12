import React from 'react';

const TablaBody2 = ({ PTMAC }) => {
  return (
    <tbody>
      <tr>
        {PTMAC.map((value, index) => (
          <td className='a' key={index}>{value}</td>
        ))}
      </tr>
    </tbody>
  );
};

export default TablaBody2;
