import { Link, useLocation } from "react-router-dom";
import { Menu, User, X, LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hideHeaderFooterOn = ["/admin/login"];
  const location = useLocation();
  const hideHeaderFooter = hideHeaderFooterOn.includes(location.pathname);
  const { isAuthenticated, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
  <div className="min-h-screen bg-gray-">
      {/* Header */}
      {!hideHeaderFooter && (
        <header className="fixed w-full top-0 z-50 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link
                  to="/"
                  className="text-2xl font-bold text-white hover:text-white/80"
                >
                  SAMSONIX
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <nav className="flex space-x-8">
                  {isAdminPage ? (
                    <>
                      <span className="text-sm font-medium text-white">
                        Admin Panel
                      </span>
                      {adminNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`text-sm font-5px transition-colors hover:text-blue-400 ${
                            location.pathname === item.href
                              ? "text-blue-400 border-b-2 border-blue-400"
                              : "text-white"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <>
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`text-sm font-medium transition-colors hover:text-white/80 ${
                            location.pathname === item.href
                              ? "text-white border-b-2 border-white"
                              : "text-white"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </>
                  )}
                </nav>

                {/* Desktop Actions */}
                <div className="flex items-center space-x-4">
                  {isAdminPage ? (
                    // Admin panel actions
                    isAuthenticated && (
                      <div className="flex items-center space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-white border-white hover:bg-gray-800"
                            >
                              <User className="size-4 mr-2" />
                              Admin
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                              <Link to="/admin/change-password">Change Password</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleLogout}
                          className="flex items-center text-white border-white hover:bg-blue-600"
                        >
                          <LogOut className="size-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    )
                  ) : (
                    isAuthenticated ? (
                      <Link to="/admin/products">
                        <Button variant="outline" size="sm" className="text-white border-white hover:bg-blue-600">
                          Admin Panel
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/admin/login" className="flex items-center group">
                        <LogIn className="size-6 text-white group-hover:text-[#F7F764] transition-colors cursor-pointer" />
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white hover:bg-blue-900"
                >
                  {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </Button>
              </div>
            </div>

            {/* Update mobile menu background to match theme */}
            {mobileMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-700">
                  {isAdminPage ? (
                    <>
                      <div className="px-3 py-2 text-sm font-medium text-gray-300">
                        Admin Panel
                      </div>
                      {adminNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`block px-3 py-2 text-sm font-medium transition-colors ${
                            location.pathname === item.href
                              ? "text-white bg-gray-800"
                              : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <Link
                        to="/admin/change-password"
                        className={`block px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-primary`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Change Password
                      </Link>
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
                    {isAdminPage ? (
                      // Admin panel mobile - Show change password and logout
                      isAuthenticated && (
                        <>
                          <Link
                            to="/admin/change-password"
                            className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Change Password
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center"
                          >
                            <LogOut className="size-4 mr-2" />
                            Logout
                          </Button>
                        </>
                      )
                    ) : (
                      // User site mobile
                      isAuthenticated ? (
                        <Link to="/admin/products">
                          <Button variant="outline" size="sm" className="w-full">
                            Admin Panel
                          </Button>
                        </Link>
                      ) : (
                        <Link to="/admin/login" className="flex items-center justify-center w-full group">
                          <LogIn className="size-6 text-white group-hover:text-blue-#F7F764 transition-colors cursor-pointer" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
      )}

      {/* Add padding to main content to account for fixed header */}
      <main className="flex-1 pt-15">{children}</main>

      {/* Footer */}
      {!isAdminPage && (
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Samsonix</h3>
                <p className="text-gray-300 text-sm">
                  Your trusted destination for the latest electronic products and
                  gadgets.
                </p>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <Link
                      to="/products"
                      className="hover:text-white transition-colors"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-white transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Smartphones
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Laptops
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Audio
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Contact Info</h4>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>Kamalpokhari, Kathmandu</p>
                  <p>Phone: 9840860618</p>
                  <p>Email: info@Samsonix.com</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} Samsonix. All rights reserved.
                <br /> Powered By{" "}
                <span className="hover:text-white transition-colors; color:red">
                  Freelancely.
                </span>
                <br />
                <a
                  href="https://www.freelancely.com.np"
                  className="hover:text-white transition-colors"
                  target="_blank"
                >
                  www.freelancely.com.np
                </a>
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}