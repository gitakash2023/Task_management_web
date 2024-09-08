const WelcomeUser = ({ username }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome, <span style={styles.username}>{username}</span></h2>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px', 
    fontFamily: 'Roboto, sans-serif', 
  },
  username: {
    color: 'blue',
  },
};

export default WelcomeUser;
