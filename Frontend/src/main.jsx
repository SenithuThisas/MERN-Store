import { StrictMode } from 'react'
import { Provider } from "@/components/ui/provider"
import { createRoot } from 'react-dom/client'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
    <App />
    </Provider>
  </StrictMode>,
)
