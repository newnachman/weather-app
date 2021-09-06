import { useCallback, useEffect, useState } from 'react';
import axios from "axios";


export const useFetch = () => {

  // States for controlling fetch details:
	const [url, setUrl] = useState(null);
	const [method, setMethod] = useState(null);
	const [fetchedData, setFetchedData] = useState(null);

  // Response data:
  const [response, setResponse] = useState({data: null, loading: false, error: null});

  const fetchData = useCallback(
    (fetchDetail, fetchedUrl, fetchedMethod = "GET", fetchedData = null) => {
      // Function for triggering useEffect by changing state (activate fetch):
      console.log('[ Fetch Detail: ', fetchDetail, ' ] url: ', fetchedUrl, ' method: ', fetchedMethod, 'data: ',  fetchedData);
      setUrl(fetchedUrl);
      setMethod(fetchedMethod);
      setFetchedData(fetchedData);
    },
    [],
  )

  useEffect(() => {

    if (!url) { return; }
    setResponse(state => ({data: state.data, loading: true, error: null}));

    axios.request({
        method: method,
        url: url,
        data: fetchedData
      }).then((result) => {
         setResponse({data: result.data, loading: false, error: null});
         console.log('result.data of useFetch request: ', result.data);
      }).catch(error => {
        setResponse({data: null, loading: false, error: error});
        console.log('response error of useFetch request: ', error);
    });
  }, [url, method, fetchedData])
  
	return { response, fetchData }
}
