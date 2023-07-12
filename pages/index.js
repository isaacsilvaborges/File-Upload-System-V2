import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Cadastro() {
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [numParticipantes, setNumParticipantes] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    //caso algum dos campos não tenha sido preenchido
    if (!nomeProjeto || !nomeResponsavel) {
      setErro('Preencha todos os campos.');
    }
    else {
      //enviar dados para o servidor e realizar ações necessárias
      console.log('Nome do projeto:', nomeProjeto);
      console.log('Número de participantes:', numParticipantes);

      //limpar campos após envio bem sucedido
      setNomeProjeto('');
      setNumParticipantes('');
      setErro('');
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Cadastro</title>
        {/* título que aparece na aba do navegador */}
        <link rel="icon" href="https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-0-1.png" />
        {/* ícone que aparece na aba do navegador */}
      </Head>

      <main>
        <h1 className={styles.title}>
          Cadastro de projeto
        </h1>

        <form onSubmit={handleSubmit} className={styles.formulario}>
          <div className={styles.inputs}>
            <label htmlFor="nomeProjeto">Nome do projeto:</label>
            <input
            type='text'
            id='nomeProjeto'>
            </input>
          </div>
          <div className={styles.inputs}>
            <label htmlFor="numParticipantes">Número de participantes:</label>
            <input
            type='number'
            id='numParticipantes'>
            </input>
          </div>
          <div className={styles.botao}>
            <input
            type='submit'
            onClick={handleSubmit}>
            </input>
          </div>
        </form>

        {/*<p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>*/}

      </main>

      <footer>
        <a
          href="https://nubank.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Nubank
        </a>
      </footer>

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
