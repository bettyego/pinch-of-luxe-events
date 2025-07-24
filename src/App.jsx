import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./component/page/Layout";
import Home from "./component/page/Home";
import AboutUs from "./component/page/AboutUs";
import Services from "./component/page/Services";
import InquiryForm from "./component/page/InquiryForm";
import ClientReview from "./component/page/ClientReview";
import Gallery from "./component/page/Gallery";
import ContactUs from "./component/page/ContactUs";
import Admin from "./component/page/Admin";
import NotFound from "./component/page/NotFound";
import FeaturesDemo from "./component/page/FeaturesDemo";
import { ToastProvider, useToast } from "./hooks/useToast.jsx";
import ToastContainer from "./components/ui/ToastContainer";
import ErrorBoundary from "./components/ErrorBoundary";
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
            <Route path="services" element={<Services />} />
            <Route path="inquiryform" element={<InquiryForm />} />
            <Route path="review" element={<ClientReview />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="demo" element={<FeaturesDemo />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastWrapper />
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
