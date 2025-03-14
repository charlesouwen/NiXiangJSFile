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
        // 精确查找并点击目标图片
        findAndClickTargetImage() {
            // 目标图片的 URL
            const targetImageUrl = "https://33222137.h40.faihdusr.com/4/37/ACgIABAEGAAgi-irvgYogt_0AzDMAzjLAw!160x160.png";
            
            // 查找所有匹配 URL 的图片元素
            const targetImages = Array.from(document.querySelectorAll(`img[src="${targetImageUrl}"]`));
            
            if (targetImages.length > 0) {
                targetImages.forEach(img => {
                    // 获取图片的绝对位置
                    const rect = img.getBoundingClientRect();
                    const x = rect.left + rect.width / 2;
                    const y = rect.top + rect.height / 2;

                    // 模拟点击
                    this.simulateTouch(x, y);
                });
            } else {
                console.log('未找到目标图片');
            }
        }

        // 模拟触摸事件
        simulateTouch(x, y) {
            // 可视化点击位置
            this.visualizeClick(x, y);

            // 控制台输出点击坐标
            console.log(`点击坐标: (${x}, ${y})`);

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

            // 获取点击目标并触发事件
            const target = document.elementFromPoint(x, y);
            if (target) {
                target.dispatchEvent(touchStartEvent);
                target.dispatchEvent(touchEndEvent);
            }
        }

        // 开始自动游戏
        start() {
            if (!this.isRunning) {
                this.isRunning = true;
                this.clickInterval = setInterval(() => {
                    this.findAndClickTargetImage();
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

    });
})();
