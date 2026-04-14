console.log("login.js loaded");
const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // prevent default form submission

  const identifier = document.getElementById("identifier").value;
  const password = document.getElementById("password").value;

 fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    // This part checks the server response before redirecting
    if (data.success) {
  alert(data.message);

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userId", data.user.id);   // ✅ ADD THIS

  window.location.href = "dashboard.html";
} else {
      alert(data.message); // show "Invalid email/mobile or password"
      // do NOT redirect
    }
  })
  .catch(err => {
    console.error("Error:", err);
    alert("Something went wrong");
  });
});