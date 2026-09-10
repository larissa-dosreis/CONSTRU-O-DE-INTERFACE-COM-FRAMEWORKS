# Catálogo Interativo

Projeto da atividade de Construção de Interface com Frameworks.

## Integrantes da Equipe
- Larissa Aparecida dos Reis
- Saulo Oliveira Moreira
- Thiago Alves

## Passo a Passo do Desenvolvimento

1. **Setup Inicial:** 
   O projeto foi inicializado utilizando a ferramenta Vite com o template para React, garantindo um ambiente de desenvolvimento rápido e moderno.

2. **Estrutura de Componentes:** 
   O projeto foi estruturado utilizando uma arquitetura baseada em componentes reutilizáveis. Foram criados os seguintes componentes:
   - `App`: Componente principal que engloba a aplicação.
   - `SearchControls`: Componente isolado responsável por capturar o termo digitado na barra de busca.
   - `BookCard`: Componente independente e modular que renderiza as informações de cada livro. Os dados (título, autor, categoria e status) circulam do componente pai para este componente filho via propriedades (*props*).
   - `AddBookForm`: Formulário funcional para permitir o cadastro de novos livros.

3. **Gerenciamento de Estado:** 
   Os estados globais, como a lista de livros inicial e o termo de busca, foram centralizados no componente `App` utilizando o hook `useState`. A filtragem em tempo real foi construída utilizando o hook `useMemo`, que observa a mudança na busca e reflete a lista filtrada na tela imediatamente, sem a necessidade de recarregar a página.

4. **Desafios Enfrentados:** 
   O principal aprendizado da equipe durante o desenvolvimento foi compreender a separação de responsabilidades na componentização (isolando formulário, busca e cards) e aplicar o fluxo unidirecional de dados do React utilizando variáveis reativas e *props*.

## Como Executar o Projeto

```bash
git clone [https://github.com/larissa-dosreis/Construcao-de-Interface-com-Framework.git](https://github.com/larissa-dosreis/Construcao-de-Interface-com-Framework.git)
cd Construcao-de-Interface-com-Framework
npm install
npm run dev