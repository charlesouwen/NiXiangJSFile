(function() {
    class GameController {
        constructor() {
            this.isRunning = false;
            this.clickCount = 0;
            this.successCount = 0;
            this.lastScore = 0;
            this.createUI();
            this.initLogger();
            this.waitForGameInit();
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

        waitForGameInit() {
            const checkInterval = setInterval(() => {
                if (window.GameArg && window.LF && window.LF.global && window.LF.global.canvasObj) {
                    this.log("游戏初始化完成", "success");
                    clearInterval(checkInterval);
                } else {
                    this.log("等待游戏初始化...", "info");
                }
            }, 1000);
        }

        findTarget() {
            if (!window.goods || !window.goods.length) return null;
            
            let bestTarget = null;
            let bestScore = -1;

            const roleX = GameArg.role.x + GameArg.role.width * 0.83;
            const roleY = GameArg.role.y + GameArg.role.height * 0.37;

            for (let gold of window.goods) {
                if (!gold || !gold.x || !gold.y) continue;

                const relativeX = gold.x - roleX;
                const relativeY = gold.y + GameArg.mLayer.y - roleY;
                
                if (relativeY >= 0) continue;
                
                const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
                
                let score = 1000 / (distance + 1);
                
                if (distance > LF.global.height * 0.5) {
                    score *= 0.3;
                }
                
                if (distance < LF.global.height * 0.1) {
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
            if (!target) return false;
            
            try {
                const canvas = LF.global.canvasObj;
                const rect = canvas.getBoundingClientRect();
                const touchX = target.x + rect.left;
                const touchY = target.y + GameArg.boxTop;
                
                this.drawDebugLines(touchX, touchY);

                const touchEvent = new TouchEvent('touchstart', {
                    bubbles: true,
                    cancelable: true,
                    touches: [{
                        identifier: Date.now(),
                        target: canvas,
                        pageX: touchX,
                        pageY: touchY,
                        clientX: touchX,
                        clientY: touchY
                    }],
                    targetTouches: [{
                        identifier: Date.now(),
                        target: canvas,
                        pageX: touchX,
                        pageY: touchY,
                        clientX: touchX,
                        clientY: touchY
                    }]
                });

                canvas.dispatchEvent(touchEvent);
                this.log(`点击坐标: (${Math.round(touchX)}, ${Math.round(touchY)})`, 'success');
                return true;
            } catch (err) {
                this.log(`点击错误: ${err.message}`, 'error');
                return false;
            }
        }

        calculateDelay() {
            const baseDelay = 2000;
            const gameLevel = GameArg.level || 1;
            const gameSpeed = GameArg.speed || 1;
            const hookSpeed = GameArg.line && GameArg.line.speed ? 
                             GameArg.line.speed : LF.global.width / 300;
            const screenHeight = LF.global.height;
            const hookTime = (screenHeight / hookSpeed) * 2;
            let delay = hookTime + 500 - (gameLevel * 50);
            return Math.max(1500, delay);
        }

        async autoPlay() {
            if (!this.isRunning) return;
            
            if (window._gameOver) {
                this.log('游戏结束，等待重新开始', 'error');
                setTimeout(() => {
                    if (this.isRunning) this.autoPlay();
                }, 1000);
                return;
            }

            try {
                if (!GameArg.cantouch) {
                    this.log('等待可点击状态...', 'info');
                    setTimeout(() => {
                        if (this.isRunning) this.autoPlay();
                    }, 500);
                    return;
                }
                
                const target = this.findTarget();
                if (target) {
                    if (this.simulateTouch(target)) {
                        this.clickCount++;
                        
                        setTimeout(() => {
                            const currentScore = hg.grade.val || 0;
                            if (currentScore > this.lastScore) {
                                this.successCount++;
                                this.lastScore = currentScore;
                            }
                            
                            const stats = `点击: ${this.clickCount}, 得分: ${currentScore}, 成功率: ${(this.successCount/this.clickCount*100).toFixed(1)}%`;
                            this.log(stats, 'success');
                        }, 1000);
                        
                        const delay = this.calculateDelay();
                        this.log(`等待下次点击: ${Math.round(delay)}ms`, 'info');
                        
                        setTimeout(() => {
                            if (this.isRunning) this.autoPlay();
                        }, delay);
                    } else {
                        setTimeout(() => {
                            if (this.isRunning) this.autoPlay();
                        }, 1000);
                    }
                } else {
                    this.log('没有找到合适的目标，等待...', 'error');
                    setTimeout(() => {
                        if (this.isRunning) this.autoPlay();
                    }, 1000);
                }
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

    const waitForGame = () => {
        if (window.GameArg && window.LF && window.LF.global && window.LF.global.canvasObj) {
            window.gameController = new GameController();
        } else {
            setTimeout(waitForGame, 500);
        }
    };

    waitForGame();
})();
