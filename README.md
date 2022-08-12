
# Bem-vindo ao repositório do projeto Trybe Wallet!

Este projeto consiste em uma carteira de controle de gastos com conversor de moedas, tendo como principais funcionalidades:

- Adicionar, remover e editar um gasto;
- Visualizar uma tabelas com gastos;
- Visualizar o total de gastos convertidos para uma moeda de escolha;

O projeto foi desenvolvido em React que usa Redux como ferramenta de manipulação de estado.
## Redux DevTools

Para o desenvolvimento foi utilizado o Redux DevTools com o Redux-Thunk, por isso foi necessário o uso da biblioteca `composeWithDevTools`, que está no package.json,
## Documentação da API

Os dados consumidos são API do _awesomeapi API de Cotações_ para realizar a busca de câmbio de moedas.

Para realizar buscas, foi consultado o seguinte _endpoint_:

- <https://economia.awesomeapi.com.br/json/all>

Retorno do endpoint:

```
{
   {
     "USD": {
       "code":"USD",
       "codein":"BRL",
       "name":"Dólar Americano/Real Brasileiro",
       "high":"5.6689",
       "low":"5.6071",
       "varBid":"-0.0166",
       "pctChange":"-0.29",
       "bid":"5.6173",
       "ask":"5.6183",
       "timestamp":"1601476370",
       "create_date":"2020-09-30 11:32:53"
       },
      ...
   }
}
```

Para mais informações sobre a API, segue o link da [documentação](https://docs.awesomeapi.com.br/api-de-moedas).



## EsLint

Neste projeto foi utilizado o [ESLint](https://eslint.org/) para fazer a análise estática do código. Ajudando a garantir a qualidade do código de forma a tê-lo mais legível, de mais fácil manutenção e seguindo as boas práticas de desenvolvimento.

## Autores

- [@tassio medeiros](https://github.com/Tassio-Med)


É importante dar destaque que o projeto foi desenvolvido no  módulo de Front-end na [@trybe](https://github.com/betrybe).

