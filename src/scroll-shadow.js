class scrollShadow extends HTMLElement {
  constructor(){
    super()

    console.log('hi there')
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        :host{
          display: block;
        }

        .shadow{
          content: "";
          position: fixed;
          width: 100%;
          height: 24px;
          box-shadow: inset 0 0px 12px -12px black;
          transition: box-shadow .3s ease-out;
          pointer-events: none;
        }

        .shadow.scrolled::before{
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
    const sentinel = document.createElement('div')
    sentinel.className = 'sentinel'

    const shadowRoot = this.attachShadow({mode: 'open'})
    shadowRoot.appendChild(sentinel)
    shadowRoot.appendChild(template.content.cloneNode(true));

    //const intersectObs = new IntersectionObserver(this.intersectHandler, {root: shadowRoot})
    //intersectObs.observe(sentinel)
  }

  intersectHandler(e){
    if(e[0].isIntersecting){
      e[0].target.parentNode.classList.remove('scrolled')
    }else{
      e[0].target.parentNode.classList.add('scrolled')
    }
  }
}

window.customElements.define('scroll-shadow', scrollShadow);

export default scrollShadow
