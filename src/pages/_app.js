import "@/styles/globals.css";
import {
  HomeLayout,
  LandingPageLayout,
  RootLayout,
  ActiveDonationLayout,
} from "@/page-components/layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextAuthProvider } from "@/lib/Providers";
import { ImageProvider } from "@/lib/ImageContext";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App({ Component, pageProps }) {
  const PageLayout = Component.Layout || LandingPageLayout;

  return (
    <RootLayout>
      <NextAuthProvider>
        <ImageProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PageLayout {...pageProps}>
                <Component {...pageProps} />
                <ToastContainer />
              </PageLayout>
            </PersistGate>
          </Provider>
        </ImageProvider>
      </NextAuthProvider>
    </RootLayout>
  );
}

export default App;
