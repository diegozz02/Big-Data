import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import SendEmailButton from "./SendEmailButton";

export default function MTablas() {
    
    const navigate = useNavigate();
    const [tablesData, setTablesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post("http://localhost:3300/logic/tablas");
                const names = res.data.message.map(table => table.Tables_in_bdseriestemporales);
                const tables = [];
                for (let i = 0; i < names.length; i++) {
                    const name = names[i];
                    if (name !== "undefined") {
                        try {
                            const res = await axios.post("http://localhost:3300/logic/opciones", {
                                name: name
                            });
                            tables.push({ tableName: name, data: res.data });
                        } catch (err) {
                            console.error("Error:", err);
                        }
                    }
                }
                setTablesData(tables);
            } catch (err) {
                console.error("Error:", err);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (tableName) => {
        const table = tablesData.find(table => table.tableName === tableName);
        if (table) {
            const matrizOriginal = table.data.message.map(record => Object.values(record));
            const matrizFormateada = matrizOriginal.map(item => {
                const fecha = new Date(item[0]).getFullYear(); // Obtener el año de la fecha
                return [fecha, item[1]]; // Formatear el array según el formato deseado
            });
            sessionStorage.setItem('tabla', tableName);
            sessionStorage.setItem('matriz', JSON.stringify(matrizFormateada));
            sessionStorage.setItem('pms', parseInt(document.getElementById('pms').value));
            sessionStorage.setItem('pmd', parseInt(document.getElementById('pmd').value));
            sessionStorage.setItem('metodo', document.getElementById('metodo').value);
            sessionStorage.setItem('alpha', parseFloat(document.getElementById('alpha').value));
            await SendEmailButton();
            navigate("/STemp");
        }
    };

    return (
        <div className="tablas">
            <div className="contPronostico">
                <h1>Coloca un pronostico</h1>
                <div>
                    <a>PMS</a>
                    <input type="text" id="pms" required></input>
                </div>
                <div>
                    <a>PMD</a>
                    <input type="text" id="pmd" required></input>
                </div>

                <a>Metod a suavisar: </a>
                <input id="metodo" type="text"/>
                <a>Escribe alpha: </a>
                <input id="alpha" type="text"/>
                
            </div>
            {/* <div> */}
                {/* <h1> --------- Selecciona una tabla de la base de datos apra continuar</h1> */}
                {tablesData.map((table, index) => (
                    
                    <div key={index} className="tabla">
                        <div className="titulo">
                            
                            <h3 className="nombrebd">{table.tableName}</h3>
                            <button  className="boton" onClick={() => handleSubmit(table.tableName)}>press</button>
                        </div>
                        <table>
                            <thead className="tcon">
                                <tr className="thcon">
                                    {Object.keys(table.data.message[0]).map((fieldName, idx) => (
                                        <th className="ttitulo" key={idx}>{fieldName}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {table.data.message.map((record, idx) => (
                                    <tr key={idx}>
                                        {Object.entries(record).map(([key, value], idx) => (
                                            <td key={idx}>
                                                {/* Formatear la fecha solo para la primera columna */}
                                                {idx === 0 ? new Date(value).toISOString().split("T")[0] : JSON.stringify(value)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            {/* </div> */}
            
        </div>
    );
}
