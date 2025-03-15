(function() {
    class GameController {
        constructor() {
            this.isRunning = false;
            this.clickCount = 0;
            this.successCount = 0;
            this.lastScore = 0;
            this.createUI();
            this.initLogger();
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
            if (!target) return false;
            
            // 强制设置可点击状态
            if (!GameArg.cantouch) {
                GameArg.cantouch = true;
            }

            try {
                // 计算实际点击坐标
                const touchX = target.x;
                const touchY = target.y;
                
                // 直接创建原生触摸事件
                const touchObj = {
                    targetTouches: [{
                        pageX: touchX,
                        pageY: touchY + GameArg.boxTop
                    }],
                    preventDefault: () => {},
                    stopPropagation: () => {}
                };
                
                // 直接调用游戏的触摸处理函数
                LF.global.canvasObj.dispatchEvent(new MouseEvent('mousedown', {
                    clientX: touchX,
                    clientY: touchY,
                    bubbles: true,
                    cancelable: true
                }));
                
                // 备用方法：模拟点击事件
                const clickEvent = document.createEvent('MouseEvents');
                clickEvent.initMouseEvent(
                    'click', true, true, window, 0,
                    0, 0, touchX, touchY, false, false, false, false, 0, null
                );
                LF.global.canvasObj.dispatchEvent(clickEvent);
                
                this.log(`点击坐标: (${Math.round(touchX)}, ${Math.round(touchY)})`, 'success');
                return true;
            } catch (err) {
                this.log(`点击错误: ${err.message}`, 'error');
                return false;
            }
        }

        autoPlay() {
            if (!this.isRunning) return;
            
            // 检查游戏是否结束
            if (window._gameOver) {
                this.log('游戏结束，尝试重新开始', 'error');
                // 尝试重新开始游戏
                if (typeof window.gameRestart === 'function') {
                    window.gameRestart();
                    // 给游戏一些时间初始化
                    setTimeout(() => {
                        if (this.isRunning) this.autoPlay();
                    }, 1000);
                }
                return;
            }

            try {
                const target = this.findTarget();
                if (target) {
                    if (this.simulateTouch(target)) {
                        this.clickCount++;
                        
                        // 检查得分是否增加
                        setTimeout(() => {
                            const currentScore = hg.grade.val || 0;
                            if (currentScore > this.lastScore) {
                                this.successCount++;
                                this.lastScore = currentScore;
                            }
                            
                            const stats = `点击: ${this.clickCount}, 得分: ${currentScore}, 成功率: ${(this.successCount/this.clickCount*100).toFixed(1)}%`;
                            this.log(stats, 'success');
                            
                            // 立即执行下一次
                            if (this.isRunning) this.autoPlay();
                        }, 100);
                    } else {
                        // 点击失败，立即重试
                        if (this.isRunning) this.autoPlay();
                    }
                } else {
                    this.log('没有找到合适的目标，等待...', 'error');
                    // 短暂等待后重试
                    setTimeout(() => {
                        if (this.isRunning) this.autoPlay();
                    }, 100);
                }
            } catch (err) {
                this.log(`执行错误: ${err.message}`, 'error');
                // 出错后短暂等待
                setTimeout(() => {
                    if (this.isRunning) this.autoPlay();
                }, 500);
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

    // 直接初始化控制器
    window.gameController = new GameController();
})();
