import { useState, useEffect } from 'react';
import axiosService from '../services/axios.service';

const useFetch = url => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosService.send({ url });
      setData(response.data);
      setIsLoading(false);
      setError(false);
    } catch (err) {
      setData(null);
      setError(err.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return { data, isLoading, error };
}

export default useFetch;