let hearts = [];
let isHomePage = false; // 預設為非首頁

function setup() {
  // 檢查是否為首頁
  isHomePage = window.location.hash === "#home" || window.location.hash === "";

  if (isHomePage) {
    createCanvas(windowWidth, windowHeight); // 設置畫布為全視窗
    for (let i = 0; i < 40; i++) {
      hearts.push({
        x: random(width), // 隨機生成 x 座標
        y: random(height), // 隨機生成 y 座標
        size: random(50, 100), // 隨機生成初始大小
        color: color(random(255), random(255), random(255)) // 隨機生成鮮豔顏色
      });
    }
  }
}

function draw() {
  if (isHomePage) {
    background('#edafb8'); // 設置背景顏色為 #edafb8

    let sizeOffset = map(mouseX, 0, width, 10, 120); // 根據滑鼠 x 座標計算大小變化幅度

    for (let heart of hearts) {
      fill(heart.color); // 使用每個星星的顏色
      noStroke(); // 移除星型的邊框
      drawStar(heart.x, heart.y, (heart.size + sizeOffset) / 2, heart.size + sizeOffset, 5); // 繪製星型
    }
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowResized() {
  if (isHomePage) {
    resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  }
}
