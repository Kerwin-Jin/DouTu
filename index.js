function DouTu() {
  this.bigImg = document.querySelector(".left img");
  this.textWrap = document.querySelector(".left span");

  this.textString = "";
  this.textColor = "";
  this.textSize = 30;

  this.tab = () => {
    this.lis = document.querySelectorAll(".right .imgs li");
    this.last = this.lis[0];
    this.lis.forEach((li) => {
      li.onclick = () => {
        this.last.className = "";
        li.className = "active";
        this.last = li;
        const imgSrc = li.querySelector("img").src;
        this.bigImg.src = imgSrc;
      };
    });
  };

  this.edit = () => {
    const input = document.querySelector(".edit input[type=text]");
    const numberInput = document.querySelector(".edit input[type=number]");
    input.oninput = () => {
      this.textWrap.innerHTML = this.textString = input.value;
    };

    numberInput.onchange = () => {
      this.textWrap.style.fontSize = this.textSize = numberInput.value + "px";
    };

    new Colorpicker({
      el: "color-picker",
      color: "#000",
      change: (ele, color) => {
        ele.style.backgroundColor = color;
        this.textWrap.style.color = this.textColor = color;
      },
    });
  };

  this.init = () => {
    this.tab();
    this.edit();
  };
}
