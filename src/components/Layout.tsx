import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button.tsx";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Why Choose Us", href: "/why-choose-us" },
    { name: "Contact", href: "/contact" },
  ];

  const adminNavigation = [
    { name: "Products", href: "/admin/products" },
    { name: "Categories", href: "/admin/categories" },
  ];

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-primary">
                ElectroStore
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {isAdminPage ? (
                <>
                  <span className="text-sm text-muted-foreground font-medium">Admin Panel</span>
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        location.pathname === item.href
                          ? "text-primary border-b-2 border-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    to="/"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    ← Back to Store
                  </Link>
                </>
              ) : (
                navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === item.href
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))
              )}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {!isAdminPage && (
                <>
                  <Button variant="ghost" size="sm">
                    <ShoppingCart className="size-4" />
                    <span className="ml-2">Cart</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <User className="size-4" />
                    <span className="ml-2">Account</span>
                  </Button>
                </>
              )}
              <Link to="/admin/products">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {isAdminPage ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    Admin Panel
                  </div>
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block px-3 py-2 text-sm font-medium transition-colors ${
                        location.pathname === item.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    to="/"
                    className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ← Back to Store
                  </Link>
                </>
              ) : (
                navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))
              )}
              <div className="border-t pt-3 mt-3">
                <Link to="/admin/products">
                  <Button variant="outline" size="sm" className="w-full">
                    Admin Panel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      {!isAdminPage && (
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">ElectroStore</h3>
                <p className="text-gray-300 text-sm">
                  Your trusted destination for the latest electronic products and gadgets.
                </p>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors">Smartphones</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Laptops</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Audio</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Contact Info</h4>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>123 Tech Street, Digital City</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Email: info@electrostore.com</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} ElectroStore. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}