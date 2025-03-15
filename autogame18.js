(function() {
    class GameController {
        constructor() {
            this.isRunning = false;
            this.clickCount = 0;
            this.lastClickTime = 0;
            this.successCount = 0;
            this.failCount = 0;
            this.createUI();
            this.initLogger();
            this.initDebugLines();
            this.baseDelay = 600;
            this.minDelay = 200;
            this.initGameStateMonitor();
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

        drawDebugInfo(x, y, target) {
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
            
            // 绘制预测线
            if (target) {
                this.debugCtx.beginPath();
                this.debugCtx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
                this.debugCtx.setLineDash([5, 5]);
                this.debugCtx.moveTo(GameArg.role.x + GameArg.role.width * 0.83, GameArg.role.y + GameArg.role.height * 0.37);
                this.debugCtx.lineTo(x, y);
                this.debugCtx.stroke();
                this.debugCtx.setLineDash([]);
            }

            // 显示坐标
            this.debugCtx.fillStyle = 'red';
            this.debugCtx.font = '12px Arial';
            this.debugCtx.fillText(`(${Math.round(x)}, ${Math.round(y)})`, x + 25, y + 25);
            
            setTimeout(() => {
                this.debugCtx.clearRect(0, 0, this.debugCanvas.width, this.debugCanvas.height);
            }, 1000);
        }

        initLogger() {
            this.logDiv = document.createElement('div');
            this.logDiv.style.cssText = `
                position: fixed;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px;
                border-radius: 5px;
                max-height: 100px;
                overflow-y: auto;
                font-size: 12px;
                z-index: 9999;
                width: 80%;
                text-align: center;
            `;
            document.body.appendChild(this.logDiv);
        }

        log(message, type = 'info') {
            const logEntry = document.createElement('div');
            logEntry.style.color = type === 'error' ? '#ff4444' : 
                                 type === 'success' ? '#4CAF50' : '#ffffff';
            logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
            this.logDiv.insertBefore(logEntry, this.logDiv.firstChild);
            
            if (this.logDiv.children.length > 5) {
                this.logDiv.removeChild(this.logDiv.lastChild);
            }
        }

        initGameStateMonitor() {
            // 监控游戏状态变化
            let lastGrade = 0;
            setInterval(() => {
                if (this.isRunning) {
                    const currentGrade = hg.grade.val || 0;
                    if (currentGrade > lastGrade) {
                        this.successCount++;
                        lastGrade = currentGrade;
                    }
                }
            }, 100);
        }

        calculateDelay() {
            const now = Date.now();
            const gameLevel = GameArg.level || 1;
            const gameSpeed = GameArg.speed || 1;
            
            // 基础延迟随游戏等级和速度动态调整
            let delay = this.baseDelay - (gameLevel * 30) - (gameSpeed * 50);
            
            // 根据成功率调整延迟
            const successRate = this.successCount / (this.clickCount || 1);
            if (successRate < 0.5) {
                delay += 100; // 成功率低时增加延迟
            } else if (successRate > 0.8) {
                delay -= 50; // 成功率高时减少延迟
            }
            
            // 确保最小延迟
            delay = Math.max(this.minDelay, delay);
            
            // 如果距离上次点击时间太短，增加延迟
            const timeSinceLastClick = now - this.lastClickTime;
            if (timeSinceLastClick < 300) {
                delay += 100;
            }
            
            this.lastClickTime = now;
            return delay;
        }

        findTarget() {
            if (!window.goods || !window.goods.length) return null;
            
            let bestTarget = null;
            let bestScore = -1;

            const roleX = GameArg.role.x + GameArg.role.width * 0.83;
            const roleY = GameArg.role.y + GameArg.role.height * 0.37;
            const gameSpeed = GameArg.speed || 1;
            const gameLevel = GameArg.level || 1;

            for (let gold of window.goods) {
                if (!gold || !gold.x || !gold.y) continue;

                // 计算金币相对于角色的位置
                const relativeX = gold.x - roleX;
                const relativeY = gold.y + GameArg.mLayer.y - roleY;
                
                // 计算抓取难度
                const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
                const angle = Math.atan2(relativeY, relativeX);
                
                // 优化评分系统
                let score = 1000 / (distance + 1);
                
                // 根据游戏速度和等级调整评分
                score *= (1 + gameSpeed * 0.1);
                score *= (1 + gameLevel * 0.05);
                
                // 优先选择上方的金币
                if (relativeY < 0) {
                    score *= 1.2;
                }
                
                // 避免选择太远的目标
                if (distance > LF.global.height * 0.7) {
                    score *= 0.5;
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestTarget = {
                        x: gold.x,
                        y: gold.y + GameArg.mLayer.y,
                        score: score,
                        distance: distance
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
                const touchX = target.x;
                const touchY = target.y;
                
                // 显示调试信息
                this.drawDebugInfo(touchX, touchY, target);

                // 创建触摸事件对象
                const touchEvent = {
                    targetTouches: [{
                        identifier: Date.now(),
                        target: canvas,
                        pageX: touchX,
                        pageY: touchY + GameArg.boxTop
                    }],
                    preventDefault: () => {},
                    stopPropagation: () => {}
                };

                // 调用游戏的触摸处理函数
                GameArg.touchHandler && GameArg.touchHandler(touchEvent);
                
                this.log(`点击: (${Math.round(touchX)}, ${Math.round(touchY)}), 距离: ${Math.round(target.distance)}, 得分: ${Math.round(target.score)}`);
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
                    await new Promise(resolve => setTimeout(resolve, 50));
                    if (this.isRunning) this.autoPlay();
                    return;
                }

                const target = this.findTarget();
                if (target) {
                    if (this.simulateTouch(target)) {
                        this.clickCount++;
                        const stats = `点击: ${this.clickCount}, 成功: ${this.successCount}, 成功率: ${((this.successCount/this.clickCount)*100).toFixed(1)}%, 等级: ${GameArg.level.toFixed(1)}`;
                        this.log(stats, 'success');
                    }
                }

                const delay = this.calculateDelay();
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
            this.successCount = 0;
            this.failCount = 0;
            this.log('自动游戏开始');
            this.startBtn.style.background = '#45a049';
            this.autoPlay();
            
            // 保存原始触摸处理函数
            if (!GameArg.touchHandler) {
                GameArg.touchHandler = a;
            }
        }

        stop() {
            this.isRunning = false;
            this.stopBtn.style.background = '#d32f2f';
            this.log('自动游戏停止');
        }
    }

    window.gameController = new GameController();
})();
