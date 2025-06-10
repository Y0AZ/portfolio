const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
[...popoverTriggerList].forEach(el => new bootstrap.Popover(el));

const swiper = new Swiper('.swiper', {
    slidesPerView : 3,
    spaceBetween: 25,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });