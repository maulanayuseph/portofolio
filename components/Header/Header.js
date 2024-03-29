import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Link from 'next/link';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Fade from '@material-ui/core/Fade';
import { withTranslation } from '~/i18n';
import logo from '~/public/images/unisex-logo.svg';
import brand from '~/public/text/brand';
import { useText } from '~/theme/common';
import routeLink from '~/public/text/link';
import useStyles from './header-style';
import Settings from '../Settings';
import navMenu from '../SideNavigation/menu';

let counter = 0;
function createData(name, url, offset) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
    offset,
  };
}

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <AnchorLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function Header(props) {
  // Theme breakpoints
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const text = useText();

  const [fixed, setFixed] = useState(false);
  let flagFixed = false;
  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixed = (scroll > 80);
    if (flagFixed !== newFlagFixed) {
      setFixed(newFlagFixed);
      flagFixed = newFlagFixed;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const classes = useStyles();
  const {
    onToggleDark,
    onToggleDir,
    invert,
    t
  } = props;
  const [menuList] = useState([
    createData(navMenu[0], '#' + navMenu[0]),
    createData(navMenu[1], '#' + navMenu[1], -100),
    createData(navMenu[2], '#' + navMenu[2], -40),
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
    const body = document.getElementsByTagName('body');
    if (openDrawer) {
      body[0].style.overflow = 'auto';
    } else {
      body[0].style.overflow = 'hidden';
    }
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    const body = document.getElementsByTagName('body');
    body[0].style.overflow = 'auto';
  };

  return (
    <Fragment>
      <AppBar
        component="div"
        position="relative"
        id="header"
        className={clsx(
          classes.header,
          invert || fixed || isMobile ? classes.fixed : '',
          openDrawer && classes.openDrawer
        )}
      >
        <Container fixed={isDesktop}>
          <div className={classes.headerContent}>
            <nav className={clsx(classes.navLogo, invert && classes.invert)}>
              <IconButton
                onClick={handleOpenDrawer}
                className={clsx('hamburger hamburger--squeeze', classes.mobileMenu, openDrawer && 'is-active')}
              >
                <span className="hamburger-box">
                  <span className={clsx(classes.bar, 'hamburger-inner')} />
                </span>
              </IconButton>
              <div className={classes.logo}>
                {invert ? (
                  <Link href={routeLink.unisex.home}>
                    <a>
                      <img src={logo} alt="logo" />
                    </a>
                  </Link>
                ) : (
                  <AnchorLink href="#home">
                    <img src={logo} alt="logo" />
                  </AnchorLink>
                )}
              </div>
              <Settings toggleDark={onToggleDark} toggleDir={onToggleDir} invert={invert} />
            </nav>
          </div>
        </Container>
      </AppBar>
      <Fade in={openDrawer}>
        <div className={clsx(classes.paperNav, openDrawer && classes.show)}>
          <div className={classes.mobileNav}>
            <Container maxWidth="md">
              <Grid container spacing={6}>
                <Grid item sm={6}>
                  <div className={classes.rootMenu}>
                    <Hidden mdDown>
                      <Typography variant="h5" className={classes.nameDeco}>
                        EXPLORE
                      </Typography>
                    </Hidden>
                    {openDrawer && (
                      <ul className={classes.menu}>
                        {menuList.map((item, index) => (
                          <li key={item.id.toString()} style={{ animationDuration: index * 0.15 + 's' }}>
                            {invert ? (
                              // eslint-disable-next-line
                              <Button href={'/' + item.url}>
                                {t('common:unisex-landing.header_' + item.name)}
                              </Button>
                            ) : (
                              // eslint-disable-next-line
                              <Button component={AnchorLink} onClick={handleCloseDrawer} offset={item.offset || 0} href={item.url}>
                                {t('common:unisex-landing.header_' + item.name)}
                              </Button>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Grid>
                <Grid item sm={6}>
                  <div className={classes.detail}>
                    <Hidden mdDown>
                      <Typography variant="h5" className={classes.nameDeco}>
                        CONTACT
                      </Typography>
                    </Hidden>
                    <div className={classes.logoName}>
                      <Typography variant="h3" className={text.title}>
                        {brand.unisex.name}
                      </Typography>
                      <Typography variant="h4" className={text.subtitle}>
                        {brand.unisex.title}
                      </Typography>
                    </div>
                    <div className={classes.socmed}>
                      <Link href={brand.unisex.facebook}>
                        <IconButton aria-label="Delete" className={classes.margin} size="small">
                          <i className={clsx('ion-logo-facebook', classes.fb)} />
                        </IconButton>
                      </Link>
                      <Link href={brand.unisex.instagram}>
                        <IconButton aria-label="Delete" className={classes.margin} size="small">
                          <i className={clsx('ion-logo-instagram', classes.ig)} />
                        </IconButton>
                      </Link>
                      <Link href={brand.unisex.linkedin}>
                        <IconButton aria-label="Delete" className={classes.margin} size="small">
                          <i className={clsx('ion-logo-linkedin', classes.in)} />
                        </IconButton>
                      </Link>
                    </div>
                    <div className={classes.contact}>
                      <Typography className={text.paragraph}>
                        {t('common:unisex-landing.footer_contact')}
                        <br />
                        {brand.unisex.noHP}
                      </Typography>
                      <Divider className={classes.divider} />
                      <Typography className={text.paragraph}>
                        {t('common:unisex-landing.footer_hello')}
                        <br />
                        {brand.unisex.prefix}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </Fade>
    </Fragment>
  );
}

Header.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  invert: PropTypes.bool,
  t: PropTypes.func.isRequired
};

Header.defaultProps = {
  invert: false
};

export default withTranslation(['unisex-landing'])(Header);
