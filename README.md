<h3>Live Coding Dynamo</h3>

# Esse código faz parte do bootcamp AWS. Vale destacar que usando javascript aprimorei o código do tutor, trazendo mais segurança para o mesmo. Abaixo segue uma lista das melhorias que apliquei 


<h1># Utilizado a sintaxe exports.handler em vez de module.exports.handler para exportar a função hello.</h1>
<h1># Usei um operador de propagação para simplificar a exportação da função hello.</h1>
<h1># Utilizei o try-catch para tratar os erros de forma mais adequada e evitar que a aplicação pare de funcionar em caso de falhas.</h1>
<h1># Adicionei a validação de erro para verificar se o item foi encontrado com sucesso antes de retorná-lo ao usuário.</h1>
<h1># Utilizei a sintaxe exports.handler em vez de module.exports.handler para exportar a função fetchItem.</h1>
<h1># Utilizei o nome da tabela do DynamoDB como uma variável de ambiente em vez de codificá-la diretamente no código.</h1>
<h1># Utilizei a sintaxe exports.handler em vez de module.exports.handler para exportar a função fetchItems.</h1>
<h1># Validei se o corpo da requisição contém o objeto item antes de processá-lo, para evitar erros caso o corpo esteja vazio.</h1>
<h1># Utilizei a sintaxe exports.handler em vez de module.exports.handler para exportar a função insertItem</h1>
<h1># Verifiquei se o ID fornecido na URL é um valor válido no formato UUID antes de realizar a operação de atualização.</h1>
<h1># Verificar se o valor do campo "itemStatus" no corpo da solicitação é um valor booleano válido antes de atualizar o registro no banco de dados</h1>


# Pré requisitos: 
 - possuir uma conta na AWS e instalar Node.js na máquina.
 - Instalar o AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html

### Setup Inicial

#### Credenciais AWS

- Criar usuário: AWS Management Console -> IAM Dashboard -> Create New User -> <nome do usuário> -> Permissions "Administrator Access" -> Programmatic Access -> Dowload Keys
- No terminal: ```$ aws configure``` -> colar as credenciais geradas anteriormente
- 
#### Configurar o framework Serverless
```$ npm i -g serverless```

### Desenvolvimento do projeto
 
```
$ serverless
Login/Register: No
Update: No
Type: Node.js REST API
Name: dio-live
```
```
$ cd dio-live
$ code .
``` 
- No arquivo ```serverless.yml``` adicionar a região ```region: us-east-1``` dentro do escopo de ```provider:```
- Salvar e realizar o deploy ```$ serverless deploy -v```

#### Estruturar o código

- Criar o diretório "src" e mover o arquivo "handler.js" para dentro dele
- Renomear o arquivo "handler.js" para "hello.js"
- Atualizar o código 
```
const hello = async (event) => {
/////
module.exports = {
    handler:hello
}
```
- Atualizar o arquivo "serverless.yml "
```
handler: src/hello.handler
```
```$ serverless deploy -v ```

