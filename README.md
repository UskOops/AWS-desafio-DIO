<H3>Live Coding da DIO</h3>

# Esse código faz parte do bootcamp AWS. Vale destacar que usando javascript aprimorei o código do tutor, trazendo mais segurança para o mesmo. Abaixo segue uma lista das melhorias que apliquei 


<h1> Utilizado a sintaxe exports.handler em vez de module.exports.handler para exportar a função hello.
# Usei um operador de propagação para simplificar a exportação da função hello.
# Utilizei o try-catch para tratar os erros de forma mais adequada e evitar que a aplicação pare de funcionar em caso de falhas.
# Adicionei a validação de erro para verificar se o item foi encontrado com sucesso antes de retorná-lo ao usuário.
# Utilizei a sintaxe exports.handler em vez de module.exports.handler para exportar a função fetchItem.
# Utilizei o nome da tabela do DynamoDB como uma variável de ambiente em vez de codificá-la diretamente no código.
# Utilizei a sintaxe exports.handler em vez de module.exports.handler para exportar a função fetchItems.
# Validei se o corpo da requisição contém o objeto item antes de processá-lo, para evitar erros caso o corpo esteja vazio.
# Utilizei a sintaxe exports.handler em vez de module.exports.handler para exportar a função insertItem
# Verifiquei se o ID fornecido na URL é um valor válido no formato UUID antes de realizar a operação de atualização.
# Verificar se o valor do campo "itemStatus" no corpo da solicitação é um valor booleano válido antes de atualizar o registro no banco de dados </h1>


Pré requisitos: 
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
