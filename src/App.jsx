// import InfiniteScroll from "./InfiniteScroll";
import InfiniteScrollIntersectionObserver from "./InfiniteScrollIntersectionObserver";

function App() {
  return (
    <div className="flex flex-col items-center h-full w-full bg-gray-500">
      <h1 className="text-5xl text-teal-300">Infinite Scroll</h1>
      {/* <InfiniteScroll /> */}
      <InfiniteScrollIntersectionObserver />
    </div>
  );
}

export default App;
