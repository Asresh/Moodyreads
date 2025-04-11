import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Poppins and Inter fonts to Tailwind
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap');
  
  :root {
    --font-inter: 'Inter', sans-serif;
    --font-poppins: 'Poppins', sans-serif;
  }
  
  .font-poppins {
    font-family: var(--font-poppins);
  }
  
  .font-inter {
    font-family: var(--font-inter);
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
