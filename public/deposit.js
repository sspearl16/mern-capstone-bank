function Deposit(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [title, setTitle] = React.useState('PLease Login First');
    //const [user, setUser] = React.useState('');
    const {isLoggedIn} = React.useContext(AuthContext);
    //const ctx = React.useContext(UserContext);
    //const [balance, setBalance] = React.useState('');

    //let currentBalance = `Current Balance: ${ctx.users.balance}`;;
    //console.log(currentBalance);

    React.useEffect(() => {
        if (isLoggedIn == true) setTitle('');
    }, []);
        
        
    return (
    <>
    <Card 
        bgcolor="secondary"
        header={
            <>
            <h5>Deposit</h5><br/>
            {isLoggedIn && <>Current Balance: {CurrentBalance()}</>}
            </>
        }
        title={title}
        //status={status}
        body={
            isLoggedIn ? (
                show ? (
                <DepositForm setTitle={setTitle} setShow={setShow} setStatus={setStatus}/> ) : (
                <DepositMsg setTitle={setTitle} setShow={setShow} setStatus={setStatus} />
            )
        ) : (
            <DepositLogin setTitle={setTitle} setShow={setShow} setStatus={setStatus} />
        )   
        }
    />
    </>
    );
}

function DepositMsg(props) {
    return(
        <>
        <h5>Deposit Successful</h5>
        <button type="submit" 
        className="btn btn-secondary" 
        onClick={() => {
            props.setShow(true);
            props.setTitle('');
        }}>Make Another Deposit</button>
        </>
    );
}

function DepositForm(props){
    //const [name, setName] = React.useState('');
    const {email} = React.useContext(AuthContext);
    const [amount, setAmount] = React.useState('');
    //const ctx = React.useContext(UserContext);

    function handle(){
        console.log(email, amount);
        if (amount <= 0) {
            alert("please enter a positive amount");
            return;
        }
        const url=`/account/deposit/${email}/${amount}`;
        fetch(url)
         .then(response => response.json())
         .then(data => {
            //ctx.users.balance += amount;
            //props.setBalance(ctx.users.balance);
            //setBalance(balance + parseFloat(amount));
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('data', data);
            window.alert(`You deposited $${amount}!`);
         })
         .catch(error => console.error(error));
    }

    return(
        <>
        Email<br/>
        <input type="input" className="form-control" placeholder="Enter Email" value={email} readOnly /><br/>

        Amount<br/>
        <input type="number" className="form-control" placeholder="Enter Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

        <button type="submit" className="btn btn-secondary" onClick={handle}>Deposit</button>
        </>
    );

}

function DepositLogin(props) {
    return (
        <>
        <button type="button" className="btn btn-light" onClick={(e) => {
            e.preventDefault();
            window.location.href = "./#/login/";
        }}> Login </button>
        </>
    );
}

function CurrentBalance(props) {
    const [balance, setBalance] = React.useState('');
    const { email, isLoggedIn } = React.useContext(AuthContext);
  
    React.useEffect(() => {
      let isMounted = true;
  
      function getBalance() {
        fetch(`/account/findOne/${email}`)
          .then((response) => response.text())
          .then((text) => {
            try {
              const data = JSON.parse(text);
              console.log(data.balance);
              //if (isMounted) {
                setBalance(data.balance);
              //}
            } catch (err) {
              console.log("err:", text);
            }
          }, [email, isLoggedIn]);
      }
  
      getBalance();
  
      return () => {
        isMounted = false;
      };
    }, [email]);
  
    return <>{balance}</>;
  }