#### DynamoDB
Atualizar o arquivo serverless.yml
```
resources:
  Resources:
    ItemTable:
      Type: AWS::DynamoDB::Table
      Properties:
          TableName: ItemTable
          BillingMode: PAY_PER_REQUEST
          AttributeDefinitions:
            - AttributeName: id
              AttributeType: S
          KeySchema:
            - AttributeName: id
              KeyType: HASH
```
#### Desenvolver funções lambda

	- Pasta /src do repositório
 	- Obter arn da tabela no DynamoDB AWS Console -> DynamoDB -> Overview -> Amazon Resource Name (ARN)
	- Atualizar arquivo serverless.yml com o código a seguir, abaixo do ```region:```
  ```
	iam:
      role:
          statements:
            - Effect: Allow
              Action:
                - dynamodb:PutItem
                - dynamodb:UpdateItem
                - dynamodb:GetItem
                - dynamodb:Scan
              Resource:
                - arn:aws:dynamodb:us-east-1:167880115321:table/ItemTable
  ```
  
   - Instalar dependências

   ```npm init```
   ```npm i uuid aws-sdk```
   
  - Atualizar lista de funções no arquivo serverless.yml
  ```
  functions:
  hello:
    handler: src/hello.handler
    events:
      - http:
          path: /
          method: get
  insertItem:
    handler: src/insertItem.handler
    events:
      - http:
          path: /item
          method: post
  fetchItems:
    handler: src/fetchItems.handler
    events:
      - http:
          path: /items
          method: get
  fetchItem:
    handler: src/fetchItem.handler
    events:
      - http:
          path: /items/{id}
          method: get
  updateItem:
    handler: src/updateItem.handler
    events:
      - http:
          path: /items/{id}
          method: put



------------------------------------------------------------------------------------------------------------------------------------

<H3>Live Coding Cognito</h3>


# Melhorias implementadas
<h1> Foi utilizado o recurso de tratamento de erros do bloco try...catch para identificar a origem de possíveis falhas na execução do código; </h1>

<h1> Foi configurado corretamente as permissões de acesso do AWS IAM (Identidade e Acesso à Gerenciamento) para a função Lambda;</h1>

<h1> Foi configurado as opções de segurança da função Lambda, como o uso de uma política de segurança de rede VPC (Virtual Private Cloud); </h1>

<h1> Utiliz uma estrutura de log e monitoramento para acompanhar e analisar as atividades executadas na função Lambda. </h1>



## Serviços AWS utilizados

- Amazon Cognito
- Amazon DynamoDB
- Amazon API Gateway
- AWS Lambda

## Etapas do desenvolvimento

### Criando uma API REST no Amazon API Gateway

- API Gateway Dashboard -> Create API -> REST API -> Build
- Protocol - REST -> Create new API -> API name [dio_live_api] -> Endpoint Type - Regional -> Create API
- Resources -> Actions -> Create Resource -> Resource Name [Items] -> Create Resource

### No Amazon DynamoDB

- DynamoDB Dashboard -> Tables -> Create table -> Table name [Items] -> Partition key [id] -> Create table

### No AWS Lambda

#### Função para inserir item

- Lambda Dashboard -> Create function -> Name [put_item_function] -> Create function
- Inserir código da função ```put_item_function.js``` disponível na pasta ```/src``` -> Deploy
- Configuration -> Execution role -> Abrir a Role no console do IAM
- IAM -> Roles -> Role criada no passo anterior -> Permissions -> Add inline policy
- Service - DynamoDB -> Manual actions -> add actions -> putItem
- Resources -> Add arn -> Selecionar o arn da tabela criada no DynamoDB -> Add
- Review policy -> Name [lambda_dynamodb_putItem_policy] -> Create policy

### Integrando o API Gateway com o Lambda backend

- API Gateway Dashboard -> Selecionar a API criada -> Resources -> Selecionar o resource criado -> Action -> Create method - POST
- Integration type -> Lambda function -> Use Lambda Proxy Integration -> Lambda function -> Selecionar a função Lambda criada -> Save
- Actions -> Deploy API -> Deployment Stage -> New Stage [dev] -> Deploy

### No POSTMAN

- Add Request -> Method POST -> Copiar o endpoint gerado no API Gateway
- Body -> Raw -> JSON -> Adicionar o seguinte body
```
{
  "id": "003",
  "price": 600
}
```
- Send

### No Amazon Cognito

- Cognito Dashboard -> Manage User Pools -> Create a User Pool -> Pool name [TestPool]
- How do you want your end users to sign in? - Email address or phone number -> Next Step
- What password strength do you want to require?
- Do you want to enable Multi-Factor Authentication (MFA)? Off -> Next Step
- Do you want to customize your email verification messages? -> Verification type - Link -> Next Step
- Which app clients will have access to this user pool? -> App client name [TestClient] -> Create App Client -> Next Step
- Create Pool

- App integration -> App client settings -> Enabled Identity Providers - Cognito User Pool
- Callback URL(s) [https://example.com/logout]
- OAuth 2.0 -> Allowed OAuth Flows - Authorization code grant -Implicit grant
- Allowed OAuth Scopes	- email	- openid
- Save Changes

- Domain name -> Domain prefix [diolive] -> Save

### Criando um autorizador do Amazon Cognito para uma API REST no Amazon API Gateway

- API Gateway Dashboard -> Selecionar a API criada -> Authorizers -> Create New Authorizer
- Name [CognitoAuth] -> Type - Cognito -> Cognito User Pool [pool criada anteriormente] -> Token Source [Authorization]

- Resources -> selecionar o resource criado -> selecionar o método criado -> Method Request -> Authorization - Selecionar o autorizador criado

### No POSTMAN

- Add request -> Authorization
- Type - OAuth 2.0
- Callback URL [https://example.com/logout]
- Auth URL [https://diolive.auth.sa-east-1.amazoncognito.com/login]
- Client ID - obter o Client ID do Cognito em App clients
- Scope [email - openid]
- Client Authentication [Send client credentials in body]
- Get New Acces Token
- Copiar o token gerado

- Selecionar a request para inserir item criada -> Authorization -> Type - Bearer Token -> Inserir o token copiado
- Send