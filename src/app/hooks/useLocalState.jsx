import { useCallback, useEffect, useState } from 'react';


export const useLocalState = (defaultValue, key, actionFunction) => {
    const [value, setValue] = useState();

    // const save = useCallback(
    //     // Function for triggering useEffect by changing state (activate fetch):
    //     (fetchDetail, fetchedUrl, fetchedMethod = "GET", fetchedData = null) => {
    //       console.log('[ Fetch Detail: ', fetchDetail, ' ] url: ', fetchedUrl, ' method: ', fetchedMethod, 'data: ',  fetchedData);
    
    //       setUrl(fetchedUrl);
    //       setMethod(fetchedMethod);
    //       setFetchedData(fetchedData);
    //     },
    //     [],
    //   )
    


//   const stickyValue = window.localStorage.getItem(key);

//   return stickyValue !== null
//     ? JSON.parse(stickyValue)
//     : defaultValue;


  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
