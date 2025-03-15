// 在游戏页面的控制台执行以下代码
(function() {
    // 创建控制面板
    const panel = document.createElement('div');
    panel.style.cssText = `
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        background: rgba(0, 0, 0, 0.7);
        padding: 10px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    `;

    // 按钮容器
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '10px';

    // 创建开始按钮
    const startBtn = document.createElement('button');
    startBtn.textContent = '开始自动';
    startBtn.style.cssText = `
        padding: 5px 15px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    `;

    // 创建结束按钮
    const stopBtn = document.createElement('button');
    stopBtn.textContent = '停止自动';
    stopBtn.style.cssText = `
        padding: 5px 15px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    `;

    // 创建轨迹显示区
    const trackInfo = document.createElement('div');
    trackInfo.style.cssText = `
        color: white;
        font-size: 12px;
        text-align: center;
    `;

    // 添加元素到面板
    btnContainer.appendChild(startBtn);
    btnContainer.appendChild(stopBtn);
    panel.appendChild(btnContainer);
    panel.appendChild(trackInfo);
    document.body.appendChild(panel);

    let autoPlayInterval;
    let clickCount = 0;

    // 自动游戏逻辑
    function autoPlay() {
        if (!window.GameArg || !window.GameArg.role) return;
        
        // 模拟点击事件
        const touchEvent = new TouchEvent('touchstart', {
            bubbles: true,
            cancelable: true,
            touches: [{
                pageX: Math.random() * window.innerWidth,
                pageY: GameArg.role.y + Math.random() * 100
            }]
        });
        
        LF.global.canvasObj.dispatchEvent(touchEvent);
        clickCount++;
        trackInfo.textContent = `已执行: ${clickCount}次 | 得分: ${hg.grade.val}`;
    }

    // 开始按钮事件
    startBtn.onclick = function() {
        if (autoPlayInterval) return;
        clickCount = 0;
        autoPlayInterval = setInterval(autoPlay, 2000);
        startBtn.style.background = '#45a049';
        trackInfo.textContent = '自动游戏已启动...';
    };

    // 停止按钮事件
    stopBtn.onclick = function() {
        if (!autoPlayInterval) return;
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        stopBtn.style.background = '#d32f2f';
        trackInfo.textContent = '自动游戏已停止';
    };

    // 添加游戏结束监听
    const originalGameOver = window.gameOver;
    window.gameOver = function(score) {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            trackInfo.textContent = `游戏结束 | 最终得分: ${score}`;
        }
        return originalGameOver.apply(this, arguments);
    };

    console.log('自动游戏控制面板已加载');
})();
