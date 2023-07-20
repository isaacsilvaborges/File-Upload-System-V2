// tela de cadastro

import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Cadastro() {
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [numParticipantes, setNumParticipantes] = useState('');
  const [erro, setErro] = useState('');
  const [formEnviado, setFormEnviado] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    //caso algum dos campos não tenha sido preenchido
    if (!nomeProjeto || !numParticipantes) {
      setErro('Preencha todos os campos.');
      setFormEnviado(true);
      //definir borda do input não preenchido como vermelho
      //não aceitar apenas espaços no input de texto
      //não aceitar zero no input numérico
    }
    else {
      //enviar dados para o servidor e realizar ações necessárias
      console.log('Nome do projeto:', nomeProjeto);
      console.log('Número de participantes:', numParticipantes);

      //limpar campos após envio bem sucedido
      setNomeProjeto('');
      setNumParticipantes('');
      setErro('');
      setFormEnviado(false);

      //adicionar mensagem de cadastro realizado com sucesso
    }
  }

  const inputClassName = formEnviado && (!nomeProjeto || !numParticipantes) ? 'input-error' : '';
  // define a classe CSS 'input-error' se o formulário for enviado com algum input vazio

  return (
    <div>
      <Head>
        <title>Cadastro</title>
        {/* título que aparece na aba do navegador */}
        <link rel="icon" href="https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-0-1.png" />
        {/* ícone que aparece na aba do navegador */}
      </Head>
      

      <main>
        <div className={styles.pagina}> {/* página dividida em barra lateral e conteúdo */}
          <div className={styles.barralateral}>
            <Link href="menu" className={styles.logomenu}>
              Menu
            </Link>
          </div>
          
          <div className={styles.container}>
            <h1 className={styles.title}>
              Cadastro de projeto
            </h1>

            <form onSubmit={handleSubmit} className={styles.formulario}>

              <div className={styles.inputs}>
                <label htmlFor="nomeProjeto">Nome do projeto:</label>
                <input
                type='text'
                id='nomeProjeto'
                value={nomeProjeto}
                onChange={(event) => setNomeProjeto(event.target.value)}
                className={styles.inputClassName}>
                </input>
              </div>


              <div className={styles.colunas}>
                <div className={styles.coluna50}>
                  <div className={styles.inputs}>
                    <label htmlFor="numParticipantes">Número de participantes:</label>
                    <input
                    type='number'
                    id='numParticipantes'
                    value={numParticipantes}
                    onChange={(event) => setNumParticipantes(event.target.value)}
                    className={styles.inputClassName}>
                    </input>
                  </div>
                </div>
                <div className={styles.coluna50}>
                  <div className={styles.inputs}>
                    <label htmlFor="numParticipantes">Exemplo:</label>
                    <input
                    type='text'
                    id='numParticipantes'
                    value={numParticipantes}
                    onChange={(event) => setNumParticipantes(event.target.value)}
                    className={styles.inputClassName}>
                    </input>
                  </div>
                </div>
              </div>

              {erro && <p>{erro}</p>}

              <div className={styles.botao}>
                <input
                type='submit'
                onClick={handleSubmit}>
                </input>
              </div>

            </form>
          </div>
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 70px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
