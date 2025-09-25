import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer
        closeOnClick
        theme="colored"
        pauseOnFocusLoss
        pauseOnHover
        newestOnTop
      />
    </div>
  );
};

export default App;
