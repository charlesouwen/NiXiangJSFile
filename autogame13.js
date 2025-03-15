(function() {
    // 游戏控制器
    class GameController {
        constructor() {
            this.isRunning = false;
            this.clickCount = 0;
            this.lastClickTime = 0;
            this.successCount = 0;
            this.failCount = 0;
            this.createUI();
            this.logContainer = null;
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
                flex-direction: column;
                gap: 10px;
                min-width: 200px;
            `;

            const btnContainer = document.createElement('div');
            btnContainer.style.cssText = `
                display: flex;
                justify-content: space-between;
                gap: 10px;
            `;

            this.startBtn = this.createButton('开始自动', '#4CAF50');
            this.stopBtn = this.createButton('停止自动', '#f44336');
            this.statsDisplay = document.createElement('div');
            this.statsDisplay.style.cssText = `
                color: white;
                font-size: 12px;
                text-align: center;
            `;

            btnContainer.appendChild(this.startBtn);
            btnContainer.appendChild(this.stopBtn);
            panel.appendChild(btnContainer);
            panel.appendChild(this.statsDisplay);
            document.body.appendChild(panel);

            this.startBtn.onclick = () => this.start();
            this.stopBtn.onclick = () => this.stop();
        }

        createButton(text, color) {
            const btn = document.createElement('button');
            btn.textContent = text;
            btn.style.cssText = `
                padding: 5px 15px;
                background: ${color};
                color: white;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                font-size: 14px;
            `;
            return btn;
        }

        initLogger() {
            this.logContainer = document.createElement('div');
            this.logContainer.style.cssText = `
                position: fixed;
                right: 10px;
                top: 10px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px;
                border-radius: 5px;
                max-height: 300px;
                overflow-y: auto;
                font-size: 12px;
                z-index: 9999;
                width: 200px;
            `;
            document.body.appendChild(this.logContainer);
        }

        log(message, type = 'info') {
            const logEntry = document.createElement('div');
            logEntry.style.color = type === 'error' ? '#ff4444' : 
                                 type === 'success' ? '#4CAF50' : '#ffffff';
            logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
            this.logContainer.insertBefore(logEntry, this.logContainer.firstChild);
            
            // 限制日志条数
            if (this.logContainer.children.length > 50) {
                this.logContainer.removeChild(this.logContainer.lastChild);
            }
        }

        findBestTarget() {
            if (!window.goods || !window.goods.length) return null;

            let bestTarget = null;
            let bestScore = -1;

            for (let gold of window.goods) {
                if (!gold || typeof gold.x === 'undefined' || typeof gold.y === 'undefined') continue;

                // 计算目标分数（考虑距离和价值）
                const distance = Math.sqrt(
                    Math.pow(gold.x - GameArg.role.x, 2) + 
                    Math.pow(gold.y, 2)
                );
                
                // 评分系统：距离越近，分数越高
                const score = 1000 / (distance + 1);
                
                if (score > bestScore) {
                    bestScore = score;
                    bestTarget = gold;
                }
            }

            return bestTarget;
        }

        simulateClick(target) {
            if (!target) return false;

            const canvas = LF.global.canvasObj;
            const rect = canvas.getBoundingClientRect();

            try {
                const touchEvent = new TouchEvent('touchstart', {
                    bubbles: true,
                    cancelable: true,
                    touches: [{
                        identifier: Date.now(),
                        target: canvas,
                        clientX: target.x + rect.left,
                        clientY: target.y + GameArg.boxTop,
                        pageX: target.x + rect.left,
                        pageY: target.y + GameArg.boxTop
                    }]
                });

                canvas.dispatchEvent(touchEvent);
                this.clickCount++;
                this.lastClickTime = Date.now();
                return true;
            } catch (err) {
                this.log(`点击失败: ${err.message}`, 'error');
                return false;
            }
        }

        updateStats() {
            this.statsDisplay.textContent = `
                执行: ${this.clickCount} | 成功: ${this.successCount} | 失败: ${this.failCount}
                得分: ${hg.grade.val || 0}
            `;
        }

        async autoPlay() {
            if (!this.isRunning || _gameOver) return;

            try {
                if (!GameArg.cantouch) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    if (this.isRunning) this.autoPlay();
                    return;
                }

                const target = this.findBestTarget();
                if (target) {
                    this.log(`找到目标: x=${target.x.toFixed(2)}, y=${target.y.toFixed(2)}`);
                    if (this.simulateClick(target)) {
                        this.successCount++;
                        this.log('点击成功', 'success');
                    }
                } else {
                    this.failCount++;
                    this.log('未找到合适目标', 'error');
                }

                this.updateStats();
                
                // 动态调整延迟
                const delay = Math.max(500, 1000 - (this.successCount * 50));
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
        }

        stop() {
            this.isRunning = false;
            this.stopBtn.style.background = '#d32f2f';
            this.log('自动游戏停止');
        }
    }

    // 初始化游戏控制器
    window.gameController = new GameController();

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
