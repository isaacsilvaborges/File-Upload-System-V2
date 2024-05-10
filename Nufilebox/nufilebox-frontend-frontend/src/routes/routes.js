import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
import Download from '../pages/Download'
import UploadComplete from '../pages/UploadComplete'
import YaraProcess from '../pages/YaraProcess'
import EncryptProcess from '../pages/EncryptProcess'
import DecryptProcess from '../pages/DecryptProcess'
import DownloadComplete from '../pages/DownloadComplete'
import Authentication from '../pages/Authentication';
import { LoginCallback } from '@okta/okta-react';

export default function AppRoutes() {
  return (
    
    <Routes>
      <Route path='/' element={<Authentication />} />
      <Route path='/login/callback' element={<LoginCallback/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/:token" element={<Download />} />
      <Route path="/yaraprocess" element={<YaraProcess />} />
      <Route path="/encryptprocess" element={<EncryptProcess />} />
      <Route path='/uploadcomplete' element={<UploadComplete />} />
      <Route path="/decryptprocess" element={<DecryptProcess />} />
      <Route path='/downloadcomplete' element={<DownloadComplete />} />
    </Routes>
    
  )
}