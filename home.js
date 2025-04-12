
  document.querySelectorAll('.carousel-item').forEach(item => {
    const bgUrl = item.getAttribute('data-bg');
    item.style.setProperty('--bg-url', `url(${bgUrl})`);
    item.style.setProperty('--bg-img', `url(${bgUrl})`);
    const before = document.createElement('style');
    before.textContent = `
      .carousel-item[data-bg="${bgUrl}"]::before {
        background-image: url("${bgUrl}");
      }
    `;
    document.head.appendChild(before);
  });

