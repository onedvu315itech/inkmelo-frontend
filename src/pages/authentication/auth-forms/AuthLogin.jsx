import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Step 1: Import useNavigate

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import FirebaseSocial from './FirebaseSocial';

// Validation schema
import * as Yup from 'yup';
import authServices from 'services/authServices';
import { useDispatch } from 'react-redux';
import { loginAction } from 'contexts/redux/auth/actions';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Tài khoản quá ngắn!")
    .max(255)
    .required('Tài khoản là bắt buộc'),
  password: Yup.string()
    .min(2, "Mật khẩu quá ngắn!")
    .max(255)
    .required('Mật khẩu là bắt buộc')
});

const AuthLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    checked: false,
    showPassword: false,
    errors: {
      username: '',
      password: ''
    },
    touched: {
      username: false,
      password: false
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleClickShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      checked: event.target.checked
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setFormData({
      ...formData,
      touched: {
        ...formData.touched,
        [name]: true
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = formData;

    try {
      await validationSchema.validate({ username, password }, { abortEarly: false });
      let isValid = await checkCredentials(username, password);

      if (isValid.status === 200) {
        if (isValid.data.jwtToken) {
          sessionStorage.setItem("jwtToken", JSON.stringify(isValid.data.jwtToken));
        }
        dispatch(loginAction(isValid.data.username, isValid.data.roles));

        // Authorization
        let roles = isValid.data.roles

        if (roles.includes('ADMIN')) {
          navigate('/admin/dashboard');
          toast.success('Đăng nhập thành công');
        } else if (roles.includes('MANAGER')) {
          navigate('/store');
          toast.success('Đăng nhập thành công');
        } else {
          navigate('/user');
          toast.success('Đăng nhập thành công');
        }
      } else {
        let errors = { submit: isValid.response.data.message };
        setFormData({ ...formData, errors });
      }

    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setFormData({ ...formData, errors });
      }
    }
  };

  const checkCredentials = async (username, password) => {
    try {
      let res = await authServices.login(username, password);
      if (res) return res;
      else return;
    } catch (err) {
      return err;
    }
  }

  const { username, password, checked, showPassword, errors, touched } = formData;

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="username-login">Tài khoản</InputLabel>
              <OutlinedInput
                id="username-login"
                type="text"
                value={username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Nhập tên tài khoản"
                fullWidth
                error={Boolean(touched.username && errors.username)}
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text-username-login">
                  {errors.username}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Mật khẩu</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(touched.password && errors.password)}
                id="password-login"
                type={showPassword ? 'text' : 'password'}
                value={password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      color="secondary"
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Nhập mật khẩu"
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mt: -1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    name="checked"
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="h6">Giữ tôi đăng nhập</Typography>}
              />
              <Link variant="h6" component={RouterLink} color="text.primary">
                Quên mật khẩu?
              </Link>
            </Stack>
          </Grid>
          {errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
              Đăng nhập
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography variant="caption"> Đăng nhập với</Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <FirebaseSocial />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AuthLogin;