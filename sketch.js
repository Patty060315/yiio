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

    // 刪除第一個測驗卷選項
    const menu = document.getElementById('menu'); // 選取選單
    const quizItems = Array.from(menu.querySelectorAll('a')).filter(item => item.textContent.includes('測驗卷'));
    if (quizItems.length > 1) {
      quizItems[0].parentElement.remove(); // 刪除第一個測驗卷選項的父元素 <li>
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

function showQuiz() {
  // 隱藏其他內容
  const container = document.getElementById('content-container');
  if (container) {
    container.style.display = 'none';
  }

  // 重置背景顏色
  document.body.style.background = '#f9f9f9';

  // 動態新增簡答題表單
  let quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) {
    quizContainer = document.createElement('div');
    quizContainer.id = 'quiz-container';
    quizContainer.style.position = 'absolute';
    quizContainer.style.top = '50%';
    quizContainer.style.left = '50%';
    quizContainer.style.transform = 'translate(-50%, -50%)';
    quizContainer.style.backgroundColor = '#ffffff';
    quizContainer.style.padding = '20px';
    quizContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    quizContainer.style.borderRadius = '10px';
    quizContainer.style.textAlign = 'center';

    // 新增題目
    const question = document.createElement('p');
    question.textContent = '你喜歡甚麼顏色？';
    question.style.fontSize = '18px';
    question.style.marginBottom = '10px';
    quizContainer.appendChild(question);

    // 新增輸入框
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '請輸入你的答案';
    input.style.width = '80%';
    input.style.padding = '10px';
    input.style.marginBottom = '10px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '5px';
    quizContainer.appendChild(input);

    // 新增提交按鈕
    const submitButton = document.createElement('button');
    submitButton.textContent = '提交';
    submitButton.style.padding = '10px 20px';
    submitButton.style.backgroundColor = '#007bff';
    submitButton.style.color = '#ffffff';
    submitButton.style.border = 'none';
    submitButton.style.borderRadius = '5px';
    submitButton.style.cursor = 'pointer';
    submitButton.onclick = () => {
      alert(`你的答案是：${input.value}`);
      input.value = ''; // 清空輸入框
    };
    quizContainer.appendChild(submitButton);

    // 將表單加入到 body
    document.body.appendChild(quizContainer);
  } else {
    quizContainer.style.display = 'block'; // 如果已存在，顯示表單
  }
}
