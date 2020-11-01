# Meliuz pokemon api

Construir a API para uma pequena interface que possibilitará que usuários visualizem uma lista com todos os Pokémon existentes, faça filtros por nome e tipo.

# Instalação

## Usando containers docker

TO DO

## Máquina Local
 TO DO

# Rotas
## /pokemons
## /team


# Ferramentas utilizadas
 
## NodeJS

TO DO

## Banco de Dados NoSQL MongoDB 
 
Optei por um banco NoSQL nesse cenário baseado em três principais fatores:

1- O arquivo com os dados está no formato JSON, amplamente suportado por bancos não relacionais sem a necessidade de utilização de uma comando DML (Data Model Language) para modelar a estrutura dos dados, sendo necessário, muitas vezes, apenas adicinar o arquivo JSON em uma coleção previamente criada em um banco NoSQL. 
 
1- A necessidade de converter cada item do dicionário _pokemon_ em um comando DDL (Data Definition Language), o que levaria muito tempo e esforço.

1- O arquivo não está estruturado (existem campos com 0 ou mais valores). Caso utilizasse um banco SQL seria necessário criar diversas tabelas para representar cada relação de 0 para muitos, além de normalizar dos dados para no mínimo 3FN (Terceira Forma Normal) evitando dados repeditos em diversas tabelas diferentes, aumentando o número de Joins entre tabelas para recuperar a mesma informação que uma única consulta no NoSQL para esse cenário.

O principal motivo para escolher o MongoDB e não outros bancos NoSQL (CouchDB, Cassandra, etc) foi sua fácil integração com o NodeJS, principalmente pela linguagem utilizada para manipulação do banco ser muito semelhante com o Javascript, reduzindo o tempo de uma modelagem MVP.
