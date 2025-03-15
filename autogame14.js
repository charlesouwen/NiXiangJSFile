(function() {
    class GameController {
        constructor() {
            this.isRunning = false;
            this.clickCount = 0;
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

                const distance = Math.sqrt(
                    Math.pow(gold.x - GameArg.role.x, 2) + 
                    Math.pow(gold.y, 2)
                );

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
                
                // 创建原生触摸点对象
                const touchPoint = {
                    identifier: Date.now(),
                    target: canvas,
                    pageX: target.x,
                    pageY: target.y + GameArg.boxTop
                };

                // 直接调用游戏的触摸处理函数
                const touchEvent = {
                    targetTouches: [touchPoint],
                    preventDefault: () => {},
                    stopPropagation: () => {}
                };

                // 调用游戏原生的触摸处理函数
                GameArg.touchHandler && GameArg.touchHandler(touchEvent);
                
                this.log(`点击坐标: x=${target.x}, y=${target.y}`);
                return true;
            } catch (err) {
                this.log(`点击失败: ${err.message}`);
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
                    this.infoDisplay.textContent = `执行次数: ${this.clickCount} | 得分: ${hg.grade.val || 0}`;
                }

                // 动态延迟
                const delay = Math.max(800, 1200 - (this.clickCount * 10));
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

    // 添加游戏触摸处理函数引用
    if (window.GameArg) {
        GameArg.touchHandler = a;  // 引用游戏原始的触摸处理函数
    }
})();
