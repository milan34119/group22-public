import Head from "next/head";
import styles from '@styles/home.module.css';
import UserService from "service/UserService";
import { redirect } from "next/dist/server/api-utils";
import { json } from "stream/consumers";

const Home: React.FC = () => {
    return (
      <>
        <div className={styles.form_container}>
            <h2>sign up to TravelBlog</h2>
            <form
                onSubmit={async (e: React.SyntheticEvent) => {
                    e.preventDefault();
                    const target = e.target as typeof e.target & {
                    name: {value: string};
                    email: { value: string };
                    password: { value: string };
                    };
                    const email = target.email.value; // typechecks!
                    const password = target.password.value; // typechecks!
                    const name = target.name.value; // typechecks!

                    const response = await UserService.getAllUsers();
                    const json = await response.json();
                    const id = json.length
                    await UserService.addUser({id, name, email, password})
                    window.location.replace(`/`);

                }}
            >
                <div>
                    <label>
                    Name:
                    <input type="name" name="name" required />
                    </label>
                </div>
                <div>
                    <label>
                    Email:
                    <input type="email" name="email" required />
                    </label>
                </div>
                <div>
                    <label>
                    Password:
                    <input type="password" name="password" required />
                    </label>
                </div>
                <div>
                    <input type="submit" value="sign up" />
                </div>
                </form>
            <p>already have an account? <a href="../">log in</a></p>
        </div>
      </>
    );
  };
  
  export default Home;