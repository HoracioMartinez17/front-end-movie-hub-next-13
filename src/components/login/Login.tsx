import css from './login.module.css';


const Login = () => {


    return (
      <div className={`${css.light_button} ${css.container}`}>
      <a href="api/auth/login" className={css.bt}>
          <div className={css.light_holder}>
              <div className={css.dot}></div>
              <div className={css.light}></div>
          </div>
          <div className={css.button_holder}>
              <svg role= "img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
  <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
              <p className={css.login_p}>LOGIN</p>
          </div>
      </a>
  </div>
    );
};


export  default Login;