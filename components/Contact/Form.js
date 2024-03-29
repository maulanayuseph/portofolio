import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import useStyles from './contact-style';

function Form(props) {
  const classes = useStyles();
  const text = useText();
  const { t } = props;
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [openNotif, setNotif] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    setNotif(true);
    const { message, phone } = values;
    const url = `https://api.whatsapp.com/send/?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
    window.location.href = url;
  };

  const handleClose = () => {
    setNotif(false);
  };

  return (
    <div className={classes.formWrap}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key="top right"
        open={openNotif}
        autoHideDuration={4000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Message Sent</span>}
      />
      <Paper className={classes.formBox}>
        <Grid container spacing={6}>
          <Grid item lg={5} xs={12}>
            <Typography className={clsx(classes.title, text.title)} variant="h3">
              Contact&nbsp;
              <span>Me.</span>
            </Typography>
          </Grid>
          <Grid item lg={7} xs={12}>
            <div className={classes.form}>
              <ValidatorForm
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)}
              >
                <TextValidator
                  className={classes.input}
                  label={t('common:unisex-landing.form_name')}
                  onChange={handleChange('name')}
                  name="Name"
                  value={values.name}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
                <TextValidator
                  className={classes.input}
                  label={t('common:unisex-landing.form_hp')}
                  onChange={handleChange('phone')}
                  name="Phone"
                  value={values.phone}
                  validators={['required']}
                  errorMessages={['this field is required', 'phone is not empty']}
                />
                <TextValidator
                  multiline
                  rows="6"
                  className={classes.input}
                  label={t('common:unisex-landing.form_message')}
                  onChange={handleChange('message')}
                  name="Message"
                  value={values.message}
                />
                <div className={classes.btnArea}>
                  <Button variant="contained" type="submit" color="primary" size="large">
                    {t('common:unisex-landing.form_send')}
                  </Button>
                </div>
              </ValidatorForm>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

Form.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['unisex-landing'])(Form);
