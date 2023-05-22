function AllData() {
    const [data, setData] = React.useState([]);
    const { isLoggedIn } = React.useContext(AuthContext);
  
    React.useEffect(() => {
      fetch('/account/all')
        .then((response) => response.json())
        .then((data) => {
          setData(JSON.stringify(data));
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    return (
      <>
        <h2>All Data In Store</h2>
        {data}
    </>
    );
}