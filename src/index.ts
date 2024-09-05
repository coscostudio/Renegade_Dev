import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

function initializeAccordion() {
  const accordion = (function () {
    const $accordion = $('.js-accordion');
    const $accordion_item = $('.js-accordion-item'); // Target entire item

    const settings: { speed: number; oneOpen: boolean } = {
      speed: 400,
      oneOpen: true,
    };

    return {
      init($settings: Partial<{ speed: number; oneOpen: boolean }>) {
        $accordion_item.on('click', function () {
          const $this = $(this);
          accordion.toggle($this);
        });

        $.extend(settings, $settings);

        if (settings.oneOpen && $('.js-accordion-item.active').length > 1) {
          $('.js-accordion-item.active:not(:first)').removeClass('active');
        }

        $('.js-accordion-item.active').find('> .js-accordion-body').show();
      },
      toggle($this: JQuery<HTMLElement>) {
        const accordionBody = $this.find('.js-accordion-body');
        const accordionItem = $this.closest('.js-accordion-item');

        console.log('Accordion toggle initiated');

        if (
          settings.oneOpen &&
          $this[0] !== $this.closest('.js-accordion').find('> .js-accordion-item.active')[0]
        ) {
          console.log('Closing other accordion items');
          // Close other accordion items
          $this
            .closest('.js-accordion')
            .find('> .js-accordion-item')
            .removeClass('active')
            .find('.js-accordion-body')
            .slideUp();
        }

        // Toggle active class and slide toggle for the body
        $this.toggleClass('active');
        accordionBody.stop().slideToggle(settings.speed);
      },
    };
  })();

  $(document).ready(function () {
    accordion.init({ speed: 400, oneOpen: true });
  });
}

barba.init({
  debug: true,
  sync: true,
  transitions: [
    {
      name: 'slide-transition',
      sync: true,
      leave(data) {
        const direction = data.current.namespace === 'index' ? '-100%' : '100%';

        return gsap.to(data.current.container, {
          x: direction,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      },

      enter(data) {
        const isFromLeft = data.next.namespace === 'index';
        gsap.set(data.next.container, { x: isFromLeft ? '-100%' : '100%' });
        data.next.container.style.visibility = 'visible';
        return gsap.to(data.next.container, {
          x: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      },
    },
  ],

  views: [
    {
      namespace: 'index',
      afterEnter({ next }) {
        restartWebflow();
        loadAutoVideo();
        initializeAccordion();
      },
    },
  ],
});

// --- Barba Hooks --- //

barba.hooks.enter(() => {
  window.scrollTo(0, 0);
  const preloader = document.querySelector('.loader_wrapper');
  if (preloader) {
    preloader.style.display = 'none';
  }
});

barba.hooks.after(async ({ next }) => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  restartWebflow();

  await new Promise((resolve) => setTimeout(resolve, 100));
});

document.addEventListener('DOMContentLoaded', () => {
  loadAutoVideo();
});

function loadAutoVideo() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-autovideo@1/autovideo.js';
  script.defer = true;
  document.body.appendChild(script);
}
