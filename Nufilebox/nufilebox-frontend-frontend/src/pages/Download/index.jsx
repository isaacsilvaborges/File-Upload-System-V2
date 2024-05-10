import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './styles.css'
import Layout from '../../components/Layout'
import Box from '../../components/Box'
import DownloadButton from '../../components/DownloadButton'
import DownloadMessage from '../../components/DownloadMessage'
import DownloadPassword from '../../components/DownloadPassword'
import DownloadFiles from '../../components/DownloadFiles'
import { getFileInfo } from '../../services/api'

export default function Download() {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [daysToExpire, setDaysToExpire] = useState(null);
  const [remainingDownloads, setRemainingDownloads] = useState(null);
  const navigate = useNavigate();

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fileInfo = await getFileInfo(token);

        setFileSize(fileInfo.fileSize);
        setFileName(fileInfo.fileName);
        setDaysToExpire(fileInfo.daysToExpire);
        setRemainingDownloads(fileInfo.remainingDownloads);

        if (daysToExpire === 0 || remainingDownloads === 0) {
          navigate('/downloadComplete');
        }
      } catch (error) {
        if (error.isNotFoundError) {
          navigate('/downloadComplete');
        }
        else {
          console.error('fetch error:', error);
        }
      }
    };
    fetchData();
  }, [token, fileName, fileSize, daysToExpire, remainingDownloads, navigate]);

  return (
    <Layout>
      <div className='box-download'>
        <Box>
          <DownloadMessage />
          <DownloadFiles fileSize={fileSize} daysToExpire={daysToExpire} downloadsToExpire={remainingDownloads} />
          <DownloadPassword value={password} onChange={handlePasswordChange} />
          <DownloadButton name='DOWNLOAD' password={password} token={token} fileName={fileName} />
        </Box>
      </div>
    </Layout>
  )
}