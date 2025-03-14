(function() {
    class MobileAutoClicker {
        constructor() {
            this.isRunning = false;
            this.clickInterval = null;
            this.createControlPanel();
            this.createClickVisualizer();
        }

        // 创建控制面板
        createControlPanel() {
            const panel = document.createElement('div');
            panel.style.cssText = `
                position: fixed;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9999;
                display: flex;
                gap: 10px;
                background: rgba(0,0,0,0.7);
                padding: 10px;
                border-radius: 20px;
            `;

            const startBtn = this.createButton('开始', 'green');
            const stopBtn = this.createButton('停止', 'red');

            startBtn.onclick = () => this.start();
            stopBtn.onclick = () => this.stop();

            panel.appendChild(startBtn);
            panel.appendChild(stopBtn);
            document.body.appendChild(panel);
        }

        // 创建按钮
        createButton(text, color) {
            const btn = document.createElement('button');
            btn.textContent = text;
            btn.style.cssText = `
                background-color: ${color};
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 14px;
            `;
            return btn;
        }

        // 创建点击位置可视化层
        createClickVisualizer() {
            this.visualizerContainer = document.createElement('div');
            this.visualizerContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9998;
            `;
            document.body.appendChild(this.visualizerContainer);
        }

        // 可视化点击位置
        visualizeClick(x, y) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.5);
                transform: translate(-50%, -50%);
                animation: clickPulse 0.5s forwards;
            `;

            const style = document.createElement('style');
            style.textContent = `
                @keyframes clickPulse {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
                }
            `;
            document.head.appendChild(style);

            this.visualizerContainer.appendChild(dot);

            // 2秒后移除点
            setTimeout(() => {
                this.visualizerContainer.removeChild(dot);
            }, 2000);
        }

        // 模拟移动设备触摸事件
        simulateTouch(x, y) {
            // 创建触摸事件
            const touch = new Touch({
                identifier: Date.now(),
                target: document.body,
                clientX: x,
                clientY: y,
                screenX: x,
                screenY: y
            });

            const touchStartEvent = new TouchEvent('touchstart', {
                bubbles: true,
                cancelable: true,
                touches: [touch],
                targetTouches: [touch],
                changedTouches: [touch]
            });

            const touchEndEvent = new TouchEvent('touchend', {
                bubbles: true,
                cancelable: true,
                touches: [],
                targetTouches: [],
                changedTouches: [touch]
            });

            // 可视化点击位置
            this.visualizeClick(x, y);

            // 控制台输出点击坐标
            console.log(`点击坐标: (${x}, ${y})`);

            // 获取点击目标并触发事件
            const target = document.elementFromPoint(x, y);
            if (target) {
                target.dispatchEvent(touchStartEvent);
                target.dispatchEvent(touchEndEvent);
            }
        }

        // 快速点击屏幕上半部分
        performQuickClicks() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // 限制在屏幕上半部分
            const clickAreas = [
                { x: width * 0.1, y: height * 0.1 },
                { x: width * 0.3, y: height * 0.2 },
                { x: width * 0.5, y: height * 0.15 },
                { x: width * 0.7, y: height * 0.25 },
                { x: width * 0.9, y: height * 0.1 }
            ];

            // 随机选择点击区域
            clickAreas.forEach(area => {
                // 使用setTimeout模拟随机延迟
                setTimeout(() => {
                    this.simulateTouch(area.x, area.y);
                }, Math.floor(Math.random() * 20) + 10);
            });
        }

        // 开始自动游戏
        start() {
            if (!this.isRunning) {
                this.isRunning = true;
                this.clickInterval = setInterval(() => {
                    this.performQuickClicks();
                }, Math.floor(Math.random() * 50) + 50);
                console.log('自动点击已开始');
            }
        }

        // 停止自动游戏
        stop() {
            if (this.isRunning) {
                this.isRunning = false;
                clearInterval(this.clickInterval);
                console.log('自动点击已停止');
            }
        }
    }

    // 页面加载完成后初始化
    window.addEventListener('load', () => {
        setTimeout(() => {
            window.mobileAutoClicker = new MobileAutoClicker();
            console.log('移动设备自动点击器已初始化');
        }, 1000);
    });
})();
