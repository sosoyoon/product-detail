import "./scroll-timeline.js";
class Interaction {
  constructor() {
    this.sections = Array.from(document.querySelectorAll(".product_select"));
    this.selectItem = Array.from(
      document.querySelectorAll(".select_item input")
    );
    this.productImg = Array.from(document.querySelector(".product_img"));
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
    const timeline = new ScrollTimeline({
      source: document.documentElement,
    });

    this.productImg.animate([{ rotate: ["0deg", "720deg"] }], {
      timeline,
    });
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
