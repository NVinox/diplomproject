$(function () {

  //Header scrolling menu
  window.addEventListener("scroll", function () {
    let header = document.querySelector('.header'),
      headerBox = document.querySelector('.header-box');
    header.classList.toggle("sticky", window.scrollY > 0);
    headerBox.classList.toggle("sticky", window.scrollY > 0);
  });

  // Modal Window
  function showActive() {
    $('.modal').addClass('active');
  };
  function fadeActive() {
    $('.modal').removeClass('active');
  };

  $('.contact-icon').on('click', showActive);
  $('.modal-overlay').on('click', fadeActive);
  $('.modal-btn__close').on('click', fadeActive);
  $('.thanks-btn').on('click', fadeActive);
  $('.order-calling_adaptive').on('click', showActive);

  // Burger menu
  function showMenu() {
    $('.adaptive-menu__list').addClass('active');
    $('.adaptive-box').addClass('active');
  };
  function removeMenu() {
    $('.adaptive-menu__list').removeClass('active');
    $('.adaptive-box').removeClass('active');
  };

  $('.burger-menu').on('click', showMenu);
  $('.adaptive-btn__item').on('click', removeMenu);
  $('.adaptive-box').on('click', removeMenu);
  $('.order-calling_adaptive').on('click', removeMenu);


  // Offer Slider
  const myOfferSlider = new Swiper('.offer-swiper', {
    direction: 'horizontal',
    spaceBetween: 50,
    slidesPerView: 1,
    loop: true,
    speed: 800,
    stopOnLastSlide: false,
    autoplay: {
      delay: 3000
    },

    pagination: {
      el: '.offer-pagination',
      type: 'bullets',
      clickable: true,
    }
  });


  // Team Slider 
  const myTeamSlider = new Swiper('.team-slider__container', {
    direction: 'horizontal',
    spaceBetween: 50,
    slidesPerView: 1,
    loop: true,
    speed: 800,
    stopOnLastSlide: false,

    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

    pagination: {
      el: '.team-pagination',
      type: 'bullets',
      clickable: true,
    },

    navigation: {
      nextEl: '.team-button__next',
      prevEl: '.team-button__prev',
    }
  });


  // Mask for modal input
  let selector = document.querySelectorAll('input[type="tel"]');
  let phone = new Inputmask('+7 (999) 999-99-99');
  phone.mask(selector);


  // Validate
  $.validator.addMethod('regex', function (value, element, regexp) {
    let regExp = new RegExp(regexp);
    return this.optional(element) || regExp.test(value)
  }, 'please check your input');

  function valEl(el) {
    el.validate({
      rules: {
        firstName: {
          required: true,
          regex: "[A-Za-zА-Яа-я]{1,32}"
        },
        mail: {
          required: true
        },
        phone: {
          required: true
        }
      },
      // Начинаем проверку id="" формы
      submitHandler: function (form) {
        $('#loader').fadeIn();
        var $form = $(form);
        var $formId = $(form).attr('id');
        switch ($formId) {
          case 'modal-form':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize(),
            })
              .always(function () {
                setTimeout(function () {
                  $form.trigger('reset');
                }, 1100)
                $('#modal-form').fadeOut();
                setTimeout(function () {
                  $('#thanks').fadeIn();
                }, 500);
              });
            break;
          case 'information-form':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize()
            })
              .done(function () {
                console.log('Success');
              })
              .fail(function () {
                console.log('Fail');
              })
              .always(function () {
                setTimeout(function () {
                  $form.trigger('reset');
                }, 500)
                setTimeout(function () {
                  $('#information-message__send').fadeIn();
                }, 500);
              });
            break;
        }
        return false;
      },
      messages: {
        firstName: 'Имя введено неверно',
        mail: 'Почта введена неверно',
        phone: 'Укажите телефон'
      }
    });
  };

  // Запускаем механизм валидации форм, если у них есть класс .js-form
  $('.js-form').each(function () {
    valEl($(this));
  });

  // Validate order

  $("#order-form").validate({
    rules: {
      infoname: {
        required: true,
        regex: "[A-Za-zА-Яа-я]{1,32}"
      },
      infomail: {
        required: true
      },
      phone: {
        required: true
      },
      country: {
        required: true,
        regex: "[A-Za-zА-Яа-я]{1,32}"
      },
      town: {
        required: true,
        regex: "[A-Za-zА-Яа-я]{1,32}"
      },
      street: {
        required: true,
        regex: "[A-Za-zА-Яа-я]{1,32}"
      },
      house: {
        required: true,
        regex: "[A-Za-zА-Яа-я1-1000]"
      },
      apartment: {
        required: true,
      }
    },
    messages: {
      infoname: 'Имя указано неверно',
      infomail: 'Почта указана неверно',
      phone: "Телефон указан неверно",
      country: "Страна указана неверно",
      town: "Город указан неверно",
      street: "Улица указана неверно",
      house: "Дом указан неверно",
      apartment: "Квартира указана неверно",
    }
  });

  // Shop navigation product active class
  $('.shop-button__btn').on('click', function (event) {
    event.preventDefault();
    let currTab = $(this).index();

    $('.shop-button__btn').removeClass('active');
    $(this).addClass('active');
  });

  //Input in one size
  $.each($('.one-input__item'), function (index, val) {
    if ($(this).find('input').prop('checked') == true) {
      $(this).addClass('active')
    }
  });

  $(document).on('click', '.one-input__item', function (event) {
    $(this).parents('.one-input').find('.one-input__item').removeClass('active');
    $(this).parents('.one-input').find('.one-input__item input').prop('checked', false);
    $(this).toggleClass('active');
    $(this).find('input').prop('checked', true);
    return false;
  });

  //Input in one color
  $.each($('.one-input__color'), function (index, val) {
    if ($(this).find('input').prop('checked') == true) {
      $(this).addClass('active')
    }
  });

  $(document).on('click', '.one-input__color', function (event) {
    $(this).parents('.one-input').find('.one-input__color').removeClass('active');
    $(this).parents('.one-input').find('.one-input__color input').prop('checked', false);
    $(this).toggleClass('active');
    $(this).find('input').prop('checked', true);
    return false;
  });

  //Input in order cash checkbox
  $.each($('.order-payment__box'), function (index, val) {
    if ($(this).find('input').prop('checked') == true) {
      $(this).addClass('active')
    }
  });

  $(document).on('click', '.order-payment__box', function (event) {
    if ($(this).hasClass('active')) {
      $(this).find('input').prop('checked', false);
    } else {
      $(this).find('input').prop('checked', true);
    }
    $(this).toggleClass('active');

    return false;
  });


  // Filter

  var mixer = mixitup('.shop-product');

});

// Only text from input
function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}