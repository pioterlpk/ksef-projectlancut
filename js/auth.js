function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    // Przykładowe konto admin
    if(user === "admin" && pass === "1234") {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error-msg").innerText = "Nieprawidłowe dane!";
    }
}