import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function PaginaPrincipal() {
    return (
      <div className={styles.container}>
        <Head>
            <title>Página Principal</title>
            {/* título que aparece na aba do navegador */}
            <link rel="icon" href="https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-0-1.png" />
            {/* ícone que aparece na aba do navegador */}
        </Head>

        <main>
        <h1 className={styles.title}>ESG Management</h1>

        <div className={styles.grid}>
          <a href="/"docs className={styles.card}>
            <h3>Cadastro de projeto &rarr;</h3>
            <p>Preencha o formulário para cadastrar um novo projeto</p>
          </a>
        </div>
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
    );
  }