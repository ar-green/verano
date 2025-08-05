async function loadLives() {
  try {
    const response = await fetch('api/live.json');
    if (!response.ok) throw new Error('خطا در دریافت داده‌ها');
    const lives = await response.json();

    const liveContainer = document.querySelector('.live');
    liveContainer.innerHTML = ''; // پاک کردن قبلی‌ها

    lives.forEach(live => {
      const liveBox = document.createElement('div');
      liveBox.classList.add('live-box');

      liveBox.innerHTML = `
        <div class="text">${live.title}</div>
        <div class="img"><img src="./media/${live.cover}" alt="${live.title}"></div>
      `;

      liveContainer.appendChild(liveBox);
    });

  } catch (error) {
    console.error('خطا در بارگذاری لایوها:', error);
  }
}

loadLives();