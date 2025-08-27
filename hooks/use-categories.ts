import { useEffect, useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.map((cat: any) => cat.name));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { categories, loading };
} 