// نام‌های کاربری و رمز عبور معتبر
const validUsernames = ["liosa", "dorsa", "mahdis", "", "arnoosh"];
const validPassword = "bts";

// تولید کپچا ۵ رقمی رندوم
function generateCaptcha() {
  let captcha = "";
  for (let i = 0; i < 5; i++) {
    captcha += Math.floor(Math.random() * 10);
  }
  return captcha;
}

// چک کردن اگر صفحه home.html هست و دسترسی درست نیست، برگرد index.html
if (window.location.pathname.endsWith("home.html")) {
  // می‌تونی شرط‌های پیشرفته‌تر بزاری، ولی ساده اینجا:
  if (!sessionStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
  }
}

const captchaTextElem = document.getElementById("captchaText");
const captchaInput = document.getElementById("captchaInput");
const refreshCaptchaBtn = document.getElementById("refreshCaptcha");
const loginBtn = document.getElementById("loginBtn");
const infoMessage = document.getElementById("infoMessage");

let currentCaptcha = generateCaptcha();
captchaTextElem.textContent = currentCaptcha;

refreshCaptchaBtn.addEventListener("click", () => {
  currentCaptcha = generateCaptcha();
  captchaTextElem.textContent = currentCaptcha;
  captchaInput.value = "";
  infoMessage.textContent = "نام کاربری و رمز عبور را وارد کنید";
  infoMessage.style.color = "#555";
});

loginBtn.addEventListener("click", () => {
  const username = document
    .getElementById("username")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("password").value.trim();
  const captchaInputValue = captchaInput.value.trim();

  infoMessage.style.color = "red";

  if (!validUsernames.includes(username)) {
    infoMessage.textContent = "نام کاربری یا رمز عبور اشتباه است";
    return;
  }
  if (password !== validPassword) {
    infoMessage.textContent = "نام کاربری یا رمز عبور اشتباه است";
    return;
  }
  if (captchaInputValue !== currentCaptcha) {
    infoMessage.textContent = "کد کپچا اشتباه است";
    return;
  }

  // ثبت وضعیت ورود موفق در sessionStorage
  sessionStorage.setItem("loggedIn", "true");

  infoMessage.style.color = "green";
  infoMessage.textContent = "ورود شما با موفقیت انجام شد";

  setTimeout(() => {
    window.location.href = "verano.html";
  }, 1000);
});
