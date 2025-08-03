import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { toast } from "sonner";
export const useConvexQuery = (query, ...args) => {
  const result = useQuery(query, ...args);
  // state for loading, error and data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (result === undefined) {
      setLoading(true);
    } else {
      try {
        setData(result);
        setError(null);
      } catch (error) {
        setError(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [result]);
  return { loading, error, data };
};


export const useConvexMutation = (mutation) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const mutationFn = useMutation(mutation);
    const mutate = async (args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await mutationFn(...args);
            setData(result);
            setError(null);
            return result;
        } catch (error) {
            setError(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { loading, error, data, mutate };
}