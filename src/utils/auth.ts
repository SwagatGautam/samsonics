export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return !!token; // Returns true if token exists
};

export const logout = (): void => {
  localStorage.removeItem('authToken');
  // Optional: redirect to login page
  window.location.href = '/admin/login';
};