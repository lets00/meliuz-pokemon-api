# Meliuz pokemon api

Essa API foi construída como parte do desafio técnico proposto pela Meliuz para o cargo de Pessoa Desenvolvedora Back-end.

O desafio consiste em construir uma API para uma pequena interface que possibilitará que usuários visualizem uma lista com todos os Pokémon existentes e faça filtros por nome e tipo. Além de permitir a criação e gravação de um time montado pelo usuário. Para mais informações sobre o desafio, entre em contato direto com o time da Meliuz.

# Instalação

## Usando containers docker

Primeiramente, certifique-se que você possui o **docker** e o **docker-compose** instalados na máquina. Você pode consultar a [documentação oficial](https://docs.docker.com/get-docker/) para instalá-lo em sua máquina, dependendo do sistema operacional e distribuição utilizada.

Após isso, precisamos criar os arquivos de configuração do ambiente. O container do Banco de Dados(BD) pode ser configurado criando um arquivo `database.env` e definindo as seguintes informações:

```sh
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
```
PS: não esqueça de definir as credenciais fortes.

O container do node pode ser configurado criando um arquivo `app.env` e definindo as seguintes informações:
```sh
DB_URL=mongodb://root:example@db:27017/meliuz?authSource=admin
```
PS: substituir root e example pelo seu usuário e senha, respectivamente.

Com todos os arquivos criados, podemos iniciar os containers através do comando:

```sh
$ docker-compose up -d
```

O comando acima irá baixar as imagens dos container, criar o volume utiliza-do pelo BD e os containers.

Agora devemos criar o banco de dados e a collection que vamos utilizar no projeto (veja a sessão **Criando o banco de dados** abaixo). 

## Máquina Local

Para executar localmente, primeiramente, certifique-se que você possui instalado o **nodejs** (v12.16.3 ou superior), **npm** (6.14.8 ou superior) e o **mongodb** (4.4.1 Community) instalado e configurado.

Após isso, clone o projeto, acesse a pasta raiz e instale as dependências necessárias:
```sh
$ git clone https://github.com/lets00/meliuz-pokemon-api/
$ cd meliuz-pokemon-api/
$ npm i
```

Após isso, é necessário configurar uma váriável de ambiente com a URI de acesso ao banco de dados:
```sh
$ export DB_URL=mongodb://root:example@localhost:27017/meliuz?authSource=admin
```
Para executar o servidor, execute o comando:
```sh
$ npm start
```
Agora devemos criar o banco de dados e a collection que vamos utilizar no projeto (veja a sessão **Criando o banco de dados** abaixo). 

## Criando o banco de dados

Para iniciar o banco de dados, vamos utilizar o utilitário **mongoimport** para criar o arquivo tests/pokemon.json no BD. Se você está utilizando o passo-a-passo de criação do ambiente com docker, esse utilitário já está presente dentro do container, caso contrário, você deverá instalar e configurar no seu ambiente (geralmente o utilitário já é instalado no ambiente quando você instala e configura o mongodb. Caso não esteja instalado, por favor, verifique a [documentação oficial](https://docs.mongodb.com/database-tools/mongoimport/).)

### Importando o arquivo pokemons.json para o BD no container docker

Primeiramente, precisamos descobrir qual o ID do nosso container do mongodb. Para isso, execute o comando abaixo:

```sh
$ docker ps
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS              PORTS                      NAMES
1ef5964080a2        meliuz-pokemon-api_app   "docker-entrypoint.s…"   29 minutes ago      Up 29 minutes       0.0.0.0:3000->3000/tcp     meliuz-pokemon-api_app_1
6f4be171c24c        mongo:4-bionic           "docker-entrypoint.s…"   29 minutes ago      Up 29 minutes       0.0.0.0:27017->27017/tcp   meliuz-pokemon-api_db_1
```
Podemos observar nesse exemplo que o ID do mongodb é o *6f4be171c24c*.

Após isso, precisamos copiar o arquivo *tests/pokemon.json* para dentro do banco de dados:

```sh
$ docker cp tests/pokemon.json  6f4be171c24c:/tmp/pokemon.json
```
PS: substitua *6f4be171c24c* pelo ID do seu container do mongodb.

Agora, executaremos o **mongoimport** para importar o JSON para o nosso banco, criando o dtabase e a collection pokemons:
```sh
$ docker exec 6f4be171c24c mongoimport -d meliuz -c pokemons --type json --file /tmp/pokemon.json --jsonArray -u root -p example --authenticationDatabase admin
```
PS: Substituir root e example pelo usuário e senha respectivamente.

### Importando o arquivo pokemons.json sem utilizar o docker

Se você não estiver utilizando o docker, basta executar o comando abaixo (localhost):

```sh
$  mongoimport -d meliuz -c pokemons --type json --file /tmp/pokemon.json --jsonArray -u root -p example --authenticationDatabase admin
```
PS: Substituir root e example pelo usuário e senha respectivamente.

## Executando testes

Inicialmente, é necessário ter instalado o **jest** no seu ambiente. Para instalá-lo, execute: 
```sh
$ npm i jest
```

Configurar a variável de ambiente localmente para acessar o banco de dados:
```sh
export DB_URL=mongodb://root:example@localhost:27017/meliuz?authSource=admin
```
PS: substituir root e example pelo seu usuário e senha, respectivamente.

Para executar **todas** as suítes de testes, execute o seguinte comando:
```sh
$ npm run test
```
### Executanto testes de cobertura

Para executar os testes de cobertura execute:
```sh
$ npm run test:coverage
...
--------------------------------|---------|----------|---------|---------|-------------------
File                            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------------|---------|----------|---------|---------|-------------------
All files                       |   94.85 |    84.21 |     100 |   92.42 |                   
 meliuz-pokemon-api             |   95.65 |      100 |     100 |   93.75 |                   
  app.js                        |   95.65 |      100 |     100 |   93.75 | 16                
 meliuz-pokemon-api/controllers |   85.19 |       75 |     100 |   80.95 |                   
  pokemonController.js          |   86.67 |       75 |     100 |   83.33 | 10,17             
  teamController.js             |   83.33 |       75 |     100 |   77.78 | 9-10              
 meliuz-pokemon-api/models      |     100 |       75 |     100 |     100 |                   
  pokemonModel.js               |     100 |       75 |     100 |     100 | 1                 
  teamModel.js                  |     100 |       75 |     100 |     100 | 1                 
 meliuz-pokemon-api/routes      |     100 |      100 |     100 |     100 |                   
  pokemon.js                    |     100 |      100 |     100 |     100 |                   
  team.js                       |     100 |      100 |     100 |     100 |                   
 meliuz-pokemon-api/validators  |     100 |    83.33 |     100 |     100 |                   
  teamValidator.js              |     100 |    83.33 |     100 |     100 | 1                 
--------------------------------|---------|----------|---------|---------|-------------------
```

# Rotas
## GET /pokemon
Obtém todos os pokemons existentes. É possível filtar por parte do nome de um pokemon ou pelo seu tipo através de *query parameters*

**Query parameters:**
* name: Nome do pokemon
* type: Tipo do pokemon. Pode-se passar mais de um tipo, separando-os por vírgula.

Status code:
* 200

Ex:
[http://localhost:3000/pokemon?name=saur&type=grass,fire](http://localhost:3000/pokemon?name=saur&type=grass,fire)

## POST /team
**Body:**
* name: Nome do time (obrigatório). Deve ter pelo menos 5 caracteres
* pokemons: Array com o Id de cada pokemon(obrigatório). Os Ids devem ser números não repetidos. Deve possuir no máximo 6 pokemons por time.

Status code:
* 201: criado
* 422: entrada inválida (não processada)

Ex:
[http://localhost:3000/team](http://localhost:3000/team)

Body:

```js
{
  "name": "lets00",
  "pokemons": [1,2,3,4,5]
}
```

# Ferramentas utilizadas
 
## NodeJS

Optei por utilizar o NodeJS principalmente pela experiência que possuo com Javascript no Backend.

## Banco de Dados NoSQL MongoDB 
 
Optei por um banco NoSQL nesse cenário baseado em três principais fatores:

1- O arquivo com os dados está no formato JSON, amplamente suportado por bancos não relacionais sem a necessidade de utilização de uma comando DML (Data Model Language) para modelar a estrutura dos dados, sendo necessário, muitas vezes, apenas adicinar o arquivo JSON em uma coleção previamente criada em um banco NoSQL. 
 
1- A necessidade de converter cada item do dicionário _pokemon_ em um comando DDL (Data Definition Language), o que levaria muito tempo e esforço.

1- O arquivo não está estruturado (existem campos com 0 ou mais valores). Caso utilizasse um banco SQL seria necessário criar diversas tabelas para representar cada relação de 0 para muitos, além de normalizar dos dados para no mínimo 3FN (Terceira Forma Normal) evitando dados repeditos em diversas tabelas diferentes, aumentando o número de Joins entre tabelas para recuperar a mesma informação que uma única consulta no NoSQL para esse cenário.

O principal motivo para escolher o MongoDB e não outros bancos NoSQL (CouchDB, Cassandra, etc) foi sua fácil integração com o NodeJS, principalmente pela linguagem utilizada para manipulação do banco ser muito semelhante com o Javascript, reduzindo o tempo de uma modelagem MVP.

## Express

Um dos principais frameworks web para desenvolvimento de APIs no NodeJS. Optei pelo express principalmente por ser minimalista e flexível, premitindo modelar uma API rapidamente e integra-la com diversos módulos pré-existentes sem a necessidade de criar tudo do zero.

## Validação de dados através do Joi

Inicialmente, escolhi trabalhar com o **express-validator** (uma das principais bibliotecas quando trabalhamos com o Express). Entretanto a integração dela com o jest mostrou-se desafiador a princípio, o que não permitia de maneira simples testar se as validações dos campos estavam sendo realizadas corretamente quando um teste precisava acessar uma rota que estava sendo validada pelo express-validator.

O Joi é uma biblioteca bastante utilizada para validação de dados. Antigamente ela era bastante integrada com a biblioteca HapiJS(uma biblioteca para criação de APIs) mas atualmente pode-se utilizá-la em qualquer biblioteca ou cenário, não limitando-se apenas ao backend.

## Testes automatizados usando Jest

Optei por utilizar tetes automáticos seguindo a técnica de TDD para facilitar e garantir qualidade as integrações de novas funcionalidades, garantindo assim que o comportamento esperado não seja modificado pela adição ou mutação de código no projeto. O código de teste é escrito inicialmente falhando, e o código básico refatorado é escrito logo em seguida. Esse processo se repete de maneira cíclica conforme necessidade de garantia de certo nível de qualidade.

O Jest é um framework de teste javascript completo que permite a construção de suítes de testes, mock de objetos e funções e cobertura de código. Optei pela escolha do Jest principalmente pela facilidade de integração com o NodeJS, oferecendo pouca configuração e o resultado esperado (construção de suítes de testes automatizados).
