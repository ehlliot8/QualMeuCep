import React, { useState } from 'react';
import logo from './logo.svg';
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
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Box color="yellowPink" width="xl" rounded="lg" p="xs" mb="lg" style={{ padding: '50px' }}>
        <Heading color="black" size="lg">Encontre o CEP da sua localização atual:</Heading>
        <Input disabled class="result-get" placeholder="Cep..." color="white" value={cep} style={{ width: '40%' }} />
        {viewGetCep && <Button onClick={copyCep} color="purpleCyan" m="sm">Copiar</Button>}
        <Button onClick={getCep} color="purpleCyan" m="sm">Buscar</Button>
        {viewCopied &&<Text color="#D8D8D8">Copiado com sucesso</Text>}
      </Box>
    </div>
  );
}

export default App;
