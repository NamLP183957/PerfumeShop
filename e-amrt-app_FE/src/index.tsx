import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './pages/App/App';
import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client"
import { API_BASE_URL } from './utils/constants/uri';
import { Provider } from 'react-redux';
import store from './store';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: API_BASE_URL,
  cache: new InMemoryCache()
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
  ,
  document.getElementById('root')
);

