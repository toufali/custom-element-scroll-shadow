class scrollShadow extends HTMLElement {
  constructor(){
    super()

    const shadowRoot = this.attachShadow({mode: 'open'})
    const template = document.createElement('template')

    this.shadow = document.createElement('div')
    this.shadow.className = 'shadow'

    this.sentinel = document.createElement('div')
    this.sentinel.className = 'sentinel'

    template.innerHTML = `
      <style>
        :host{
          display: block;
          position: relative;
        }
        .shadow{
          position: fixed;
          left: 0;
          width: 100%;
          height: 24px;
          box-shadow: inset 0 0 0 #333;
          transition: box-shadow .25s ease-out;
          pointer-events: none;
        }
        .shadow[data-visible="true"]{
          box-shadow: inset 0 12px 12px -12px #333;
          transition-duration: .5s;
        }
        .sentinel{
          visibility: hidden;
          position: absolute;
          top: 0;
          width: 1px;
          height: 1px;
        }
      </style>
      <slot></slot>
    `
    shadowRoot.appendChild(this.shadow)
    shadowRoot.appendChild(this.sentinel)
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const intersectObs = new IntersectionObserver(this.intersectHandler.bind(this), {rootMargin: `${-this.offsetTop}px 0px 0px 0px`})
    intersectObs.observe(this.sentinel)
  }

  intersectHandler(e){
    this.shadow.dataset.visible = !e[0].isIntersecting
  }
}

window.customElements.define('scroll-shadow', scrollShadow);

export default scrollShadow
