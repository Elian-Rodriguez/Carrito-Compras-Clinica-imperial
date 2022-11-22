import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'https://graphql.contentful.com/content/v1/spaces/uoanj85geade/?access_token=P9pk2EIB0bhb61Mt5j0NijnLHqMIoFzuApNaR9Oz5j0',
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  rootElement
);