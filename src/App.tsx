// App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";
import { DefaultProviders } from "./components/providers/default.tsx";
import Layout from "./components/Layout.tsx";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Products from "./pages/Products.tsx";
import WhyChooseUs from "./pages/WhyChooseUs.tsx";
import Contact from "./pages/Contact.tsx";
import AdminProducts from "./pages/admin/AdminProducts.tsx";
import AdminCategories from "./pages/admin/AdminCategories.tsx";
import NotFound from "./pages/NotFound.tsx";
import LoginPage from "./pages/admin/AdminLogin.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import ChangePassword from "./pages/admin/ChangePassword.tsx"

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<LoginPage />} />
            
            {/* Protected admin routes */}
            <Route 
              path="/admin/products" 
              element={
                <ProtectedRoute>
                  <AdminProducts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/categories" 
              element={
                <ProtectedRoute>
                  <AdminCategories />
                </ProtectedRoute>
              } 
            />
            <Route 
            path="/admin/change-password" 
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            } 
          />
          
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </DefaultProviders>
  );
}