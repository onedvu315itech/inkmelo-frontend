import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// assets
import GoogleIcon from 'assets/images/icons/google.svg';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import authServices from 'services/authServices';
import { useDispatch } from 'react-redux';
import { loginAction } from 'contexts/redux/auth/actions';
import { toast } from 'react-toastify';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

export default function FirebaseSocial() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const responseMessage = async (res) => {
    let dataOfGoogleAcc = {
      credential: res.credential,
      clientId: res.clientId,
      select_by: res.select_by
    };
    let resOfGoogleInfo = await authServices.loginGoogle(dataOfGoogleAcc);
    if (resOfGoogleInfo) {
      sessionStorage.setItem('jwtToken', JSON.stringify(resOfGoogleInfo.data.jwtToken));
      dispatch(loginAction(resOfGoogleInfo.data.username, resOfGoogleInfo.data.roles));
      navigate('/user');
      toast.success('Đăng nhập thành công');
    }
  };

  const errorMessage = (error) => {
    console.error(error);
  };

  return (
    <Stack
      direction="row"
      justifyContent={{ xs: 'center', sm: 'center' }}
      sx={{ '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 }, ml: { xs: 0, sm: -0.5 } } }}
    >
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
        onSuccess={responseMessage}
        onError={errorMessage}
        render={(renderProps) => (
          <Button
            variant="outlined"
            color="secondary"
            fullWidth={true}
            startIcon={<img src={GoogleIcon} alt="Google" />}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            {!downSM && 'Đăng nhập với google'}
          </Button>
        )}
      />
    </Stack>
  );
}
