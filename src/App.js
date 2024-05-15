import React, { useEffect } from "react";
import { PostList } from "./PostList";
import { AddPosts } from "./AddPost";

function App() {
  return (
    <div className="App">
      <h1>IndexedDB Example</h1>
      <AddPosts />
      <PostList />
    </div>
  );
}

export default App;
