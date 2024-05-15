import { useEffect, useState } from "react";

export const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const request = indexedDB.open("myDatabase", 1);

    request.onerror = function (event) {
      console.error("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["posts"], "readonly");
      const objectStore = transaction.objectStore("posts");
      const getRequest = objectStore.getAll();

      getRequest.onsuccess = function (event) {
        setPosts(getRequest.result);
      };

      transaction.oncomplete = function () {
        console.log("Transaction completed");
      };

      transaction.onerror = function (event) {
        console.error("Transaction error: " + event.target.errorCode);
      };
    };
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
