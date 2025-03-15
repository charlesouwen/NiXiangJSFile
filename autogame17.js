(function() {
    class GameController {
        constructor() {
            this.isRunning = false;
            this.clickCount = 0;
            this.createUI();
            this.initLogger();
            this.initDebugLines();
        }

        createUI() {
            const panel = document.createElement('div');
            panel.style.cssText = `
                position: fixed;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9999;
                background: rgba(0, 0, 0, 0.8);
                padding: 10px;
                border-radius: 5px;
            `;

            this.startBtn = document.createElement('button');
            this.startBtn.textContent = '开始自动';
            this.startBtn.style.cssText = `
                padding: 5px 15px;
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 3px;
                cursor: pointer;
            `;

            this.stopBtn = document.createElement('button');
            this.stopBtn.textContent = '停止自动';
            this.stopBtn.style.cssText = this.startBtn.style.cssText.replace('#4CAF50', '#f44336');

            panel.appendChild(this.startBtn);
            panel.appendChild(this.stopBtn);
            document.body.appendChild(panel);

            this.startBtn.onclick = () => this.start();
            this.stopBtn.onclick = () => this.stop();
        }

        initDebugLines() {
            const canvas = document.createElement('canvas');
            canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9998;
            `;
            document.body.appendChild(canvas);
            this.debugCanvas = canvas;
            this.debugCtx = canvas.getContext('2d');
            this.resizeDebugCanvas();
            window.addEventListener('resize', () => this.resizeDebugCanvas());
        }

        resizeDebugCanvas() {
            this.debugCanvas.width = window.innerWidth;
            this.debugCanvas.height = window.innerHeight;
        }

        drawDebugLines(x, y) {
            this.debugCtx.clearRect(0, 0, this.debugCanvas.width, this.debugCanvas.height);
            
            // 绘制十字准星
            this.debugCtx.beginPath();
            this.debugCtx.strokeStyle = 'red';
            this.debugCtx.lineWidth = 2;
            
            // 水平线
            this.debugCtx.moveTo(x - 20, y);
            this.debugCtx.lineTo(x + 20, y);
            
            // 垂直线
            this.debugCtx.moveTo(x, y - 20);
            this.debugCtx.lineTo(x, y + 20);
            
            this.debugCtx.stroke();
            
            // 显示坐标
            this.debugCtx.fillStyle = 'red';
            this.debugCtx.font = '12px Arial';
            this.debugCtx.fillText(`(${Math.round(x)}, ${Math.round(y)})`, x + 25, y + 25);
            
            // 3秒后清除
            setTimeout(() => {
                this.debugCtx.clearRect(0, 0, this.debugCanvas.width, this.debugCanvas.height);
            }, 3000);
        }

        initLogger() {
            this.logDiv = document.createElement('div');
            this.logDiv.style.cssText = `
                position: fixed;
                right: 10px;
                top: 10px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px;
                border-radius: 5px;
                max-height: 200px;
                overflow-y: auto;
                font-size: 12px;
                z-index: 9999;
            `;
            document.body.appendChild(this.logDiv);
        }

        log(message) {
            const logEntry = document.createElement('div');
            logEntry.textContent = `${new Date().toLocaleTimeString()} - ${message}`;
            this.logDiv.insertBefore(logEntry, this.logDiv.firstChild);
            if (this.logDiv.children.length > 20) {
                this.logDiv.removeChild(this.logDiv.lastChild);
            }
        }

        findTarget() {
            if (!window.goods || !window.goods.length) return null;
            
            let bestTarget = null;
            let bestScore = -1;

            for (let gold of window.goods) {
                if (!gold || !gold.x || !gold.y) continue;

                // 计算金币相对于角色的位置
                const relativeX = gold.x - GameArg.role.x;
                const relativeY = gold.y;
                
                // 优化评分系统
                const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
                const score = 1000 / (distance + 1);

                if (score > bestScore) {
                    bestScore = score;
                    bestTarget = gold;
                }
            }

            return bestTarget;
        }

        simulateTouch(target) {
            if (!target || !GameArg.cantouch) return false;

            try {
                const canvas = LF.global.canvasObj;
                
                // 计算实际点击坐标（相对于屏幕）
                const rect = canvas.getBoundingClientRect();
                const touchX = target.x + rect.left;
                const touchY = target.y + GameArg.boxTop;
                
                // 显示调试线
                this.drawDebugLines(touchX, touchY);

                // 创建触摸事件
                const touchEvent = new Event('touchstart', {
                    bubbles: true,
                    cancelable: true
                });

                // 添加必要的触摸信息
                touchEvent.targetTouches = [{
                    identifier: Date.now(),
                    target: canvas,
                    pageX: touchX,
                    pageY: touchY,
                    clientX: touchX,
                    clientY: touchY,
                    screenX: touchX,
                    screenY: touchY
                }];

                // 触发事件
                canvas.dispatchEvent(touchEvent);
                
                this.log(`点击坐标: (${touchX}, ${touchY})`);
                return true;
            } catch (err) {
                this.log(`点击错误: ${err.message}`);
                return false;
            }
        }

        async autoPlay() {
            if (!this.isRunning || _gameOver) return;

            try {
                if (!GameArg.cantouch) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    if (this.isRunning) this.autoPlay();
                    return;
                }

                const target = this.findTarget();
                if (target) {
                    this.simulateTouch(target);
                    this.clickCount++;
                }

                // 动态延迟
                const delay = Math.max(800, 1200 - (this.clickCount * 20));
                await new Promise(resolve => setTimeout(resolve, delay));
                
                if (this.isRunning) this.autoPlay();
            } catch (err) {
                this.log(`执行错误: ${err.message}`);
                if (this.isRunning) {
                    setTimeout(() => this.autoPlay(), 1000);
                }
            }
        }

        start() {
            if (this.isRunning) return;
            this.isRunning = true;
            this.clickCount = 0;
            this.log('自动游戏开始');
            this.autoPlay();
        }

        stop() {
            this.isRunning = false;
            this.log('自动游戏停止');
        }
    }

    // 初始化游戏控制器
    window.gameController = new GameController();
})();
