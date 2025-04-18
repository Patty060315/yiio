let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // 設置畫布為全視窗
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width), // 隨機生成 x 座標
      y: random(height), // 隨機生成 y 座標
      size: random(50, 100), // 隨機生成初始大小
      color: color(random(255), random(255), random(255)) // 隨機生成鮮豔顏色
    });
  }
}

function draw() {
  background('#edafb8'); // 設置背景顏色為 #edafb8

  let sizeOffset = map(mouseX, 0, width, 10, 120); // 根據滑鼠 x 座標計算大小變化幅度

  for (let circle of circles) {
    fill(circle.color); // 設置圓的顏色
    noStroke(); // 移除圓的邊框
    ellipse(circle.x, circle.y, circle.size + sizeOffset); // 繪製圓，大小隨滑鼠移動變化
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
}
