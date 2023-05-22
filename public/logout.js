function Logout() {
    const { setIsLoggedIn, setId, setEmail } = React.useContext(AuthContext);
  
    function handleLogout() {
      setIsLoggedIn(false);
      setId('');
      setEmail('');
      window.alert('You have been successfully logged out.');
    }
  
    return (
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleLogout}
      >
        Logout
      </button>
    );
  }