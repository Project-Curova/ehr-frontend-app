import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from './app/store.ts'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './lib/definitions.ts'

createRoot(document.getElementById('root')!).render(
    <>
        <Provider store={store}>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <App />
            </GoogleOAuthProvider>
        </Provider>
    </>
)
