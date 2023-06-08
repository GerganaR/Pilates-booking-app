import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Cookies from "js-cookie";
import { UserProvider } from "./Context/UserContext";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // URL of your backend server
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("token"); // Retrieve the bearer token from cookies
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <App />
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>
);
