import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import brand from '~/public/text/brand';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import useStyles from './about-style';

function About(props) {
  const theme = useTheme();
  const classes = useStyles();
  const text = useText();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = props;
  return (
    <div className={classes.root}>
      <Container maxWidth={isMobile ? 'sm' : 'lg'}>
        <Grid container spacing={0}>
          <Grid item lg={2} xs={12} />
          <Grid item lg={9} xs={12}>
            <div className={classes.about}>
              <div className={classes.reward}>
                <div className={classes.item}>
                  <figure>
                    <img src="/images/unisex/icons8-github.svg" alt="badge" />
                  </figure>
                  <Typography variant="h5" className={text.subtitle}>Github</Typography>
                </div>
                <div className={classes.item}>
                  <figure>
                    <img src="/images/unisex/icons8-react.svg" alt="badge" />
                  </figure>
                  <Typography variant="h5" className={text.subtitle}>React.js</Typography>
                </div>
                <div className={classes.item}>
                  <figure>
                    <img src="/images/unisex/icons8-vue-js.svg" alt="badge" />
                  </figure>
                  <Typography variant="h5" className={text.subtitle}>Vue.js</Typography>
                </div>
              </div>
              <Hidden mdUp>
                <div className={classes.socmed}>
                  <IconButton aria-label="Delete" className={classes.margin} size="small">
                    <i className="ion-logo-facebook" />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin} size="small">
                    <i className="ion-logo-twitter" />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin} size="small">
                    <i className="ion-logo-google" />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin} size="small">
                    <i className="ion-logo-linkedin" />
                  </IconButton>
                </div>
                <Typography variant="h5">
                  {t('common:unisex-landing.banner_desc')}
                </Typography>
              </Hidden>
              <Paper className={classes.photo}>
                <figure>
                  <img src={brand.unisex.avatar} className={classes.avatar} alt="avatar" />
                </figure>
                <span className={classes.frame} />
              </Paper>
            </div>
            <div className={classes.line} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

About.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['unisex-landing'])(About);
