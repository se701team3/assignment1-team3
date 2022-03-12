import React from 'react';
import classes from './SignInPage.module.css';
import googleLogin from '../../assets/icons/google-login.svg';
import logoBlack from '../../assets/logos/logo-black.svg';

export default function SignInPage(props) {
  const signInHandler = ()=>{
    console.log('Logging in');
  };

  return (
    <div className={classes.Background}>
      <div className={classes.InnerBox}>
        <p className={classes.WelcomeBackText}>
          Welcome Back!
        </p>

        {/* Sign in Button */}
        <div className={classes.SignInButton} onClick={signInHandler}>
          <img src={googleLogin} alt="googleLogin" className={classes.GoogleLoginImage}/>
          <p className={classes.SignInText}>
            Sign in with Google
          </p>
        </div>

        {/* Create google account */}
        <p className={classes.CreateAccountText}>
          Please sign in using your Google account, if you do not have an
          account, create on <a href="https://accounts.google.com/SignUp?hl=en">here</a>
        </p>

        <img
          className={classes.Logo}
          src={logoBlack}
          alt="logo_black"/>


      </div>
    </div>
  );
}
