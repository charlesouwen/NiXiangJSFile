(function() {
    class AutoClicker {
        constructor() {
            this.targetUrls = [
                "https://33222137.h40.faihdusr.com/4/37/ACgIABAEGAAgi-irvgYogt_0AzDMAzjLAw!160x160.png",
                // 可以添加更多可能的图片URL
            ];
            this.running = false;
            this.init();
        }

        init() {
            try {
                this.createPanel();
                this.logMessage('初始化完成');
            } catch (error) {
                this.logMessage('初始化失败', error);
            }
        }

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
                background:rgba(0,0,0,0.5);
                padding:10px;
                border-radius:20px;
            `;
            document.body.appendChild(panel);

            document.getElementById('startBtn').onclick = () => this.start();
            document.getElementById('stopBtn').onclick = () => this.stop();
        }

        start() {
            if (this.running) return;
            this.running = true;
            this.logMessage('开始自动点击');
            this.autoClick();
        }

        stop() {
            this.running = false;
            this.logMessage('停止自动点击');
        }

        autoClick() {
            if (!this.running) return;

            try {
                // 尝试查找所有可能的图片
                const images = this.findTargetImages();
                
                if (images.length > 0) {
                    images.forEach(img => {
                        this.simulateClick(img);
                    });
                } else {
                    // 如果没找到图片，随机点击
                    this.randomClick();
                }
            } catch (error) {
                this.logMessage('点击过程出错', error);
            }

            // 设置下一次点击
            setTimeout(() => this.autoClick(), Math.random() * 100 + 50);
        }

        findTargetImages() {
            // 使用多种方式查找图片
            const images = [];
            
            this.targetUrls.forEach(url => {
                // 精确匹配 src
                const exactMatches = document.querySelectorAll(`img[src="${url}"]`);
                
                // 部分匹配 URL
                const partialMatches = document.querySelectorAll(`img[src*="${url.split('/').pop()}"]`);
                
                images.push(...exactMatches, ...partialMatches);
            });

            // 去重
            return [...new Set(images)];
        }

        simulateClick(element) {
            try {
                const rect = element.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;

                // 创建点击特效
                this.createClickEffect(x, y);

                // 模拟触摸事件
                const touch = new Touch({
                    identifier: Date.now(),
                    target: element,
                    clientX: x,
                    clientY: y
                });

                const touchEvent = new TouchEvent('touchstart', {
                    bubbles: true,
                    cancelable: true,
                    touches: [touch],
                    targetTouches: [touch],
                    changedTouches: [touch]
                });

                element.dispatchEvent(touchEvent);
                this.logMessage(`点击图片: (${x}, ${y})`);
            } catch (error) {
                this.logMessage('点击图片失败', error);
            }
        }

        randomClick() {
            try {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * (window.innerHeight / 2);
                
                // 创建点击特效
                this.createClickEffect(x, y);

                const element = document.elementFromPoint(x, y);
                if (element) {
                    const touch = new Touch({
                        identifier: Date.now(),
                        target: element,
                        clientX: x,
                        clientY: y
                    });

                    const touchEvent = new TouchEvent('touchstart', {
                        bubbles: true,
                        cancelable: true,
                        touches: [touch],
                        targetTouches: [touch],
                        changedTouches: [touch]
                    });

                    element.dispatchEvent(touchEvent);
                    this.logMessage(`随机点击: (${x}, ${y})`);
                }
            } catch (error) {
                this.logMessage('随机点击失败', error);
            }
        }

        createClickEffect(x, y) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(255,0,0,0.5);
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 9999;
                animation: clickPulse 0.5s forwards;
            `;

            const style = document.createElement('style');
            style.textContent = `
                @keyframes clickPulse {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
                }
            `;

            document.body.appendChild(dot);
            document.head.appendChild(style);

            setTimeout(() => {
                document.body.removeChild(dot);
            }, 500);
        }

        logMessage(message, error = null) {
            const prefix = '[AutoClicker]';
            console.log(`${prefix} ${message}`);
            if (error) {
                console.error(`${prefix} 错误详情:`, error);
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
