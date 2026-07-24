import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer,Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductsProvider } from "./context/ProductsContext.jsx";

createRoot(document.getElementById("root")).render(
  <ProductsProvider>
    <AuthProvider>
      <AppRoutes />
      <ToastContainer
        position='bottom-right'
        autoClose={1800}
        hideProgressBar
        closeButton={false}
        transition={Slide}
        theme='dark'
        toastClassName='!bg-neutral-900 !border !border-neutral-800 !text-white !rounded-full !shadow-lg !min-h-0 !w-fit !mx-auto !px-5 !py-2.5 !flex !items-center !gap-2'
        bodyClassName='!p-0 !m-0'
      />
    </AuthProvider>
  </ProductsProvider>,
);
