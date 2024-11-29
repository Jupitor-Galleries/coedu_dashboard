export const logout = () => {
    // Clear local storage
    localStorage.removeItem('coEdu_jwt');
  
    // If you have any cookies, clear them as well
    document.cookie = 'coEdu_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
    // Redirect to your backend's logout endpoint if necessary
    // window.location.href = 'https://your-backend.com/logout';
  
    // Redirect to Google logout endpoint if necessary
    // window.location.href = 'https://accounts.google.com/Logout';
  
    // Redirect to home or login page
    window.location.href = '/login';
  };