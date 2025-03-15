(function() {
    class GameController {
        constructor() {
            this.isRunning = false;
            this.clickCount = 0;
            this.successCount = 0;
            this.lastScore = 0;
            this.createUI();
            this.initLogger();
            this.initDebugLines();
        }

        createUI() {
            const panel = document.createElement('div');
            panel.style.cssText = `
                position: fixed;
                bottom: 120px;
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

        drawDebugLines(x, y, target) {
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
            if (target && GameArg.role) {
                const roleX = GameArg.role.x + GameArg.role.width * 0.83;
                const roleY = GameArg.role.y + GameArg.role.height * 0.37;
                
                this.debugCtx.beginPath();
                this.debugCtx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
                this.debugCtx.setLineDash([5, 5]);
                this.debugCtx.moveTo(roleX, roleY);
                this.debugCtx.lineTo(x, y);
                this.debugCtx.stroke();
                this.debugCtx.setLineDash([]);
            }
            
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
                bottom: 60px;
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

        findTarget() {
            if (!window.goods || !window.goods.length) return null;
            
            let bestTarget = null;
            let bestScore = -1;

            // 获取角色位置
            const roleX = GameArg.role.x + GameArg.role.width * 0.83;
            const roleY = GameArg.role.y + GameArg.role.height * 0.37;

            for (let gold of window.goods) {
                if (!gold || !gold.x || !gold.y) continue;

                // 计算金币相对于角色的位置
                const relativeX = gold.x - roleX;
                const relativeY = gold.y + GameArg.mLayer.y - roleY;
                
                // 计算距离
                const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
                
                // 计算角度
                const cos = relativeX / distance;
                const sin = relativeY / distance;
                
                // 模拟钩子移动
                const hookLX = (distance + GameArg.hook.height) * cos + roleX;
                const hookLY = (distance + GameArg.hook.height) * sin + roleY;
                
                // 检查是否在碰撞区域内
                const t = [
                    hookLX, 
                    hookLX - GameArg.money.width, 
                    hookLY - GameArg.mLayer.y, 
                    hookLY - GameArg.mLayer.y - 0.75 * GameArg.money.height, 
                    GameArg.role.y - GameArg.mLayer.y - GameArg.money.height / 2
                ];
                
                // 基础分数
                let score = 1000 / (distance + 1);
                
                // 优先选择上方的金币
                if (relativeY < 0) {
                    score *= 1.5;
                }
                
                // 避免选择太远的目标
                if (distance > LF.global.height * 0.6) {
                    score *= 0.3;
                }
                
                // 根据游戏碰撞检测逻辑优化
                if (gold.x < t[0] && gold.x > t[1] && gold.y < t[2] && gold.y > t[3] && gold.y < t[4]) {
                    score *= 3; // 更高的权重给可能命中的目标
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestTarget = {
                        x: gold.x,
                        y: gold.y + GameArg.mLayer.y,
                        score: score,
                        distance: distance,
                        gold: gold
                    };
                }
            }

            return bestTarget;
        }

        simulateTouch(target) {
            if (!target || !GameArg.cantouch) return false;

            try {
                // 计算实际点击坐标
                const touchX = target.x;
                const touchY = target.y;
                
                // 显示调试线
                this.drawDebugLines(touchX, touchY, target);

                // 创建触摸事件
                const touchEvent = new Event('touchstart', {
                    bubbles: true,
                    cancelable: true
                });

                // 添加必要的触摸信息
                touchEvent.targetTouches = [{
                    identifier: Date.now(),
                    target: LF.global.canvasObj,
                    pageX: touchX,
                    pageY: touchY + GameArg.boxTop,
                    clientX: touchX,
                    clientY: touchY,
                    screenX: touchX,
                    screenY: touchY
                }];

                // 触发事件
                LF.global.canvasObj.dispatchEvent(touchEvent);
                
                this.log(`点击坐标: (${Math.round(touchX)}, ${Math.round(touchY)})`, 'success');
                return true;
            } catch (err) {
                this.log(`点击错误: ${err.message}`, 'error');
                
                // 备用方法
                try {
                    // 模拟原生触摸事件
                    const touch = {
                        pageX: target.x,
                        pageY: target.y + GameArg.boxTop
                    };
                    
                    // 调用游戏的触摸处理函数
                    const touchHandlers = LF.global.canvasObj._events && 
                                         LF.global.canvasObj._events.touchstart;
                    
                    if (touchHandlers && touchHandlers.length) {
                        touchHandlers[0]({
                            targetTouches: [touch],
                            preventDefault: () => {},
                            stopPropagation: () => {}
                        });
                        this.log(`使用备用方法点击成功`, 'success');
                        return true;
                    }
                    
                    return false;
                } catch (backupErr) {
                    this.log(`备用点击方法失败: ${backupErr.message}`, 'error');
                    return false;
                }
            }
        }

        calculateDelay() {
            // 根据游戏逻辑计算合适的延迟
            const gameLevel = GameArg.level || 1;
            const gameSpeed = GameArg.speed || 1;
            const lineSpeed = GameArg.line && GameArg.line.speed ? 
                             GameArg.line.speed : LF.global.width / 300;
            
            // 基础延迟随游戏等级和速度动态调整
            let delay = 1000 - (gameLevel * 50) - (gameSpeed * 100);
            
            // 根据成功率调整延迟
            const currentScore = hg.grade.val || 0;
            const scoreDiff = currentScore - this.lastScore;
            
            if (scoreDiff > 0) {
                this.successCount++;
                this.lastScore = currentScore;
            }
            
            const successRate = this.successCount / (this.clickCount || 1);
            
            if (successRate < 0.5) {
                delay += 200; // 成功率低时增加延迟
            } else if (successRate > 0.8) {
                delay -= 100; // 成功率高时减少延迟
            }
            
            // 确保最小和最大延迟
            return Math.max(500, Math.min(delay, 1500));
        }

        async autoPlay() {
            if (!this.isRunning || window._gameOver) return;

            try {
                // 等待可点击状态
                if (!GameArg.cantouch) {
                    await new Promise(resolve => setTimeout(resolve, 50));
                    if (this.isRunning) this.autoPlay();
                    return;
                }

                const target = this.findTarget();
                if (target) {
                    if (this.simulateTouch(target)) {
                        this.clickCount++;
                        const score = hg.grade.val || 0;
                        const stats = `点击: ${this.clickCount}, 得分: ${score}, 成功率: ${(this.successCount/this.clickCount*100).toFixed(1)}%, 等级: ${GameArg.level.toFixed(1)}`;
                        this.log(stats, 'success');
                    }
                } else {
                    this.log('没有找到合适的目标', 'error');
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
            this.lastScore = hg.grade.val || 0;
            this.log('自动游戏开始', 'success');
            this.startBtn.style.background = '#45a049';
            this.autoPlay();
        }

        stop() {
            this.isRunning = false;
            this.stopBtn.style.background = '#d32f2f';
            this.log('自动游戏停止', 'error');
        }
    }

    // 等待游戏加载完成后再初始化控制器
    const initController = () => {
        if (window.GameArg && window.LF && window.goods) {
            window.gameController = new GameController();
        } else {
            setTimeout(initController, 1000);
        }
    };

    initController();
})();
