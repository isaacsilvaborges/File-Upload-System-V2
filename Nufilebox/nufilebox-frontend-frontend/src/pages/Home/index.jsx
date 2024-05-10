import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import './styles.css';
import Layout from '../../components/Layout';
import Box from '../../components/Box';
import UploadContainer from '../../components/UploadContainer';
import PasswordTextField from '../../components/PasswordTextField';
import TextFieldGroup from '../../components/TextFieldGroup';
import FileNameField from '../../components/FileNameField';
import UploadButton from '../../components/UploadButton';
import { withOktaAuth } from '@okta/okta-react'; 

function Home(props) {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState(generatePassword);
  const [days, setDays] = useState(3);
  const [downloads, setDownloads] = useState(10);
  const [jwt, setJwt] = useState(null);
  const [remountUploadContainer, setRemountUploadContainer] = useState(false);
  const { authState } = props;

  function handleFile(uploadedFile) {
    setFile(uploadedFile);
    setRemountUploadContainer(false);
  }

  function handleDeleteFile() {
    setFile(null);
    setRemountUploadContainer(true);
  }

  function handleDaysChange(e) {
    setDays(e.target.value);
  }

  function handleDownloadsChange(e) {
    setDownloads(e.target.value);
  }

  function handleKeyIcon() {
    setPassword(generatePassword);
  }

  function generatePassword() {
    var password = '';

    var wordsLength = parseInt(process.env.REACT_APP_WORDS_LENGTH);
    var passwordSize = parseInt(process.env.REACT_APP_PASSWORD_SIZE);

    for (var words= 0; words < passwordSize; words++) {
      password += faker.word.sample(wordsLength) + " ";
    }
    
    return password.trim();
  }

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (authState?.isAuthenticated) {
        const accessToken = await authState.accessToken.accessToken;
        setJwt(accessToken);
      }
    };

    fetchAccessToken();
  }, [authState?.isAuthenticated]);
  
  return (
    <Layout>
      <div className="box-container">
        <Box>
          {remountUploadContainer ? (
            <UploadContainer key={Date.now()} func={handleFile} /> 
          ) : (
            <UploadContainer func={handleFile} />
          )}
          {file && (
            <FileNameField fileName={file.name} fileSize={file.size} onDeleteFile={handleDeleteFile} showDeleteIcon={true} />
          )}
          <PasswordTextField password={password} onClickKey={handleKeyIcon} />
          <TextFieldGroup days={days} downloads={downloads} onChangeDays={handleDaysChange} onChangeDownloads={handleDownloadsChange} />
          <UploadButton name='UPLOAD' selectedFile={file} password={password} days={days} downloads={downloads} jwt={jwt} />
        </Box>
      </div>
    </Layout>
  );
}

export default withOktaAuth(Home);