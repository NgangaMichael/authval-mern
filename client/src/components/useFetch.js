import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [blogs, setBlogs] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setBlogs(data);
        setPending(false);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { blogs, pending, error };
};

export default useFetch;