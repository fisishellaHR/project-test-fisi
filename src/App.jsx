import Header from "./Component/Header";
import Banner from "./Component/Banner";
import ListPost from "./Component/ListPost";

function App() {
  return (
    <div>
      <Header />
      <Banner
        title={"Ideas"}
        subtitle={"Where All Our great things begin"}
        imageUrl={"https://picsum.photos/200/300"}
      />
      <ListPost />
    </div>
  );
}

export default App;
