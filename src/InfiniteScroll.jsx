import { useState, useEffect, useCallback } from "react";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=5`
      );
      const result = await response.json();
      setData((prev) => [...prev, ...result]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    if (data.length === 0) {
      fetchData();
    }
  }, [data.length, fetchData]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [fetchData]);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <img
            src={item.download_url}
            height={200}
            width={200}
            alt={item.author}
            className="my-6"
          />
          <span>{item.author}</span>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
