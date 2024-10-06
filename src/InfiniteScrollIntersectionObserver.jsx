import { useCallback, useEffect, useRef, useState } from "react";

const InfiniteScrollIntersectionObserver = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

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
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        const target = entries[0];
        if (target.isIntersecting) {
          fetchData();
        }
      },
      { threshold: 1.0 }
    );
    let targetElement = observerRef.current;
    if (data.length > 0) {
      if (targetElement) {
        observer.observe(targetElement);
      }
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
      observer.disconnect();
    };
  }, [data, fetchData]);

  return (
    <div>
      {data.map((item, index) => {
        const isSecondLastElement = index === data.length - 2;
        return (
          <div
            key={item.id + index}
            ref={isSecondLastElement ? observerRef : null}
          >
            <img
              src={item.download_url}
              height={200}
              width={200}
              alt={item.author}
              className="my-6"
            />
            <span>{item.author}</span>
          </div>
        );
      })}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScrollIntersectionObserver;
