**INSTALAR NODE.JS**

------

`curl -sl https://deb.nodesource.com/setup_12.x | sudo -E bash -`
`sudo apt-get install - y nodejs`



**CRIAR UMA BASE NODEJS**

------

Dentro da pasta do projeto, digitar:

`npm init -y`  (inclui os arquivos do nodejs no diretório)

`npm install express` (Express serve para interpretar as rotas so server)

`npm install @types/express -D` (Adicionar a tipagem para o typescript)



**TYPESCRIPT**

------

`npm install typescript -D` (Instalar o typescript)

`npm install ts-node -D` (Instalar a dependência do typescript para o node)

`npx tsc --init`  (Criar arquivo de configuração do typescript)

`npx ts-node pasta/arquivo.ts` (Executar um arquivo typescript)

`npm i ts-node-dev --save-dev`  (Reiniciar o server sempre que uma alteração for feita)



Na pasta *package.json* inserir esse comando no campo *scripts*

`"nome_do_comando": "ts-node-dev pasta/arquivo.ts"`

`npm run nome_do_comando`  (Executar o servidor web)



**CÓDIGO BÁSICO PARA INICIALIZAÇÃO DO SERVIDOR**

------



```typescript
import express from 'express';

const app = express();

app.get('/users', (request, response)=>{
	response.sen('Helo World');
});

app.listen([Porta para o servidor]);   
```

