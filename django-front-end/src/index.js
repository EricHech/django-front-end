import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Importing the required dependencies from the installed npm packages.
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Create the HttpLink that will connect the
// ApolloClient instance with the GraphQL API.
// The GraphQL server will be running on http://127.0.0.1:8000/
const httpLink = new HttpLink({ uri: 'http://127.0.0.1:8000/graphql/' });

// Instantiate ApolloClient by passing in the httpLink
// and a new instance of an InMemoryCache.
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Render the root component of the React app.
// The App is wrapped with the higher-order component
// ApolloProvider that gets passed the client as a prop.
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
