
function CreateAccount(){
    
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    
    return (
        <>
        <Card 
            bgcolor="primary"
            header="Create Account"
            status={status}
            body={show ?
                <CreateForm setShow={setShow}/> :
                <CreateMsg setShow={setShow} />}
        />
        </>
    )
}

function CreateMsg(props){
   // const accountID = Math.random().toString().slice(2,11);
    return(
        <>
        <h5>Success!</h5>
        <button type="submit" className="btn btn-secondary" onClick={() => props.setShow(true)}>Add Another Account</button><br/>
        <br/>
        <br/>
        <button type="submit" 
        className="btn btn-secondary" 
        onClick={(e) => {e.preventDefault();
        window.location.href = "./#/login/";
        }}>Login</button>
        </>
    );
}

function CreateForm(props){
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    //const ctx = React.useContext(UserContext);

    function handle(){
        console.log(name,email,password);

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        alert("Invalid email address");
        return;
        }
        
        const url=`/account/create/${name}/${email}/${password}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
        })();
        //ctx.user = {name: name, email: email};
        props.setShow(false);
    }

    return(
        <>
            Name<br/>
            <input type="input" className="form-control" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>

            Email<br/>
            <input type="input" className="form-control" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>

            Password<br/>
            <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
        
            <button type="submit" className="btn btn-secondary" onClick={handle}>Create Account</button>
        </>
    );
}