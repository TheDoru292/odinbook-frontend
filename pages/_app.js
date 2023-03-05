import { Provider } from "react-redux";
import store from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<p>Loading...</p>}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
