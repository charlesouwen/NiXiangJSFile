(function() {
    class GameController {
        constructor() {
            this.isRunning = false;
            this.clickCount = 0;
            this.successCount = 0;
            this.lastScore = 0;
            this.createUI();
            this.initLogger();
            this.findTouchHandler();
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

        // 查找游戏原始的触摸处理函数
        findTouchHandler() {
            // 从游戏代码中可以看到，触摸处理函数是直接添加到canvas上的
            this.touchHandler = null;
            
            // 尝试获取事件处理函数
            const canvasObj = LF.global.canvasObj;
            if (canvasObj && canvasObj._events && canvasObj._events.touchstart) {
                this.touchHandler = canvasObj._events.touchstart[0];
                this.log("找到触摸处理函数", "success");
            } else {
                // 如果找不到，尝试从全局获取
                this.log("未找到触摸处理函数，使用备用方法", "error");
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
            if (!target) return false;
            
            try {
                // 直接使用游戏中的触摸处理逻辑
                const touchEvent = {
                    targetTouches: [{
                        pageX: target.x,
                        pageY: target.y + GameArg.boxTop
                    }],
                    preventDefault: () => {},
                    stopPropagation: () => {}
                };
                
                // 直接调用游戏中的触摸处理函数
                const touchHandlerFn = this.touchHandler || window.a;
                
                if (typeof touchHandlerFn === 'function') {
                    touchHandlerFn(touchEvent);
                    this.log(`点击坐标: (${Math.round(target.x)}, ${Math.round(target.y)})`, 'success');
                    return true;
                } else {
                    // 如果找不到处理函数，尝试直接修改游戏状态
                    if (GameArg.cantouch) {
                        GameArg.cantouch = false;
                        GameArg.play = true;
                        GameArg.sz = true;
                        GameArg.isFail = false;
                        GameArg.jump = true;
                        
                        // 计算角度和方向
                        GameArg.roleX = GameArg.role.x + 0.83 * GameArg.role.width;
                        GameArg.roleY = GameArg.role.y + 0.37 * GameArg.role.height;
                        GameArg.hook.x = GameArg.roleX;
                        GameArg.hook.y = GameArg.roleY - GameArg.hook.height;
                        
                        const dx = target.x - GameArg.roleX;
                        const dy = target.y - GameArg.boxTop - GameArg.roleY;
                        const dr = Math.sqrt(dx * dx + dy * dy);
                        
                        GameArg.dx = dx;
                        GameArg.dy = dy;
                        GameArg.dr = dr;
                        GameArg.cos = dx / dr;
                        GameArg.sin = dy / dr;
                        
                        // 设置钩子角度
                        GameArg.hook.rotate = 180 * Math.atan(dy / dx) / Math.PI + 90;
                        if (dx < 0) GameArg.hook.rotate += 180;
                        
                        // 显示钩子和线
                        GameArg.hook.visible = true;
                        GameArg.line.visible = true;
                        
                        this.log(`直接修改游戏状态: (${Math.round(target.x)}, ${Math.round(target.y)})`, 'success');
                        return true;
                    }
                    
                    this.log("无法点击：游戏不可点击状态", "error");
                    return false;
                }
            } catch (err) {
                this.log(`点击错误: ${err.message}`, 'error');
                return false;
            }
        }

        autoPlay() {
            if (!this.isRunning) return;
            
            // 检查游戏是否结束
            if (window._gameOver) {
                this.log('游戏结束，等待重新开始', 'error');
                setTimeout(() => {
                    if (this.isRunning) this.autoPlay();
                }, 1000);
                return;
            }

            try {
                // 检查是否可以点击
                if (!GameArg.cantouch) {
                    this.log('等待可点击状态...', 'info');
                    setTimeout(() => {
                        if (this.isRunning) this.autoPlay();
                    }, 100);
                    return;
                }
                
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
                        }, 500);
                    }
                } else {
                    this.log('没有找到合适的目标', 'error');
                }
                
                // 等待一段时间后再次尝试
                setTimeout(() => {
                    if (this.isRunning) this.autoPlay();
                }, 500);
            } catch (err) {
                this.log(`执行错误: ${err.message}`, 'error');
                setTimeout(() => {
                    if (this.isRunning) this.autoPlay();
                }, 1000);
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

    // 等待游戏加载完成
    const waitForGame = () => {
        if (window.GameArg && window.LF && window.LF.global && window.LF.global.canvasObj) {
            window.gameController = new GameController();
        } else {
            setTimeout(waitForGame, 500);
        }
    };

    waitForGame();
})();
