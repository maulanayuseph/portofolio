import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import ScrollAnimation from 'react-scroll-animation-wrapper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import useStyles from './timeline-style';
import brand from '~/public/text/brand';

function Timeline(props) {
  const classes = useStyles();
  const text = useText();
  const theme = useTheme();

  const { t } = props;

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [play, setPlay] = useState(false);

  const handlePlay = visible => {
    if (visible.inViewport) {
      setTimeout(() => { setPlay(true); }, 500);
    }
  };

  return (
    <div className={classes.root}>
      <Container fixed={isDesktop}>
        <Grid container spacing={0}>
          <Grid item lg={2} xs={12}>
            <Hidden mdDown>
              <Typography variant="h2" className={classes.nameDeco}>
                {brand.unisex.name}
              </Typography>
            </Hidden>
          </Grid>
          <Grid item container spacing={3} md={12} lg={10}>
            <Grid item md={5} sm={6} xs={12}>
              <div className={classes.history}>
                <Typography variant="h5" className={clsx(classes.title, text.subtitle)}>
                  {t('common:unisex-landing.timeline_experience')}
                </Typography>
                <ul>
                  <li>
                    <ScrollAnimation
                      animateOnce
                      animateIn="fadeInLeftShort"
                      offset={100}
                      delay={300}
                      duration={0.3}
                    >
                      <div>
                        <Typography variant="h3" gutterBottom className={text.subtitle2}>Frontend Engineer</Typography>
                        <Typography gutterBottom>at maulanayuseph.com</Typography>
                        <Typography className={classes.time}>2013 - Present</Typography>
                      </div>
                    </ScrollAnimation>
                  </li>
                  <li>
                    <ScrollAnimation
                      animateOnce
                      animateIn="fadeInLeftShort"
                      delay={200}
                      duration={0.3}
                    >
                      <div>
                        <Typography variant="h3" gutterBottom className={text.subtitle2}>Frontend Engineer</Typography>
                        <Typography gutterBottom>at UPTD PLDDIG JABAR DIGITAL SERVICES</Typography>
                        <Typography className={classes.time}>2021 - 2023</Typography>
                      </div>
                    </ScrollAnimation>
                  </li>
                  <li>
                    <ScrollAnimation
                      animateOnce
                      animateIn="fadeInLeftShort"
                      offset={300}
                      delay={500}
                      duration={0.3}
                    >
                      <div>
                        <Typography variant="h3" gutterBottom className={text.subtitle2}>Frontend Engineer</Typography>
                        <Typography gutterBottom>at Kerjasama Untuk Negeri</Typography>
                        <Typography className={classes.time}>2020</Typography>
                      </div>
                    </ScrollAnimation>
                  </li>
                  <li>
                    <ScrollAnimation
                      animateOnce
                      animateIn="fadeInLeftShort"
                      offset={200}
                      delay={400}
                      duration={0.3}
                    >
                      <div>
                        <Typography variant="h3" gutterBottom className={text.subtitle2}>Frontend Engineer</Typography>
                        <Typography gutterBottom>at Digital Muslim Global</Typography>
                        <Typography className={classes.time}>2019</Typography>
                      </div>
                    </ScrollAnimation>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item sm={6} xs={12}>
              <div className={classes.progress}>
                <Typography variant="h5" className={clsx(classes.title, text.subtitle)}>
                  {t('common:unisex-landing.timeline_skill')}
                </Typography>
                <ScrollAnimation
                  animateOnce
                  animateIn="fadeIn"
                  delay={400}
                  duration={0.3}
                  afterAnimatedIn={handlePlay}
                >
                  <ul>
                    <li>
                      <div className={classes.textIcon}>
                        <i className="ion-ios-color-wand" />
                        <Typography variant="h6" className={text.subtitle2}>Website Development</Typography>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={play ? 95 : 0}
                        classes={{
                          root: classes.progressBg,
                          bar: classes.bar
                        }}
                      />
                    </li>
                    <li>
                      <div className={classes.textIcon}>
                        <i className="ion-logo-dribbble" />
                        <Typography variant="h6" className={text.subtitle2}>UI Interface Design</Typography>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={play ? 90 : 0}
                        classes={{
                          root: classes.progressBg,
                          bar: classes.bar
                        }}
                      />
                    </li>
                    <li>
                      <div className={classes.textIcon}>
                        <i className="ion-ios-globe" />
                        <Typography variant="h6" className={text.subtitle2}>HTML Prototyping</Typography>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={play ? 95 : 0}
                        classes={{
                          root: classes.progressBg,
                          bar: classes.bar
                        }}
                      />
                    </li>
                    <li>
                      <div className={classes.textIcon}>
                        <i className="ion-ios-analytics" />
                        <Typography variant="h6" className={text.subtitle2}>Website Enhancement / Editing</Typography>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={play ? 95 : 0}
                        classes={{
                          root: classes.progressBg,
                          bar: classes.bar
                        }}
                      />
                    </li>
                    <li>
                      <div className={classes.textIcon}>
                        <i className="ion-ios-snow" />
                        <Typography variant="h6" className={text.subtitle2}>Website Maintenance</Typography>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={play ? 95 : 0}
                        classes={{
                          root: classes.progressBg,
                          bar: classes.bar
                        }}
                      />
                    </li>
                  </ul>
                </ScrollAnimation>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Timeline.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['unisex-landing'])(Timeline);
