'use client';
import "bootstrap/dist/css/bootstrap.min.css"; // Importa o estilo CSS do Bootstrap para estilizar a aplicação.
import "bootstrap-icons/font/bootstrap-icons.css"; // Importa os ícones do Bootstrap.
import 'tailwindcss/tailwind.css'; // Importa os estilos do Tailwind CSS.
import 'moment/locale/pt-br';// Importa a localização do Moment.js para o Português do Brasil.
import moment from 'moment';// Importa a biblioteca Moment.js para manipulação de datas.
import { FormEvent, useState, useEffect } from "react";  // Importa hooks e componentes do React.
export default function Home() {
  moment.locale('pt-br'); // Configura a localização do Moment.js para o Português do Brasil.
  const [name, setNome] = useState(""); // Estado para armazenar o nome do lembrete.
  const [date, setData] = useState(""); // Estado para armazenar a data do lembrete.
  const [lembretes, setLembretes] = useState([]); // Estado para armazenar a lista de lembretes.
  const [error, setError] = useState(""); // Estado para armazenar mensagens de erro.

  // O hook useEffect é usado para executar a função setarDados() quando o componente é montado.
  useEffect(() => {
    setarDados();
  }, []);
  // Declaração da função "submit" chamada quando o formulário é submetido.
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Verifica se os campos obrigatorios estao preenchidos corretamente
    if (!name || !date) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    //Verifica a data
    const dataatual = new Date();
    const dataselecionada = new Date(date);
    if (dataselecionada <= dataatual) {
      setError("A data deve ser maior que a data atual.");
      return;
    }

    setError("");
    // Faz uma requisição POST para adicionar um novo lembrete ao servidor.
    const response = await fetch('http://localhost:3004/posts', {
      method: 'POST',
      body: JSON.stringify({ name, date }),
      headers: {
        "Content-Type": "application/json",
      }
    });

    setNome("");
    setData("");
    //Chama a funçao para gravar os dados novos na variavel de exibiçao
    await setarDados();
  }
  //Busca os novos dados no banco e os adicionar a variavel lembretes
  async function setarDados() {
    const BuscaDados = await fetch('http://localhost:3004/posts', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });
    const dados = await BuscaDados.json();
    setLembretes(dados);
  }
  //Ordena os dados em ordem de data mais recente para mais longe e os separa por data
  function ordenarLembretes(lembretes: any) {
    const ordenarlembrete: Record<string, any[]> = {};
    //ordena os dados
    lembretes.sort((b: any, a: any) => {
      const dataA = new Date(a.date);
      const dataB = new Date(b.date);
      return (dataB as any) - (dataA as any);
    });
    //separa os eventos por data
    lembretes.forEach((lembrete: any) => {
      const data = lembrete.date;
      if (!ordenarlembrete[data]) {
        ordenarlembrete[data] = [];
      }

      ordenarlembrete[data].push(lembrete);
    });
    //retorna as datas e os lembretes ja ordenados 
    return ordenarlembrete;
  }

  //Exclui os lembretes atravez do id recebido   
  const excluirLembrete = async (data: string, lembrete: any) => {
    const deletaDados = await fetch('http://localhost:3004/posts/' + lembrete['id'], {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    });
    //atualiza os dados no banco
    await setarDados();
  };

  //Busca os lembretes ja ordenados e atualizados para exibir
  const lembretesOrdenados = ordenarLembretes(lembretes);
  //Parte do codigo onde a aplicaçao sera renderizada
  return (
    <div className="container mx-auto p-4 background ">
      <h1 className=" text-2xl text-center mb-4">Novo lembrete</h1>
      <form onSubmit={submit} className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(event) => setNome(event.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data:</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(event) => setData(event.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow focus:ring focus:ring-blue-200"
            />
          </div>
        </div>
        {error && <div className=" erro mt-4 border border-red-600 rounded-md p-2 text-red-600">{error}</div>}
        <div className="d-flex flex-row-reverse">
          <button type="submit" className="shadow mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md focus:ring focus:ring-blue-200">
            Adicionar
          </button>
        </div>
      </form>
      <div className="card-lista shadow p-3 mb-5 bg-white rounded">
        <h2 className="text-2xl text-center mt-1 mb-1">Lista de Lembretes</h2>
        {Object.keys(lembretesOrdenados).length == 0 && <div className="mt-8 mb-8 text-center text-muted">{"Não há lembretes adicionados."}</div>}
        {Object.keys(lembretesOrdenados).map((data) => (
          <div key={data}>
            <h3 className="text-lg">{moment(data).format('DD [de] MMMM [de] YYYY')}</h3>
            <ul className="list-disc list-inside">
              {lembretesOrdenados[data].map((lembrete, index) => (
                <li key={index} className="mt-2 flex justify-between items-center border rounded-md p-2 mb-2 shadow-sm">
                  {lembrete.name}
                  <button onClick={() => excluirLembrete(data, lembrete)} type="button" className="text-red-500 hover:text-red-700">
                    <i className="bi bi-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
