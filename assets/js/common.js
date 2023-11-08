import "./scroll-timeline.js";
class Interaction {
  constructor() {
    this.sections = Array.from(document.querySelectorAll(".product_select"));
    this.selectItem = Array.from(
      document.querySelectorAll(".select_item input")
    );
    this.container = document.querySelector(".product_detail");
    this.productImg = document.querySelector(".product_img");
    this.img = document.querySelector(".product_img .img");
    this.nav = document.querySelector("nav");

    this.headerHeight = 40;
    this.containerMargin = 375;
  }

  access() {
    this.selectItem.forEach((el) => {
      el.disabled = true;
    });

    this.sections[0].querySelectorAll(".select_item input").forEach((el) => {
      el.disabled = false;
    });
  }

  addActive(index) {
    this.sections[index + 1].classList.add("active");
    this.sections[index + 1]
      .querySelectorAll(".select_item input")
      .forEach((el) => {
        el.disabled = false;
      });
  }

  stepMove(index) {
    window.scrollTo({
      top:
        this.sections[index + 1].offsetTop +
        this.containerMargin +
        this.headerHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  scrollAnimate() {
    const o = {
      offset1: 0,
      offset2: this.container.offsetTop,
      t: "-10px",
    };

    this.img.animate(
      [
        {
          height: `${this.containerMargin}px`,
          offset: 0,
        },
        {
          top: `50px`,
          height: `${this.headerHeight}px`,
          offset: 0.5,
        },
        {
          top: o.t,
          left: `0`,
          height: `${this.headerHeight}px`,
          marginLeft: 0,
          offset: 0.77,
        },
        {
          top: o.t,
          left: `${window.innerWidth / 2 - 40}px`,
          height: `${this.headerHeight}px`,
          offset: 0.9,
        },
        {
          top: o.t,
          left: `${window.innerWidth / 2 - 40}px`,
          height: `${this.headerHeight}px`,
          offset: 1,
        },
      ],
      {
        fill: "both",
        timeline: new ScrollTimeline({
          scrollOffsets: [
            new CSSUnitValue(o.offset1, "px"),
            new CSSUnitValue(o.offset2, "px"),
          ],
        }),
      }
    );

    this.nav.animate(
      [
        {
          opacity: 1,
          offset: 0,
        },
        {
          opacity: 1,
          offset: 0.75,
        },
        {
          opacity: 0,
          offset: 0.76,
        },
        {
          opacity: 0,
          offset: 1,
        },
      ],
      {
        fill: "both",
        timeline: new ScrollTimeline({
          scrollOffsets: [
            new CSSUnitValue(o.offset1, "px"),
            new CSSUnitValue(o.offset2, "px"),
          ],
        }),
      }
    );
  }

  addEvent() {
    this.sections.forEach((el, index) => {
      el.addEventListener("click", (e) => {
        if (!this.sections[index + 1]) return; // 마지막 section

        this.stepMove(index);
        this.addActive(index);
      });
    });
  }

  init() {
    this.access();
    this.addEvent();
    this.scrollAnimate();
  }
}

export { Interaction };
