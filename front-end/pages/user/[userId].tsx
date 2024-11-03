import PostOverviewTable from "@components/posts/PostOverviewTable";
import { Post, User } from "@types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserService from "service/UserService";

const ReadUserById = () => {
  const [user, setUser] = useState<User|null>(null);
  

  const router = useRouter();
  const { userId } = router.query;

  const getUserById = async () => {
    const userResponse = await UserService.getUserById(userId as unknown as number);
    if (userResponse.status === 400) return;
    setUser(await userResponse.json());
  }

  useEffect(() => {
    if(userId)
      getUserById();
    }, [userId]
  );

  const [posts, setPosts] = useState<Array<Post>>([]);

  const getAllUserActivitiesById = async() => {
    const [userResponse] = await Promise.all([
      UserService.getAllUserActivitiesById(Number(userId))
    ]);
    const [posts] = await Promise.all([
      userResponse.json()
    ]);
    setPosts(posts);
  }

  useEffect(() => {
    if(userId)
      getAllUserActivitiesById();
    }, [userId]
  );

  


  return (
    <>
      <main className="d-flex flex-column justify-content-center align-items-center">
        <section>
          <h1> {user && user.name}'s profile</h1>
        </section>

        {posts && <PostOverviewTable posts={posts}/>}

      </main>
    </>
  )
}

export default ReadUserById;