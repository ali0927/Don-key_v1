import { api } from "helpers/api";
import { useEffect, useState } from "react";

export const useGet = <T>(url: string, defaultVal: T, dependsOn: any[] = []) => {
  const [state, setState] = useState<T>(defaultVal);

  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await api.get(url);

      setState(res.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependsOn);

  return { data: state, error: error, loading, refetchData: fetchData };
};
