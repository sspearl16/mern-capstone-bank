function Home(){
    return (
        <>
            <Card 
                txtcolor="black"
                header="A Bad Bank"
                title="Welcome to the bank"
                text="You can move around using the navigation bar"
                body={(<img src="./img/bank.png" className="img-fluid" alt="Responsive Image" />)}
            />
        </>
    );
}