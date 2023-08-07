// tela de cadastro

import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

import { criarProjeto } from '../services/projectService'; 

export default function Cadastro() {
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [responsavelP, setResponsavelP] = useState('');
  const [celularP, setCelularP] = useState('');
  const [emailP, setEmailP] = useState('');
  const [responsavelS, setResponsavelS] = useState('');
  const [celularS, setCelularS] = useState('');
  const [emailS, setEmailS] = useState('');
  const [erro, setErro] = useState('');
  const [formEnviado, setFormEnviado] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    //caso algum dos campos não tenha sido preenchido
    if (!razaoSocial || !cnpj || !responsavelP || !celularP || !emailP || !responsavelS || !celularS || !emailS) {
      setErro('Preencha todos os campos.');
      setFormEnviado(true);

      //definir borda do input não preenchido como vermelho
      //não aceitar apenas espaços no input de texto
      //não aceitar zero no input numérico

    }
    else {
      //enviar dados para o servidor e realizar ações necessárias
      console.log('Razão social:', razaoSocial);
      console.log('CNPJ:', cnpj);
      console.log('Responsável principal (Operação):', responsavelP);
      console.log('Celular do responsável principal:', celularP);
      console.log('Email do responsável principal:', emailP);
      console.log('Responsável suplente (Operação):', responsavelS);
      console.log('Celular do responsável suplente:', celularS);
      console.log('Email do responsável suplente:', emailS);


      // ACRESCENTAR NOVOS INPUTS!!!
      const projeto = { 
        "title": razaoSocial,
        "quantity": parseInt(cnpj), // Convertendo para número inteiro, já que o input é do tipo "number"
      };
      console.log(projeto)
      // Chamar a função "criarProjeto" para enviar o projeto para o servidor
      const response = criarProjeto(projeto);

      //limpar campos após envio bem sucedido
      setRazaoSocial('');
      setCnpj('');
      setResponsavelP('');
      setCelularP('');
      setEmailP('');
      setResponsavelS('');
      setCelularS('');
      setEmailS('');
      setErro('');
      setFormEnviado(false);
    }
  }

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
              Menu {/* alterar texto para logo nubank */}
            </Link>
          </div>
          
          <div className={styles.container}>
            <h1 className={styles.title}>
              CADASTRO DE PROJETO
            </h1>
            {/* abas de navegação para o cadastro */}
            <div className={styles.abasnav}>
              <h2 className={styles.botaoabaon}>
                <Link href="" className={styles.textoaba}> {/* link para dados do proponente */}
                  DADOS DO PROPONENTE
                </Link>
              </h2>
              <h2 className={styles.botaoaba}>
                <Link href="" className={styles.textoaba}> {/* link para dados do projeto */}
                  DADOS DO PROJETO
                </Link>
              </h2>
              <h2 className={styles.botaoaba}>
                <Link href="" className={styles.textoaba}> {/* link para dados do orçamento */}
                  ORÇAMENTO
                </Link>
              </h2>
            </div>
            {/* formulário cadastro dados do proponente */}
            <form onSubmit={handleSubmit} className={styles.formulario}>

              <div className={styles.inputs}>
                <label htmlFor="razaoSocial">RAZÃO SOCIAL:</label>
                <input
                type='text'
                id='razaoSocial'
                value={razaoSocial}
                onChange={(event) => setRazaoSocial(event.target.value)}
                className={styles.inputClassName}>
                </input>
              </div>

              <div className={styles.inputs}>
                <label htmlFor="cnpj">CNPJ:</label>
                <input
                type='number'
                id='cnpj'
                value={cnpj}
                onChange={(event) => setCnpj(event.target.value)}
                className={styles.inputClassName}>
                </input>
              </div>

              <div className={styles.inputs}>
                <label htmlFor="responsavelP">RESPONSÁVEL PRINCIPAL (OPERAÇÃO):</label>
                <input
                type='text'
                id='responsavelP'
                value={responsavelP}
                onChange={(event) => setResponsavelP(event.target.value)}
                className={styles.inputClassName}>
                </input>
              </div>
              <div className={styles.colunas}>
                <div className={styles.coluna50}>
                  <div className={styles.inputs}>
                    <label htmlFor="celularP">CELULAR (WHATSAPP):</label>
                    <input
                      type='number'
                      id='celularP'
                      value={celularP}
                      onChange={(event) => setCelularP(event.target.value)}
                      className={styles.inputClassName}>
                    </input>
                  </div>
                </div>
                  <div className={styles.coluna50}>
                    <div className={styles.inputs}>
                      <label htmlFor="emailP">EMAIL:</label>
                      <input
                        type='email'
                        id='emailP'
                        value={emailP}
                        onChange={(event) => setEmailP(event.target.value)}
                        className={styles.inputClassName}>
                      </input>
                    </div>
                  </div>
                </div>

                <div className={styles.inputs}>
                <label htmlFor="responsavelS">RESPONSÁVEL SUPLENTE (OPERAÇÃO):</label>
                <input
                type='text'
                id='responsavelS'
                value={responsavelS}
                onChange={(event) => setResponsavelS(event.target.value)}
                className={styles.inputClassName}>
                </input>
              </div>
              <div className={styles.colunas}>
                <div className={styles.coluna50}>
                  <div className={styles.inputs}>
                    <label htmlFor="celularS">CELULAR (WHATSAPP):</label>
                    <input
                      type='number'
                      id='celularS'
                      value={celularS}
                      onChange={(event) => setCelularS(event.target.value)}
                      className={styles.inputClassName}>
                    </input>
                  </div>
                </div>
                  <div className={styles.coluna50}>
                    <div className={styles.inputs}>
                      <label htmlFor="emailS">EMAIL:</label>
                      <input
                        type='email'
                        id='emailS'
                        value={emailS}
                        onChange={(event) => setEmailS(event.target.value)}
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
