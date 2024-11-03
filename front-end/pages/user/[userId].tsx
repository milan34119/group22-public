import Head from "next/head";
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
    return (
      <>
        <div className={styles.form_container}>
            <h2>Login to TravelBlog</h2>
            <form action="/user" method="POST">
                <label>Email:</label>
                <input type="email" id="email" name="email" required />

                <label>Password:</label>
                <input type="password" id="password" name="password" required />

                <button type="submit">Login</button>
            </form>
            <p>Don't have an Bccount? <a href="registration-page.html">Sign up</a></p>
        </div>
      </>
    );
  };
  
  export default Home;