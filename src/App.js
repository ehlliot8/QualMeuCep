import React, { useState } from 'react';

import './App.css';
import { Button, Heading, Box, Input, Text } from 'dracula-ui'


function App() {
  const [cep, setCep] = useState(null);

  const [viewGetCep, setViewGetCep] = useState(false);

  const [viewCopied, setViewCopied] = useState(false);


  function copyCep() {
    navigator.clipboard.writeText(cep)
      .then(() => {
        console.log('Texto copiado com sucesso!');
        setViewCopied(true)
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao copiar o texto: ', error);
      });
  }

  function getCep() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyDKUgROuFLOYDr8qTNb1pgKtk6-xZD-yrY`);
        const data = await response.json();
        setCep(data.results[0].address_components.find((component) => component.types.includes('postal_code')).long_name);
        setViewGetCep(true)
      });
    } else {
      console.log("Geolocalização não é suportada por este navegador.");
    }
  }

  return (

    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>

      <div>
        <h1 className='tittle-menu' style={{ color: '#FF6D28', fontSize: '50px' }}>QualMeuCep<img src='./mapa-brasil.png' alt='logo' style={{ width: '40px' }} /></h1>

      </div>
      <div className='container-box'>
        <Box color="yellowPink" width="xl" rounded="lg" p="xs" mb="lg" style={{ padding: '50px', width: '100%' }}>
          <Heading color="black" size="lg">Encontre o CEP da sua localização atual:</Heading>

          <div className='result-get-view' style={{ padding: "9%;" }}>
            <Input disabled placeholder="Cep..." color="white" value={cep} style={{ width: '65%', textAlign: 'center' }} />
          </div>

          <div className='btns-card' >
            {viewGetCep && <Button className='btn-card' onClick={copyCep} color="purpleCyan" m="sm">Copiar</Button>}
            <Button className='btn-card' onClick={getCep} color="purpleCyan" m="sm">Buscar</Button>
          </div>

          <div className="txt-copied">
            {viewCopied && <Text color="#D8D8D8">Copiado com sucesso</Text>}
          </div>
        </Box>
      </div>
    </div>
  );
}

export default App;
