<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>選單範例</title>
    <style>
      body {
        margin: 0;
        font-family: Arial, sans-serif;
      }

      /* 選單容器 */
      .menu {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #f8f9fa;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }

      /* 選單項目 */
      .menu li {
        margin: 0;
        padding: 10px 15px;
        position: relative;
      }

      /* 選單連結樣式 */
      .menu li a {
        text-decoration: none;
        color: #333;
        font-weight: bold;
        transition: color 0.3s;
      }

      /* 滑鼠懸停效果 */
      .menu li a:hover {
        color: #007bff;
      }

      /* 子選單樣式 */
      .submenu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #f8f9fa;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }

      .submenu li {
        padding: 10px 15px;
      }

      .submenu li a {
        color: #333;
        font-weight: normal;
      }

      .submenu li a:hover {
        color: #007bff;
      }

      /* 顯示子選單 */
      .menu li:hover .submenu {
        display: block;
      }
    </style>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="libraries/p5.min.js"></script>
    <script src="libraries/p5.sound.min.js"></script>
  </head>

  <body>
    <!-- 選單 -->
    <ul class="menu" id="menu">
      <li><a href="#home" onclick="event.preventDefault(); showBackgroundOnly();">首頁</a></li>
      <li><a href="#" onclick="event.preventDefault(); loadContent('https://patty060315.github.io/ppy/');">自我介紹</a></li>
      <li><a href="#" onclick="event.preventDefault(); loadContent(' https://patty060315.github.io/yu/');">測驗卷</a></li>
      <li>
        <a href="#portfolio" onclick="event.preventDefault(); loadContent('https://patty060315.github.io/ypp/');">作品集</a>
        <!-- 子選單 -->
        <ul class="submenu">
          <li><a href="#" onclick="event.preventDefault(); loadContent('https://patty060315.github.io/ypp/');">1. 週</a></li>
          <li><a href="#" onclick="event.preventDefault(); loadContent('https://patty060315.github.io/yu/');">2. 週</a></li>
          <li><a href="#" onclick="event.preventDefault(); loadContent('#week3');">3. 週</a></li>
          <li><a href="#" onclick="event.preventDefault(); loadContent('#week4');">4. 週</a></li>
        </ul>
      </li>
      <li><a href="#" onclick="event.preventDefault(); loadContent('https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/A2/week1/20250221_092037.mp4');">教學影片</a></li>
      <li><a href="#quiz" onclick="event.preventDefault(); showQuiz();">測驗卷</a></li>
    </ul>

    <!-- 在選單下方加入 iframe 容器 -->
    <div id="content-container" style="margin-top: 20px; width: 100%; height: 500px; display: none;">
      <iframe id="content-frame" src="" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>

    <!-- 測驗卷簡答題表單 -->
    <div id="quiz-container" style="
      display: none; 
      position: absolute; 
      top: 50%; 
      left: 50%; 
      transform: translate(-50%, -50%); 
      padding: 20px; 
      background-color: #f9f9f9; 
      border-radius: 5px; 
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
      text-align: center;">
      <h1>測驗卷</h1>
      <form id="quiz-form">
        <label for="favorite-color">你喜歡的顏色：</label>
        <input type="text" id="favorite-color" name="favorite-color" placeholder="請輸入你喜歡的顏色" style="width: 100%; padding: 10px; margin-top: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 5px;">
        <button type="button" onclick="submitQuizAnswer()" style="padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">提交答案</button>
      </form>
    </div>

    <!-- 恢復選單的按鈕 -->
    <button id="show-menu-button" style="display: none; position: absolute; top: 10px; left: 10px;" onclick="showMenu()">顯示選單</button>

    <script>
      function loadContent(url) {
        // 顯示 iframe 容器
        const container = document.getElementById('content-container');
        const iframe = document.getElementById('content-frame');
        iframe.src = url; // 設定 iframe 的來源
        container.style.display = 'block'; // 顯示 iframe 容器

        // 隱藏簡答題表單
        const quizContainer = document.getElementById('quiz-container');
        if (quizContainer) {
          quizContainer.style.display = 'none';
        }

        // 設定 iframe 容器樣式，讓影片顯示在頁面中央
        container.style.position = 'absolute';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.width = '80%'; // 設定寬度為頁面寬度的 80%
        container.style.height = '60%'; // 設定高度為頁面高度的 60%
        container.style.backgroundColor = '#000'; // 設定背景顏色為黑色

        // 重置背景顏色
        document.body.style.background = '#ffffff'; // 恢復預設背景顏色
      }

      function showBackgroundOnly() {
        const menu = document.getElementById('menu'); // 選取選單
        const container = document.getElementById('content-container'); // 選取 iframe 容器
        const showMenuButton = document.getElementById('show-menu-button'); // 選取顯示選單按鈕
        menu.style.display = 'none'; // 隱藏選單
        container.style.display = 'none'; // 隱藏 iframe 容器
        document.body.style.background = '#edafb8'; // 設定背景顏色
        showMenuButton.style.display = 'block'; // 顯示恢復選單的按鈕
      }

      function showMenu() {
        const menu = document.getElementById('menu'); // 選取選單
        const showMenuButton = document.getElementById('show-menu-button'); // 選取顯示選單按鈕
        menu.style.display = 'flex'; // 顯示選單
        showMenuButton.style.display = 'none'; // 隱藏恢復選單的按鈕
      }

      function showQuiz() {
        // 隱藏 iframe 容器
        const container = document.getElementById('content-container');
        container.style.display = 'none';

        // 顯示簡答題表單
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.style.display = 'block';

        // 設定背景顏色
        document.body.style.background = '#f9f9f9';
      }

      function submitQuizAnswer() {
        const answer = document.getElementById('favorite-color').value;
        if (answer.trim() === "") {
          alert("請輸入你的答案！");
        } else {
          alert(`你的答案是：${answer}`);
        }
      }
    </script>
    <script src="sketch.js"></script>
  </body>
</html>
