(function() {
    class GameController {
        constructor() {
            this.isRunning = false;
            this.clickCount = 0;
            this.createUI();
            this.initLogger();
            this.createDebugCanvas();
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
                display: flex;
                flex-direction: column;
                gap: 10px;
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

            this.infoDisplay = document.createElement('div');
            this.infoDisplay.style.cssText = `
                color: white;
                font-size: 12px;
                text-align: center;
            `;

            panel.appendChild(this.startBtn);
            panel.appendChild(this.stopBtn);
            panel.appendChild(this.infoDisplay);
            document.body.appendChild(panel);

            this.startBtn.onclick = () => this.start();
            this.stopBtn.onclick = () => this.stop();
        }

        createDebugCanvas() {
            this.debugCanvas = document.createElement('canvas');
            this.debugCanvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9998;
            `;
            document.body.appendChild(this.debugCanvas);
            this.debugCtx = this.debugCanvas.getContext('2d');
            this.resizeDebugCanvas();
            window.addEventListener('resize', () => this.resizeDebugCanvas());
        }

        resizeDebugCanvas() {
            this.debugCanvas.width = window.innerWidth;
            this.debugCanvas.height = window.innerHeight;
        }

        drawDebugInfo(x, y) {
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
            
            // 绘制坐标文本
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
                width: 200px;
            `;
            document.body.appendChild(this.logDiv);
        }

        log(message, type = 'info') {
            const logEntry = document.createElement('div');
            logEntry.style.color = type === 'error' ? '#ff4444' : 
                                 type === 'success' ? '#4CAF50' : '#ffffff';
            logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
            this.logDiv.insertBefore(logEntry, this.logDiv.firstChild);
            
            if (this.logDiv.children.length > 50) {
                this.logDiv.removeChild(this.logDiv.lastChild);
            }
        }

        findTarget() {
            if (!window.goods || !window.goods.length) return null;
            
            let bestTarget = null;
            let bestScore = -1;

            for (let gold of window.goods) {
                if (!gold || typeof gold.x === 'undefined' || typeof gold.y === 'undefined') continue;

                // 计算金币相对于角色的位置
                const relativeX = gold.x - GameArg.role.x;
                const relativeY = gold.y + GameArg.mLayer.y;
                
                // 优化评分系统
                const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
                const angleScore = Math.abs(relativeY) / (Math.abs(relativeX) + 1); // 倾向于选择正上方的金币
                const score = (1000 / (distance + 1)) * (1 + angleScore);

                if (score > bestScore) {
                    bestScore = score;
                    bestTarget = {
                        x: gold.x,
                        y: gold.y,
                        relativeX: relativeX,
                        relativeY: relativeY,
                        score: score
                    };
                }
            }

            return bestTarget;
        }

        simulateTouch(target) {
            if (!target || !GameArg.cantouch) return false;

            try {
                const canvas = LF.global.canvasObj;
                const rect = canvas.getBoundingClientRect();
                
                // 计算实际点击坐标
                const clickX = target.x;
                const clickY = target.y;
                
                // 显示调试信息
                this.drawDebugInfo(clickX + rect.left, clickY + GameArg.boxTop);
                
                // 创建触摸事件
                const touchEvent = {
                    targetTouches: [{
                        pageX: clickX,
                        pageY: clickY + GameArg.boxTop
                    }],
                    preventDefault: () => {},
                    stopPropagation: () => {}
                };

                // 直接调用游戏的触摸处理函数
                if (typeof GameArg.touchHandler === 'function') {
                    GameArg.touchHandler(touchEvent);
                } else {
                    canvas.dispatchEvent(new TouchEvent('touchstart', {
                        bubbles: true,
                        cancelable: true,
                        touches: [new Touch({
                            identifier: Date.now(),
                            target: canvas,
                            clientX: clickX + rect.left,
                            clientY: clickY + GameArg.boxTop,
                            pageX: clickX + rect.left,
                            pageY: clickY + GameArg.boxTop
                        })],
                        targetTouches: [touchEvent.targetTouches[0]],
                        view: window
                    }));
                }
                
                this.log(`点击坐标: (${clickX.toFixed(0)}, ${clickY.toFixed(0)})`);
                this.log(`相对位置: dx=${target.relativeX.toFixed(0)}, dy=${target.relativeY.toFixed(0)}`, 'success');
                return true;
            } catch (err) {
                this.log(`点击错误: ${err.message}`, 'error');
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
                    if (this.simulateTouch(target)) {
                        this.clickCount++;
                        this.infoDisplay.textContent = `执行次数: ${this.clickCount} | 得分: ${hg.grade.val || 0}`;
                    }
                }

                // 动态延迟
                const baseDelay = 800;
                const speedFactor = Math.min(this.clickCount * 10, 300);
                const delay = Math.max(500, baseDelay - speedFactor);
                
                await new Promise(resolve => setTimeout(resolve, delay));
                
                if (this.isRunning) this.autoPlay();
            } catch (err) {
                this.log(`执行错误: ${err.message}`, 'error');
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
            this.startBtn.style.background = '#45a049';
            this.autoPlay();
        }

        stop() {
            this.isRunning = false;
            this.stopBtn.style.background = '#d32f2f';
            this.log('自动游戏停止');
        }
    }

    // 初始化游戏控制器
    window.gameController = new GameController();

    // 保存原始触摸处理函数
    if (window.GameArg) {
        GameArg.touchHandler = a;
    }

    // 监听游戏结束
    const originalGameOver = window.gameOver;
    window.gameOver = function(score) {
        if (window.gameController) {
            window.gameController.stop();
            window.gameController.log(`游戏结束，得分: ${score}`);
        }
        return originalGameOver.apply(this, arguments);
    };
})();
