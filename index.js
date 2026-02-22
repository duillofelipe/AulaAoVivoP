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

server.get('/horaAtual', (requisição, resposta) => {
    const horaAtual = new Date();
    const hora = horaAtual.getHours() + ':' + horaAtual.getMinutes() + ':' + horaAtual.getSeconds();
    resposta.send(`   
        <DOCTYPE html>
        <html lang="pt-br"> 
        <head>  
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">    
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Horario do Servidor</title>     
        </head>     
        <body>
           <h1>Agora são ${hora}</h1>
        </body>
        </html>
    `); 
});

server.get('/tabuada', (requisição, resposta) => {
    //Tabuada de qual numero e até qual sequencia?  
    const numero = parseInt(requisição.query.numero); //pegando o número da tabuada a partir dos parâmetros de consulta na UR
    const sequencia = parseInt(requisição.query.sequencia); //pegando a sequência da tabuada a partir dos parâmetros de consulta na URL
if  (!numero || !sequencia) { //verificando se os parâmetros de consulta estão presentes
    resposta.send(`
        <DOCTYPE html>
        <html lang="pt-br"> 
        <head>  
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tabuada</title>     
        </head>                 
        <body>
           <h1>Tabuada</h1>
           <p>Por favor, forneça os parâmetros de consulta "numero" e "sequencia" na URL.</p>           
        </body>
        </html>
        `)}
else {
    resposta.setHeader('Content-Type', 'text/html'); //definindo o tipo de conteúdo da resposta como HTML
    resposta.write(`
        <DOCTYPE html>
        <html lang="pt-br">         
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tabuada</title>     
        </head>         
        <body>      
              <h1>Tabuada do ${numero} ate ${sequencia}</h1>
              <ul>
    `); 

    for (let i = 0; i <= sequencia; i++) { //gerando a tabuada do número até a sequência fornecida
        resposta.write(`<li>${i} x ${numero} = ${numero * i}</li>`);
    }
    resposta.write(`
              </ul>   
        </body>
        </html>
    `);

    resposta.end();
}


    
    console.log("requisição tabuada"); //exibindo os parâmetros de consulta na URL
});


server.listen(porta, host, () => {  
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
