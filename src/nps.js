import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import './App.css';

let uid
const getUrlParameter = function getUrlParameter(sParam) {
    const sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&');
    let    sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

uid = getUrlParameter('uid');
const q1 = Number(getUrlParameter('q1')) - 1; 
console.log(uid)

const url = 'api/get_records_sheet'
 
const body = {
    "uid": uid
}

const Nps = (props) => {
  const [name, setName] = useState(null)
  const [last, setLast] = useState(null)
  const [email, setEmail] = useState(null)
  const [company, setCompany] = useState(null)
  const [textAreaValue, setTextAreaValue] = useState("")
  const [log, setLog] = useState("")

  const fetchData = async () => {
    try {
      const { data } = await axios.post(url,body)
      setName(data.nombre)
      setLast(data.apellido)
      setEmail(data.correo)
      setCompany(data.empresa)
      console.log(data)
    } catch  (error) {
      console.log("error");
      console.log(error);
    };
  }
    useEffect(() => {
      fetchData()
    }, []);

    if (!name) return ""

    function onChange(e) {
      setTextAreaValue(e.target.value)
    }

    const logSubmit = (e) => {
      e.preventDefault();
 
      setLog("Información enviada!!")
      e.currentTarget.disabled = true;

      const body2 = {
          "name": name,
          "last": last,
          "email": email,
          "company": company,
          "q1": q1,
          "textAreaValue": textAreaValue
      }
       
      const url2 = 'api/save_data'

      const fetchData2 = async () => {
        try {
          const { msg } = await axios.post(url2,body2)
          console.log(msg)
          setLog('Gracias, tu respuesta fue registrada');
        } catch  (error) {
          console.log("error");
          console.log(error);
        };
      }

      fetchData2()
    }
  return (
    <>
      <h2>{name}, gracias por responder.</h2>
      <h3>Por favor compártenos por qué nos diste <span>{q1} </span>de calificación:</h3>
      <textarea
        value={textAreaValue}
        onChange={onChange}
        rows={6}
        cols={80}
      />
      <button id="submitNPS" className="submitNPS" onClick={logSubmit}>Enviar </button>
      <p>{log}</p>
    </>
  )
}

export default Nps