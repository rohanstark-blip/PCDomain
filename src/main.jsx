import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import './index.css'
import App from './App.jsx'
import { clerkConfig } from './config/clerk.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={clerkConfig.publishableKey}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#22d3ee',
          colorText: 'white',
          colorBackground: '#1e293b',
          colorInputBackground: '#334155',
          colorInputText: 'white',
          borderRadius: '0.5rem',
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
