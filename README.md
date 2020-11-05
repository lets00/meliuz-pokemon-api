# Meliuz pokemon api

Construir a API para uma pequena interface que possibilitará que usuários visualizem uma lista com todos os Pokémon existentes, faça filtros por nome e tipo.

# Instalação

## Usando containers docker

Primeiramente, certifique-se que você possui o **docker** e o **docker-compose** instalados na máquina. Você pode consultar a [documentação oficial](https://docs.docker.com/get-docker/) para instalá-lo em sua máquina, dependendo do sistema operacional e distribuição utilizada.

Após isso, precisamos criar os arquivos de configuração do ambiente. O container do BD pode ser configurado criando um arquivo `database.env` e definindo as seguintes informações:

```sh
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
```

O container do node pode ser configurado criando um arquivo `app.env` e definindo as seguintes informações:
```
TO DO
```

Com todos os arquivos criados, podemos iniciar os containers através do comando

```sh
$ docker-compose up -d
```

O comando acima irá baixar as imagens dos container, criar o volume utiliza-do pelo BD e os containers.

## Máquina Local
 TO DO

# Rotas
## GET /pokemons
Obtém todos os pokemons existentes. É possível filtar por pokemons que possua uma string ou pelo seu tipo através de *query parameters*

**Query parameters:**
* name: Nome do pokemon
* type: Tipo do pokemon. Pode-se passar mais de um tipo, separando-os por vírgula.

Status code:
* 200

Ex:
[http:/localhost:3000/pokemons?name=saur&type=grass,fire](http:/localhost:3000/pokemons?name=saur&type=grass,fire)

## POST /team
**Body:**
* name: Nome do time (obrigatório). Deve ter pelo menos 5 caracteres
* pokemons: Array com o Id de cada pokemon(obrigatório). Os Ids devem ser números. Deve ter no máximo 6 pokemons por time.

Status code:
* 201: criado
* 422: entrada inválida (não processada)

Ex:
[http:/localhost:3000/post](http:/localhost:3000/post)

Body:

```js
{
  name: "lets00",
  pokemons: [1,2,3,4,5]
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
