import { useState } from "react";

export const AddPosts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = (postData) => {
    const request = indexedDB.open("myDatabase", 1);

    request.onerror = function (event) {
      console.error("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["posts"], "readwrite");
      const objectStore = transaction.objectStore("posts");
      objectStore.add({ ...postData, id: Date.now() }); // Assign a unique ID
      transaction.oncomplete = function () {
        console.log("Post added successfully");
      };
      transaction.onerror = function (event) {
        console.error("Transaction error: " + event.target.errorCode);
      };
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      db.createObjectStore("posts", { keyPath: "id", autoIncrement: true });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add post to IndexedDB
    addPost({ title, content });
    // Reset fields
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Add Post</button>
    </form>
  );
};
