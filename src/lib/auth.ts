export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    window.location.href = "/login"; // redirect to login page
  }
}
