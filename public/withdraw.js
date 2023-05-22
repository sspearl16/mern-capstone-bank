
function Withdraw(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [title, setTitle] = React.useState('Please login first');
    const { isLoggedIn, balance } = React.useContext(AuthContext);

    React.useEffect(() => {
        if (isLoggedIn == true) setTitle("");
    }, []);
    
    return (
        <Card
          bgcolor="light"
          txtcolor="black"
          header={
            <>
              <>Withdraw</>
              <br />
              {isLoggedIn && <>Current Balance: {CurrentBalance()}</>}
            </>
          }
          title={title}
          body={
            isLoggedIn ? (
              show ? (
                <WithdrawForm
                  setTitle={setTitle}
                  setShow={setShow}
                  setStatus={setStatus}
                />
              ) : (
                <WithdrawMsg
                  setTitle={setTitle}
                  setShow={setShow}
                  setStatus={setStatus}
                />
              )
            ) : (
              <WithdrawLogin
                setTitle={setTitle}
                setShow={setShow}
                setStatus={setStatus}
              />
            )
          }
        />
      );
    }

function WithdrawMsg(props){
    return(<>
        <h5>Withdraw Successful</h5>
        <button type="submit" className="btn btn-secondary" 
        onClick={() => {
            props.setShow(true);
            props.setTitle('');
            }}>Make another Withdraw</button>
    </>);
}

function WithdrawForm(props){
    //const [name, setName] = React.useState('');
    //const [email, setEmail] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const { email, balance, setBalance } = React.useContext(AuthContext);

    function handle(){
        console.log(email,amount);
        if (amount <= 0) {
            alert("Please enter a positive number");
            return;
        }
        const url=`/account/withdraw/${email}/${amount}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //console.log('data', data);
                //ctx.users.balance -= amount;
                props.setStatus(JSON.stringify(data.value));
                props.setShow(false);
                setBalance(data.balance);
                console.log("data", data);
                //props.setBalance(ctx.users.balance);
                //window.alert(`You have made a withdrawl of $${amount}!`);
            }) .catch(error => console.error(error));
    }

    return(<>
       
        Email<br/>
        <input type="input" className="form-control" placeholder="Enter Email" value={email} readOnly /><br/>

        Amount<br/>
        <input type="number" className="form-control" placeholder="Enter Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

        <button type="submit" className="btn btn-secondary" onClick={handle}>Withdraw</button>
    </>);
}
function WithdrawLogin(props){
    return(
        <>
            <button type="button" className="btn btn-secondary" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = './#/login/';
            }} >Login</button>
        </>
    );
}