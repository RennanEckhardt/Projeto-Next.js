# Aplicação de Lembretes

Este é um projeto de aplicação de lembretes desenvolvido com Next.js. A aplicação permite que os usuários criem, listem e excluam lembretes.

#Link da Especificaçao
https://drive.google.com/file/d/1cCH5l47FRnVlzU23zvv10NPfd_ZiOK2W/view

## Começando

Siga as etapas abaixo para iniciar o servidor de desenvolvimento e executar a aplicação localmente.

### Pré-requisitos

Certifique-se de que o Node.js e o npm estejam instalados em seu sistema.

### Instalação

1. Clone o repositório ou baixe o código-fonte deste projeto para o seu computador.
2. Abra um terminal de comando e navegue até a pasta raiz do projeto.
3. Instale as dependências do projeto executando o seguinte comando:

```bash
npm install
Executando o Servidor de Desenvolvimento
Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento da seguinte forma:
npm run dev
Isso iniciará o servidor de desenvolvimento do Next.js.

Agora para outro terminal na pasta raiz do projeto e execute
json-server --watch db.json --port 3004
isso iniciara o "banco de dados"

Acessando a Aplicação
Abra o seu navegador da web e acesse o seguinte URL:
http://localhost:3000
A aplicação de lembretes estará disponível para uso no seu navegador.

Recursos Adicionais
A aplicação de lembretes utiliza as seguintes tecnologias e recursos:

Tailwind CSS: O Tailwind CSS é utilizado para a estilização da aplicação, garantindo uma interface de usuário agradável.
Moment.js: A biblioteca Moment.js é usada para a manipulação de datas na aplicação, tornando o gerenciamento de lembretes baseado em data simples e eficaz.
API REST: A aplicação se comunica com uma API REST local para persistir os dados dos lembretes. O serviço JSON Server é utilizado para fornecer essa funcionalidade.
