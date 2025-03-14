(function() {
    // 自动点击器类
    class AutoClicker {
        constructor() {
            this.targetUrl = "https://33222137.h40.faihdusr.com/4/37/ACgIABAEGAAgi-irvgYogt_0AzDMAzjLAw!160x160.png";
            this.running = false;
            this.init();
        }

        // 初始化方法
        init() {
            this.createPanel();
        }

        // 创建控制面板
        createPanel() {
            const panel = document.createElement('div');
            panel.innerHTML = `
                <button id="startBtn" style="background:green;color:white;padding:10px;margin:5px;">开始</button>
                <button id="stopBtn" style="background:red;color:white;padding:10px;margin:5px;">停止</button>
            `;
            panel.style.cssText = `
                position:fixed;
                top:10px;
                left:50%;
                transform:translateX(-50%);
                z-index:9999;
            `;
            document.body.appendChild(panel);

            document.getElementById('startBtn').onclick = () => this.start();
            document.getElementById('stopBtn').onclick = () => this.stop();
        }

        // 开始自动点击
        start() {
            if (this.running) return;
            this.running = true;
            this.autoClick();
        }

        // 停止自动点击
        stop() {
            this.running = false;
        }

        // 自动点击逻辑
        autoClick() {
            if (!this.running) return;

            // 查找目标图片
            const images = document.querySelectorAll(`img[src="${this.targetUrl}"]`);
            
            if (images.length > 0) {
                images.forEach(img => {
                    this.simulateClick(img);
                });
            } else {
                // 如果没找到图片，随机点击
                this.randomClick();
            }

            // 设置下一次点击
            setTimeout(() => this.autoClick(), Math.random() * 100 + 50);
        }

        // 模拟点击
        simulateClick(element) {
            const rect = element.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            const touchStart = new Touch({
                identifier: Date.now(),
                target: element,
                clientX: x,
                clientY: y
            });

            const touchEvent = new TouchEvent('touchstart', {
                bubbles: true,
                cancelable: true,
                touches: [touchStart],
                targetTouches: [touchStart],
                changedTouches: [touchStart]
            });

            element.dispatchEvent(touchEvent);
            console.log(`点击坐标: (${x}, ${y})`);
        }

        // 随机点击
        randomClick() {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight / 2);
            
            const element = document.elementFromPoint(x, y);
            if (element) {
                const touchStart = new Touch({
                    identifier: Date.now(),
                    target: element,
                    clientX: x,
                    clientY: y
                });

                const touchEvent = new TouchEvent('touchstart', {
                    bubbles: true,
                    cancelable: true,
                    touches: [touchStart],
                    targetTouches: [touchStart],
                    changedTouches: [touchStart]
                });

                element.dispatchEvent(touchEvent);
                console.log(`随机点击坐标: (${x}, ${y})`);
            }
        }
    }

    // 页面加载后初始化
    function initAutoClicker() {
        if (document.readyState === 'complete') {
            window.autoClicker = new AutoClicker();
        } else {
            window.addEventListener('load', () => {
                window.autoClicker = new AutoClicker();
            });
        }
    }

    // 立即执行初始化
    initAutoClicker();
})();
