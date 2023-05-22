
    function Login(){
    
        const [show, setShow] = React.useState(true);
        const [status, setStatus] = React.useState('');
        const [user, setUser] = React.useState('');
        const ctx = React.useContext(UserContext) || { users: [] };
        const { isLoggedIn } = React.useContext(AuthContext);
        

    /*/React.useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          console.log(`user: ${user.email}`);
          setUser(user);
          setStatus('');
          setShow(false);
          ctx.user = user;
        }
      });
      return unsubscribe;
    }, [auth, ctx]);/*/
  
    return (
      <>
        <Card
          bgcolor="secondary"
          header="Login"
          status={status}
          body={
            show ? (
              <LoginForm setShow={setShow} setStatus={setStatus} setUser={setUser} />
            ) : (
              <LoginMsg setShow={setShow} setStatus={setStatus} user={user} />
            )
          }
        />
      </>
    );
  }

  function LoginMsg(props) {
    const currentUser = props.user.email;
    window.alert('you are logged in');
  
    return (
      <>
        <h5>Success</h5>
        <button type="submit"
                className="btn btn-secondary"
                onClick={() => props.setShow(true)}
        >Authenticate Again</button>
      </>
    );
  }
  
  function LoginForm(props) {
    //const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {setIsLoggedIn, setId, email, setEmail} = React.useContext(AuthContext);

    function handle() {
        console.log(email);
        fetch(`/account/login/${email}/${password}`)
         .then((response) => response.text())
         .then((text) => {
            try {
                const data = JSON.parse(text);
                setId(data._id);
                props.setStatus('');
                props.setShow(false);
                setIsLoggedIn(true);
            } catch(err) {
                props.setStatus(text);
                console.log('err:',text);
                console.log(err);
            }
         });
    }
  
    return (
      <>
        Email<br />
        <input
          type="input"
          className="form-control"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <br />
  
        Password<br />
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <br />
  
        <button type="submit" className="btn btn-secondary" onClick={handle}>
          Login
        </button>
        <p>
          <a href="#/CreateAccount/">CreateAccount</a>
        </p>
      </>
    );
  }

  function Logincorner(){
    const {isLoggedIn, email} = React.useContext(AuthContext);
    return (
        <>
        {!isLoggedIn && <p>Please Login First</p>}
        {isLoggedIn && <p>{email}</p>}  
        </>
    );
  }
  
 
