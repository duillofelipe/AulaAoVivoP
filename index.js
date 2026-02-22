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
            <title>Reajuste Salarial</title>
</head>
<body>
         <h1>Empresa - Presidente Prudente/SP</h1>
         <p>Para calcular o reajuste informe na URL:</p>
         <p>
            http://localhost:3000/calculasalario/?idade=18&sexo=F&salario_base=1700&anoContratacao=2014&matricula=12345
         </p>
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

server.get('/calculasalario', (requisição, resposta) => {
 
    const idade = requisição.query.idade;
    const sexo = requisição.query.sexo;
    const salario_base = requisição.query.salario_base;
    const anoContratacao = requisição.query.anoContratacao;
    const matricula = requisição.query.matricula;    
   


    if (!idade && !sexo && !salario_base && !anoContratacao ) {
        return res.send(`
            <DOCTYPE html>
        <html lang="pt-br"> 
        <head>  
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tabuada</title>     
        </head>                 
        <body>
            <h1>Reajuste Salarial - Empresa Presidente Prudente/SP</h1>
            <p>Para calcular o reajuste salarial, informe na URL:</p>
            <p><strong>http://localhost:3000/calculasalario?idade=18&sexo=F&salario_base=1700&anoContratacao=2014&matricula=12345</strong></p>
            <h3>Regras:</h3>
            <ul>
                <li>Idade deve ser maior que 16 anos</li>
                <li>Salário base deve ser número válido</li>
                <li>Ano de contratação deve ser maior que 1960</li>
                <li>Matrícula deve ser maior que zero</li>
            </ul>
        </body>
        </html>
        `);
    }
       

 
    const idadeNum = parseInt(idade);
    const salarioNum = parseFloat(salario_base);
    const anoNum = parseInt(anoContratacao);
    const matriculaNum = parseInt(matricula);
    const anoAtual = new Date().getFullYear();


    if (
        idadeNum <= 16 ||
        isNaN(salarioNum) ||
        isNaN(anoNum) || anoNum <= 1960 ||
        isNaN(matriculaNum) || matriculaNum <= 0
    ) {
        return resposta.send(`
            <h1>Erro no Cálculo</h1>
            <p>Não foi possível realizar o cálculo, pois os dados informados não são válidos.</p>
            <a href="/">Voltar</a>
        `);
    }

 
    const tempoEmpresa = anoAtual - anoNum;
    let percentual = 0;

    if (tempoEmpresa <= 5) {
        percentual = 0.05;
    } else if (tempoEmpresa <= 10) {
        percentual = 0.10;
    } else {
        percentual = 0.15;
    }

   
    if (sexo === 'F' || sexo === 'f') {
        percentual += 0.02;
    }

    const novoSalario = salarioNum + (salarioNum * percentual);


    resposta.send(`
        <h1>Dados do Funcionário</h1>
        <p><strong>Matrícula:</strong> ${matriculaNum}</p>
        <p><strong>Idade:</strong> ${idadeNum}</p>
        <p><strong>Sexo:</strong> ${sexo}</p>
        <p><strong>Salário Base:</strong> R$ ${salarioNum.toFixed(2)}</p>
        <p><strong>Ano de Contratação:</strong> ${anoNum}</p>
        <p><strong>Tempo de Empresa:</strong> ${tempoEmpresa} anos</p>
        <hr>
        <h2 style="color: green;">Novo Salário Reajustado: R$ ${novoSalario.toFixed(2)}</h2>
        <p>Percentual aplicado: ${(percentual * 100).toFixed(1)}%</p>
        <a href="/">Calcular novamente</a>
    `);


});
    


server.listen(porta, host, () => {  
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
