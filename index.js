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
        this.bigImg.src = imgSrc; // 更新大图

        // 拖拽后图片位置已经发生了改变，点击的新图要把位置删除
        this.bigImg.style.left = this.bigImg.style.top = 0;
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
      this.textSize = numberInput.value;
      this.textWrap.style.fontSize = numberInput.value + "px";
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

  this.draw = (cb) => {
    const canvas = document.createElement("canvas");

    const context = canvas.getContext("2d");

    canvas.height = 300;
    canvas.width = 300;

    // 把canvas的背景设置成白色
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = this.bigImg.src;

    image.onload = () => {
      // 画图片
      const imageX = parseFloat(getComputedStyle(this.bigImg).left);
      const imageY = parseFloat(getComputedStyle(this.bigImg).top);
      const textX = parseFloat(getComputedStyle(this.textWrap).left);
      const textY = parseFloat(getComputedStyle(this.textWrap).top);
      context.drawImage(image, imageX, imageY, 200, 200);

      // 画文本
      context.font = `bold ${this.textSize}px Microsoft YaHei`;
      context.fillStyle = this.textColor;
      context.textBaseline = "top";
      context.fillText(this.textString, textX, textY + 5);

      const base64 = canvas.toDataURL(); // 把canvas导出成一张图片，返回值为该图片的base64
      cb(base64);
    };
  };

  this.download = () => {
    const downloadBtn = document.querySelector(".download");

    downloadBtn.onclick = () => {
      const a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);
      a.download = "doutu";
      a.href = this.draw((base64) => {
        a.href = base64;
        a.click();
        document.body.removeChild(a);
      });
    };
  };

  this.init = () => {
    this.tab();
    this.edit();
    this.drag(this.bigImg);
    this.download();
  };
}
