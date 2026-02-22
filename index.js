import express from 'express';


const host = '0.0.0.0'; //definindo o host para aceitar conexões de qualquer endereço IP
const porta = 3000;

const server = express(); //oferecendo ao desenvolvedor a funcionalidade do express em http

//rechear servidor com funcionalidades 

server.get('/', (requisição, resposta) => {
    resposta.send(`   
        <DOCTYPE html>
        <html lang="pt-br"> 
        <head>  
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">    
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Primeiro programa para internet usando Node + express</title>     
        </head>     
        <body>
           <h1>Primeiro programa para internet usando Node + express</h1>
           <h2>Olá, bem-vindo ao início de tudo!</h2>
        </body>
        </html>
    `); 
});

server.listen(porta, host, () => {  
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
