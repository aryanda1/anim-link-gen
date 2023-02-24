import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(null);//check title.js why it's default was changed to null
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    //   console.log(requestConfig);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      // console.log(response);
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      // console.log(data);
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  //Equivalent to {error:erro,isLoading:isLoading,senndRequest:sendRequest}
  return { error, isLoading, sendRequest };
};

export default useHttp;
