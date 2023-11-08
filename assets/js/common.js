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
    this.header = document.querySelector(".header");
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
      top: this.sections[index + 1].offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }

  scrollAnimate() {
    const o = {
      offset1: 0,
      offset2: this.container.offsetTop,
      h: `${600 - window.scrollY}px`,
    };

    this.img.animate(
      [
        {
          transform: `scale(1)`,
          height: o.h,
          offset: 0,
        },
        {
          transform: `scale(0.1)`,
          height: o.h,
          offset: 0.5,
        },
        {
          transform: `scale(0.1)`,
          left: `0`,
          height: o.h,
          offset: 0.9,
        },
        {
          transform: `scale(0.1)`,
          left: `100%`,
          height: o.h,
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

    this.header.animate(
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
