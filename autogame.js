(function() {
    class AutoGamePlayer {
        constructor() {
            this.isRunning = false;
            this.intervalId = null;
            this.createControlPanel();
        }

        // 创建控制面板
        createControlPanel() {
            const panel = document.createElement('div');
            panel.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9999;
                display: flex;
                gap: 10px;
            `;

            const startBtn = document.createElement('button');
            startBtn.textContent = '开始';
            startBtn.style.cssText = `
                background-color: green;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
            `;
            startBtn.onclick = () => this.start();

            const stopBtn = document.createElement('button');
            stopBtn.textContent = '停止';
            stopBtn.style.cssText = `
                background-color: red;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
            `;
            stopBtn.onclick = () => this.stop();

            panel.appendChild(startBtn);
            panel.appendChild(stopBtn);
            document.body.appendChild(panel);
        }

        // 模拟点击屏幕上四分之一区域
        simulateQuickClicks() {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // 限制在屏幕上四分之一的上半部分
            const startX = 0;
            const endX = screenWidth / 2;
            const startY = 0;
            const endY = screenHeight / 4;

            // 生成网格点击
            const gridSize = 10; // 每10像素生成一个点击位置
            for (let x = startX; x < endX; x += gridSize) {
                for (let y = startY; y < endY; y += gridSize) {
                    // 异步快速点击，延迟10-20ms
                    setTimeout(() => {
                        this.triggerTouch(x, y);
                    }, Math.floor(Math.random() * 10) + 10);
                }
            }
        }

        // 触发触摸事件
        triggerTouch(x, y) {
            const touchStartEvent = new TouchEvent('touchstart', {
                bubbles: true,
                cancelable: true,
                touches: [
                    new Touch({
                        identifier: Date.now(),
                        target: document.body,
                        clientX: x,
                        clientY: y,
                        screenX: x,
                        screenY: y
                    })
                ],
                targetTouches: [],
                changedTouches: []
            });

            const touchEndEvent = new TouchEvent('touchend', {
                bubbles: true,
                cancelable: true,
                touches: [],
                targetTouches: [],
                changedTouches: [
                    new Touch({
                        identifier: Date.now(),
                        target: document.body,
                        clientX: x,
                        clientY: y,
                        screenX: x,
                        screenY: y
                    })
                ]
            });

            // 分发事件
            const targetElement = document.elementFromPoint(x, y);
            if (targetElement) {
                targetElement.dispatchEvent(touchStartEvent);
                targetElement.dispatchEvent(touchEndEvent);
            }
        }

        // 开始自动游戏
        start() {
            if (!this.isRunning) {
                this.isRunning = true;
                // 每50ms执行一次全区域快速点击
                this.intervalId = setInterval(() => {
                    this.simulateQuickClicks();
                }, 50);
                
                console.log('自动游戏已开始');
            }
        }

        // 停止自动游戏
        stop() {
            if (this.isRunning) {
                this.isRunning = false;
                clearInterval(this.intervalId);
                console.log('自动游戏已停止');
            }
        }
    }

    // 页面加载完成后初始化
    window.addEventListener('load', () => {
        setTimeout(() => {
            window.autoGamePlayer = new AutoGamePlayer();
            console.log('自动游戏控制器已初始化');
        }, 1000);
    });
})();
