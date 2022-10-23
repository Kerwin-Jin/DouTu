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

    this.drag(this.textWrap);
  };

  this.drag = (obj) => {
    let startX = 0,
      startY = 0,
      startL = 0,
      startT = 0,
      curX = 0,
      curY = 0;

    obj.onmousedown = (evt) => {
      startX = evt.clientX;
      startY = evt.clientY;
      startL = obj.offsetLeft;
      startT = obj.offsetTop;

      let maxWidth = obj.parentNode.clientWidth - obj.offsetWidth;
      let minWidth = obj.parentNode.clientHeight - obj.offsetHeight;

      document.onmousemove = (evt) => {
        curX = evt.clientX - startX + startL;
        curY = evt.clientY - startY + startT;

        // 左右到头
        if (curX < 0) {
          curX = 0;
        }
        if (curX > maxWidth) {
          curX = maxWidth;
        }

        // 上下到头
        if (curY < 0) {
          curY = 0;
        }
        if (curY > minWidth) {
          curY = minWidth;
        }

        obj.style.left = curX + "px";
        obj.style.top = curY + "px";

        evt.preventDefault(); // 防止图片出现默认行为
      };

      document.onmouseup = () => (document.onmousemove = null);
    };
  };

  this.init = () => {
    this.tab();
    this.edit();
    this.drag(this.bigImg);
  };
}
