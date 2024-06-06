import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/comments';

const ApiOperations: React.FC = () => {
  const [response, setResponse] = useState<string>('');

  const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
      setResponse(error.response?.data || error.message);
    } else {
      setResponse('An unexpected error occurred');
    }
  };

  const getItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      handleError(error);
    }
  };

  const postItem = async () => {
    try {
      const res = await axios.post(API_URL, { name: 'NewItem', body: 'This is a new comment', postId: 1 });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      handleError(error);
    }
  };

  const putItem = async () => {
    try {
      const res = await axios.put(`${API_URL}/1`, { name: 'UpdatedItem', body: 'This is an updated comment', postId: 1 });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      handleError(error);
    }
  };

  const deleteItem = async () => {
    try {
      await axios.delete(`${API_URL}/1`);
      setResponse('Item deleted successfully');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="api-operations">
      <h1>API Operations</h1>
      <div className="buttons">
        <button onClick={getItems}>GET</button>
        <button onClick={postItem}>POST</button>
        <button onClick={putItem}>PUT</button>
        <button onClick={deleteItem}>DELETE</button>
      </div>
      <pre id="response" className="response">
        {response}
      </pre>
    </div>
  );
};

export default ApiOperations;
