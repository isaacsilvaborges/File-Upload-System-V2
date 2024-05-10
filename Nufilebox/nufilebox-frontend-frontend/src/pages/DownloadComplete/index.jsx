import React from 'react'
import './styles.css'
import Layout from '../../components/Layout'
import Box from '../../components/Box'
import HomeButton from '../../components/HomeButton'
import DownloadCompleteMessage from '../../components/DownloadCompleteMessage'

export default function DownloadComplete() {

  return (
    <Layout>
      <div className='box-download-complete'>
        <Box>
          <DownloadCompleteMessage/>
          <HomeButton name='TRY SHARING FILES SAFELY'/>
        </Box>
      </div>
    </Layout>
  )
}
