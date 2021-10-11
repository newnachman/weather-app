import { useCallback, useEffect, useState } from 'react';
import axios from "axios";


export const useFetch = () => {

  // States for controlling fetch details:
	const [url, setUrl] = useState(null);
	const [method, setMethod] = useState(null);
	const [data, setData] = useState(null);
	const [localDetail, setLocalDetail] = useState(null);

  // Response data:
  const [response, setResponse] = useState({data: null, loading: false, error: null});

  // Function for triggering useEffect by changing state (activating the fetch):
  const fetchData = useCallback(
    (fetchDetail, fetchedUrl, fetchedMethod = "GET", fetchedData = null) => {
      setLocalDetail?.(fetchDetail);
      setUrl(fetchedUrl);
      setMethod(fetchedMethod);
      setData(fetchedData);
    },
    [],
  )

  useEffect(() => {

    if (!url) { return; }
    setResponse(state => ({data: state.data, loading: true, error: null}));
    console.log('[ Fetch Detail: ', localDetail, ' ] url: ', url, ' method: ', method, 'data: ',  data);

    axios.request({
        method: method,
        url: url,
        data: data
      }).then((result) => {
         setResponse({data: result.data, loading: false, error: null});
      }).catch(error => {
        setResponse({data: localDetail, loading: false, error: error});
        console.log('response error of useFetch request: ', error);
    });
  }, [url, method, data, localDetail])
  
	return { response, fetchData }
}
