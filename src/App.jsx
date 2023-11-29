import "./App.scss";
import UserInfo from "./home/userInfo";
import EditUserInfo from "./homeEdit/EditUserInfo";
import { setContext } from "@apollo/client/link/context";
import { REACT_APP_HASURA_SECRET, REACT_APP_URI } from "./constants";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { createContext, useState } from "react";

export const SAVE_EDIT_CONTEXT = createContext(null);

const createApolloClient = () => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "Content-Type": "application/json",
        "x-hasura-admin-secret": REACT_APP_HASURA_SECRET,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(
      new HttpLink({
        uri: REACT_APP_URI,
      })
    ),
    cache: new InMemoryCache(),
  });
};

function App() {
  const client = createApolloClient();
  const [editModeOn, setEditModeOn] = useState(false);
  const [fetchDocumentedData, setFetchDocumentedData] = useState({
    name: "",
    sectors: [],
    user_id: null,
  });

  return (
    <div className={editModeOn ? "app" : "app appInfo"}>
      <ApolloProvider client={client}>
        <SAVE_EDIT_CONTEXT.Provider
          value={{
            setEditModeOn,
            editModeOn,
            fetchDocumentedData,
            setFetchDocumentedData,
          }}
        >
          {editModeOn && <EditUserInfo />}
          {!editModeOn && <UserInfo />}
        </SAVE_EDIT_CONTEXT.Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
