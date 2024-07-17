import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-regular-svg-icons';

// ================================|| LOGIN ||================================ //

export default function Login() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid sx={{ marginBottom: 30 + 'px', textAlign: 'center', }}>
            <Grid component={Link} to="/store"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  opacity: '70%'
                }
              }}
            >
              <Typography
                sx={{
                  marginRight: 1 + 'rem',
                  color: '#2E4362',
                  fontWeight: 700,
                  fontSize: 1.25 + 'rem',
                  display: 'inline',
                }}
              >
                Đến ngay thư viện sách <span style={{ color: 'rgb(220, 120, 0)' }}>InkMelo</span>
              </Typography>
            </Grid>
            <Grid sx={{ display: 'inline' }}>
              <FontAwesomeIcon style={{ fontSize: 1.25 + 'rem' }} icon={faHandPointLeft} />
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Đăng nhập</Typography>
            <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Chưa có tài khoản?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
