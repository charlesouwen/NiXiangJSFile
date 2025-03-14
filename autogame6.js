(function() {
    class AutoClicker {
        constructor() {
            this.running = false;
            this.createControlPanel();
        }

        createControlPanel() {
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
            console.log('自动点击已开始');
            this.startAutoClick();
        }

        stop() {
            this.running = false;
            console.log('自动点击已停止');
        }

        startAutoClick() {
            if (!this.running) return;

            // 获取屏幕尺寸
            const width = window.innerWidth;
            const height = window.innerHeight;

            // 只在屏幕上半部分生成点击网格
            const gridSize = 20; // 网格大小
            const halfHeight = height / 2;

            for (let x = 0; x < width; x += gridSize) {
                for (let y = 0; y < halfHeight; y += gridSize) {
                    // 使用setTimeout模拟手指触摸，延迟1ms
                    setTimeout(() => {
                        this.simulateTouch(x, y);
                    }, 1);
                }
            }

            // 如果还在运行，继续下一轮点击
            if (this.running) {
                setTimeout(() => this.startAutoClick(), 50);
            }
        }

        simulateTouch(x, y) {
            try {
                // 创建触摸点
                const touch = new Touch({
                    identifier: Date.now(),
                    target: document.body,
                    clientX: x,
                    clientY: y
                });

                // 创建触摸事件
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

                // 找到点击目标
                const target = document.elementFromPoint(x, y);
                
                if (target) {
                    // 分发触摸事件
                    target.dispatchEvent(touchStartEvent);
                    target.dispatchEvent(touchEndEvent);

                    // 创建点击特效
                    this.createClickEffect(x, y);

                    // 日志输出
                    console.log(`触摸坐标: (${x}, ${y})`);
                }
            } catch (error) {
                console.error('触摸模拟失败:', error);
            }
        }

        createClickEffect(x, y) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: rgba(255,0,0,0.5);
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 9999;
                animation: clickPulse 0.3s forwards;
            `;

            const style = document.createElement('style');
            style.textContent = `
                @keyframes clickPulse {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
                }
            `;

            document.body.appendChild(dot);
            document.head.appendChild(style);

            setTimeout(() => {
                document.body.removeChild(dot);
            }, 300);
        }
    }

    // 页面加载后初始化
    window.addEventListener('load', () => {
        window.autoClicker = new AutoClicker();
    });
})();
