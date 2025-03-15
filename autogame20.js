(function() {
    class GameController {
        constructor() {
            this.isRunning = false;
            this.clickCount = 0;
            this.lastClickTime = 0;
            this.createUI();
            this.initLogger();
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

            for (let gold of window.goods) {
                if (!gold || !gold.x || !gold.y) continue;

                const roleX = GameArg.role.x + GameArg.role.width * 0.83;
                const roleY = GameArg.role.y + GameArg.role.height * 0.37;
                const relativeX = gold.x - roleX;
                const relativeY = gold.y + GameArg.mLayer.y - roleY;
                const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
                
                let score = 1000 / (distance + 1);
                
                if (relativeY < 0) {
                    score *= 1.5;
                }
                
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
            if (!target || !GameArg.cantouch) return false;

            try {
                const touchX = target.x;
                const touchY = target.y;

                a({
                    targetTouches: [{
                        pageX: touchX,
                        pageY: touchY + GameArg.boxTop
                    }],
                    preventDefault: () => {},
                    stopPropagation: () => {}
                });
                
                this.log(`点击: (${Math.round(touchX)}, ${Math.round(touchY)})`);
                return true;
            } catch (err) {
                this.log(`点击错误: ${err.message}`, 'error');
                return false;
            }
        }

        calculateDelay() {
            const gameLevel = GameArg.level || 1;
            const gameSpeed = GameArg.speed || 1;
            
            let delay = 800 - (gameLevel * 20) - (gameSpeed * 30);
            
            const successRate = (hg.grade.val || 0) / (this.clickCount * 50 || 1);
            if (successRate < 0.5) {
                delay += 100;
            }
            
            return Math.max(400, delay);
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
                        const score = hg.grade.val || 0;
                        const stats = `点击: ${this.clickCount}, 得分: ${score}, 等级: ${GameArg.level.toFixed(1)}`;
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
            this.log('自动游戏开始');
            this.autoPlay();
        }

        stop() {
            this.isRunning = false;
            this.log('自动游戏停止');
        }
    }

    window.gameController = new GameController();
})();
