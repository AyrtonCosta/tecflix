import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
// import { func } from 'prop-types';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, SetCategorias] = useState([]);

  useEffect(() => {
    const URL_TOP = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://makeflix.herokuapp.com/categorias';

    fetch(URL_TOP)
      .then(async (respostaDoServidor) => {
        const reposta = await respostaDoServidor.json();
        SetCategorias([
          ...reposta,
        ]);
      });

  //  setTimeout(() => {
    //     SetCategorias([
  //      ...categorias,
  //      {
    //         id: 1,
    //         nome: 'Front end ',
    //          descricao: 'uma categoria',
    //         cor: '#cbd1ff',
    //       },
    //        {
    //         id: 2,
    //         nome: 'back end ',
    //         descricao: 'outra  categoria',
    //         cor: '#cbd1ff',
    //        },
    //     ]);
    //   }, 4 * 1000);
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>

      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        SetCategorias([
          ...categorias,
          values,
        ]);
        clearForm();
      }}
      >

        <FormField
          label="Nome da Categoria"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          value={values.descricao}
          name="descricao"
          onChange={handleChange}
        />

        <FormField
          label="cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
     
      </form>

      {categorias.length === 0 && (
      <div>
        Loading ...
      </div>
      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para Home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
