import Head from 'next/head';
import styles from '@styles/home.module.css';
import UserService from 'service/UserService';

const Home: React.FC = () => {
    return (
        <>
            <div className={styles.form_container}>
                <h2>Login to TravelBlog</h2>
                <form
                    onSubmit={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        const target = e.target as typeof e.target & {
                            email: { value: string };
                            password: { value: string };
                        };
                        const email = target.email.value; // typechecks!
                        const password = target.password.value; // typechecks!

                        UserService.login({ email, password });
                    }}
                >
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
                        <input type="submit" value="Log in" />
                    </div>
                </form>
                <p>
                    Don't have an account? <a href="registration-page.html">Sign up</a>
                </p>
            </div>
        </>
    );
};

export default Home;
