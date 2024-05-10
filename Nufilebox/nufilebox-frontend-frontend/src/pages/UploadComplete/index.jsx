import './styles.css'
import Layout from '../../components/Layout'
import Box from '../../components/Box'
import HomeButton from '../../components/HomeButton'
import PasswordToCopy from '../../components/PasswordToCopy'
import LinkToCopy from '../../components/LinkToCopy'
import SuccessMessage from '../../components/SuccessMessage'
import { useLocation } from 'react-router-dom';


export default function UploadComplete() {
  const location = useLocation();
  const { password, link, jwt } = location.state;

  return (
    <Layout>
      <div className='box-container'>
        <Box>
          <SuccessMessage />
          <LinkToCopy link={link} />
          <PasswordToCopy password={password} />
          <HomeButton name='NEW FILE' jwt={jwt} />
        </Box>
      </div>
    </Layout>
  )
}