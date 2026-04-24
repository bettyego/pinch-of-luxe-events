import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./component/page/Layout";
import Home from "./component/page/Home";
import AboutUs from "./component/page/AboutUs";
import InquiryForm from "./component/page/InquiryForm";

import Gallery from "./component/page/Gallery";
import CategoryPage from "./components/gallery/CategoryPage";
import ContactUs from "./component/page/ContactUs";

import NotFound from "./component/page/NotFound";
import FeaturesDemo from "./component/page/FeaturesDemo";
import { ToastProvider, useToast } from "./hooks/useToast.jsx";
import ToastContainer from "./components/ui/ToastContainer";
import ErrorBoundary from "./component/ErrorBoundary";
import "./styles/mobile-fixes.css";

// Toast Container Wrapper
const ToastWrapper = () => {
  const { toasts, removeToast, position } = useToast();
  return (
    <ToastContainer
      toasts={toasts}
      position={position}
      onRemoveToast={removeToast}
    />
  );
};
function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="inquiryform" element={<InquiryForm />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gallery/:category" element={<CategoryPage />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="demo" element={<FeaturesDemo />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastWrapper />
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;