// reviews slider

const reviews = new Swiper('.reviews-slider', {
  loop: true,
  autoHeight: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet(index, className) {
      return `<span class="${className}"></span>`
    }
  },
  spaceBetween: 20,
  slidesPerView: 1,
  breakpoints: {
    992: {
      slidesPerView: 2
    }
  }
})

// accordion

const accordions = document.querySelectorAll('.accordion')

accordions.forEach(accordion => {
  const items = accordion.querySelectorAll('.accordion-block')

  items.forEach(item => {
    const title = item.querySelector('.accordion-title')

    title.addEventListener('click', () => {
      items.forEach(item2 => {
        if (!item2.isEqualNode(item)) {
          item2.classList.remove('active')
        }
      })

      item.classList.toggle('active')
    })
  })
})

// mobile menu

const hamburger = document.querySelector('[data-hamburger]')
const menu = document.querySelector('[data-hamburger-open]')

if (hamburger && menu) {
  hamburger.addEventListener('click', () => {
    if ( !menu.classList.contains('active') ) {
      hamburger.classList.add('active')
      menu.classList.add('active')
      menu.style.height = 'auto'
    
      let height = menu.clientHeight + 'px'
    
      menu.style.height = '0px'
    
      setTimeout(() => { menu.style.height = height }, 0)
    } else {
      hamburger.classList.remove('active')
      menu.style.height = '0px'
  
      menu.addEventListener('transitionend', () => {
        menu.classList.remove('active')
        menu.style.height = 'auto'
      }, { once: true })
    }
  })
}

// feedback tel mask

const feedbackTel = document.querySelector('#feedback-tel')

if (feedbackTel) {
  const mask = new IMask(feedbackTel, {
    mask: '+7 (000) 000-00-00',
    lazy: false
  })
}

// navbar scroll handle

const navbar = document.querySelector('.navbar')
const navbarDest = document.querySelector('.section-wrapper')

if (navbar && navbarDest) {
  const navbarSize = navbar.offsetHeight

  window.addEventListener('scroll', () => {
    const isScrolled = (navbarDest.getBoundingClientRect().y - navbarSize) < 0

    if (isScrolled) {
      navbar.classList.add('active')
    } else {
      navbar.classList.remove('active')
    }
  })
}

// modals

const attrName = 'data-modal-open-id'

const buttons = document.querySelectorAll(`[${attrName}]`)

buttons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault()

    const modalId = button.getAttribute(attrName)
    const modal = document.getElementById(modalId)
    const modalClose = modal.querySelector('.modal-close')
    const modalOverlay = modal.querySelector('.modal-overlay')

    const removeListeners = item => {
      item.replaceWith(item.cloneNode(true))
    }

    const addModal = () => {
      modal.classList.add('active')
      document.body.classList.add('no-scroll')
    }

    const removeModal = () => {
      modal.classList.remove('active')
      document.body.classList.remove('no-scroll')
    }
    
    addModal()

    modalClose.addEventListener('click', e => {
      e.preventDefault()

      removeModal()
      removeListeners(modalClose)
    })

    modalOverlay.addEventListener('click', e => {
      e.preventDefault()

      removeModal()
      removeListeners(modalClose)
    })
  })
})

// anchor

const anchor = document.querySelector('.anchor')

if (anchor) {
  anchor.addEventListener('click', e => {
    e.preventDefault()

    window.scrollTo(0, 0)
  })
  
  const height = document.documentElement
  const body = document.body
  
  window.addEventListener('scroll', () => {
    const percent = Math.round((height['scrollTop'] || body['scrollTop']) / ((height['scrollHeight'] || body['scrollHeight']) - height.clientHeight) * 100)
  
    if (percent > 30) {
      anchor.classList.add('active')
    } else {
      anchor.classList.remove('active')
    }
  })
}
