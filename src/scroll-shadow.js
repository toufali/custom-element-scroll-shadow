class scrollShadow extends HTMLElement {
  constructor(){
    super()

    console.log('hi there')
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        :host{
          display: block;
          position: relative;
        }

        .shadow{
          content: "";
          position: fixed;
          left: 50%;
          width: 100%;
          height: 24px;
          box-shadow: inset 0 0px 12px -12px black;
          transform: translateX(-50%);
          transition: box-shadow .3s ease-out;
          pointer-events: none;
        }

        .shadow{
          box-shadow: inset 0 12px 24px -12px black;
        }

        .sentinel{
          visibility: hidden;
          position: absolute;
          top: 0;
          width: 100px;
          height: 1px;
          background: red;
        }
      </style>
      <div class="shadow"></div>
      <slot></slot>
    `
    this.sentinel = document.createElement('div')
    this.sentinel.className = 'sentinel'

    const shadowRoot = this.attachShadow({mode: 'open'})
    shadowRoot.appendChild(template.content.cloneNode(true));

  }

  intersectHandler(e){
    console.log('intersectionHandler')
    return
    console.log(e.target)
    if(e[0].isIntersecting){
      this.classList.remove('scrolled')
    }else{
      this.classList.add('scrolled')
    }
  }

  connectedCallback() {
    const intersectObs = new IntersectionObserver(this.intersectHandler, {root: this})
    console.log(this)
    intersectObs.observe(this.sentinel)
  }
}

window.customElements.define('scroll-shadow', scrollShadow);

export default scrollShadow
