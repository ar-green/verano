async function loadLives() {
  try {
    const response = await fetch("api/live.json");
    if (!response.ok) throw new Error("خطا در دریافت داده‌ها");
    const lives = await response.json();

    const liveContainer = document.querySelector(".live");
    liveContainer.innerHTML = ""; // پاک کردن قبلی‌ها

    lives.forEach((live) => {
      const liveBox = document.createElement("div");
      liveBox.classList.add("live-box");

      liveBox.innerHTML = `
        <div class="text">${live.title}</div>
        <div class="img"><img src="${live.cover}" alt="${live.title}"></div>
      `;

      liveContainer.appendChild(liveBox);
    });
  } catch (error) {
    console.error("خطا در بارگذاری لایوها:", error);
  }
}

loadLives();
 const members = [
  { id: 'v1', birth: new Date('1997-09-01T00:00:00'), day: 1, monthName: 'شهریور', age: 27 },   // Jungkook
  { id: 'v2', birth: new Date('1994-09-12T00:00:00'), day: 12, monthName: 'شهریور', age: 30 },  // RM
  { id: 'v3', birth: new Date('1995-10-13T00:00:00'), day: 13, monthName: 'مهر', age: 29 },     // Jimin
  { id: 'v4', birth: new Date('1992-12-04T00:00:00'), day: 4, monthName: 'آذر', age: 32 },      // Jin
  { id: 'v5', birth: new Date('1995-12-30T00:00:00'), day: 30, monthName: 'دی', age: 29 },      // V
  { id: 'v6', birth: new Date('1994-02-18T00:00:00'), day: 18, monthName: 'بهمن', age: 31 },    // J-Hope
  { id: 'v7', birth: new Date('1993-03-09T00:00:00'), day: 9, monthName: 'اسفند', age: 32 },    // Suga
];

function updateCountdown(member) {
  const now = new Date();

  let birthdayThisYear = new Date(member.birth);
  birthdayThisYear.setFullYear(now.getFullYear());

  if (birthdayThisYear < now) {
    birthdayThisYear.setFullYear(now.getFullYear() + 1);
  }

  let diff = birthdayThisYear - now;

  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  // دیگه age رو محاسبه نمی‌کنیم، مستقیم از آرایه می‌گیریم
  const age = member.age;

  return { minutes, hours, days, age };
}

function updateAllCountdowns() {
  members.forEach(member => {
    const data = updateCountdown(member);
    document.getElementById(member.id + '_2').innerText = data.minutes;
    document.getElementById(member.id + '_3').innerText = data.hours;
    document.getElementById(member.id + '_4').innerText = data.days;
    document.getElementById(member.id + '_5').innerText = data.age;
  });
}

setInterval(updateAllCountdowns, 1000);
updateAllCountdowns();
// گالری تصاویر
document.addEventListener("DOMContentLoaded", () => {
  fetch("gallery.json") // مسیر JSON توی پروژه
    .then(res => res.json())
    .then(data => {
      const gallery = document.getElementById("gallery");

      data.images.forEach(src => {
        let div = document.createElement("div");
        div.className = "gl-b";

        let img = document.createElement("img");
        img.src = src;
        img.alt = "گالری";

        div.appendChild(img);
        gallery.appendChild(div);
      });
    })
    .catch(err => console.error("خطا در خواندن JSON:", err));
});