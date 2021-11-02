const handleSearch = async (event) => {
  event.preventDefault();

  // Exibir mensagem de carregamento
  const message = document.querySelector('#message');
  message.innerHTML = 'buscando...';

  // Limpa lista de programas
  const listaDeProgramas = document.querySelector('#shows');
  listaDeProgramas.innerHTML = '';

  // Obter o texto digitado pelo usuário

  const caixaDeBusca = document.querySelector('#query');
  const textoASerBuscado = caixaDeBusca.value;

  // Formar a URL de consulta
  const url = `https://api.tvmaze.com/search/shows?q=${textoASerBuscado}`;

  // Realizar a consulta na API de forma assíncrona
  const resposta = await fetch(url);
  const programas = await resposta.json();

  // Finaliza o procedimento caso não haja nenhum resultado
  if (programas.length === 0) {
    // Exibir mensagem de não encontrado
    message.innerHTML = 'nenhum resultado encontrado.';
    return;
  }

  // Limpar a mensagem
  message.innerHTML = '';

  // Iterar pelos programas
  programas.forEach((programa) => {
    // Obter os dados do programa
    const titulo = programa?.show?.name || '';
    const imagem = programa?.show?.image?.medium || '';

    // Inserir os programas na lista de resultados
    listaDeProgramas.insertAdjacentHTML(
      'beforeend',
      `
      <li>
        <img class="poster" src="${imagem}">
        <span class="show-name">${titulo}</span>
      </li>
      `
    );
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSearch);
});