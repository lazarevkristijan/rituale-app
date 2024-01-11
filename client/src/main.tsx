import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { store } from "./Store.ts"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "react-query"
import { Auth0Provider } from "@auth0/auth0-react"
import i18next from "i18next"
import global_en from "./translations/en/global.json"
import global_mk from "./translations/mk/global.json"
import { I18nextProvider } from "react-i18next"

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: { global: global_en },
    mk: { global: global_mk },
  },
})

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Auth0Provider
            domain="rituale.eu.auth0.com"
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
              redirect_uri: window.location.origin,
            }}
          >
            <I18nextProvider i18n={i18next}>
              <App />
            </I18nextProvider>
          </Auth0Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
