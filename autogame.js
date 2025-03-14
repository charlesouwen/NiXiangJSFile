// autofanke.js
(function() {
    // 游戏控制器
    class GameAutoPlayer {
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
            startBtn.onclick = () => this.start();

            const stopBtn = document.createElement('button');
            stopBtn.textContent = '停止';
            stopBtn.onclick = () => this.stop();

            panel.appendChild(startBtn);
            panel.appendChild(stopBtn);
            document.body.appendChild(panel);
        }

        // 自动寻找并点击图片
        findAndClickImage() {
            // 查找所有匹配特定URL的图片
            const targetImages = Array.from(document.querySelectorAll(`img[src*="33222137.h40.faihdusr.com/4/37/ACgIABAEGAAgi-irvgYogt_0AzDMAzjLAw!160x160.png"]`));
            
            if (targetImages.length > 0) {
                // 随机选择一个图片
                const randomImage = targetImages[Math.floor(Math.random() * targetImages.length)];
                
                // 模拟点击
                this.simulateClick(randomImage);
            }
        }

        // 模拟点击事件
        simulateClick(element) {
            if (element) {
                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                element.dispatchEvent(clickEvent);
            }
        }

        // 开始自动游戏
        start() {
            if (!this.isRunning) {
                this.isRunning = true;
                // 每50毫秒执行一次点击
                this.intervalId = setInterval(() => {
                    this.findAndClickImage();
                }, 50);
            }
        }

        // 停止自动游戏
        stop() {
            if (this.isRunning) {
                this.isRunning = false;
                clearInterval(this.intervalId);
            }
        }
    }

    // 页面加载完成后初始化
    window.addEventListener('load', () => {
        window.gameAutoPlayer = new GameAutoPlayer();
    });
})();
