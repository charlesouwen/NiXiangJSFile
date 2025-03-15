(function() {
    class GameController {
        constructor() {
            this.isRunning = false;
            this.clickCount = 0;
            this.createUI();
            this.initLogger();
            this.initDebugElements();
        }

        createUI() {
            const panel = document.createElement('div');
            panel.style.cssText = `
                position: fixed;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 10000;
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

        initDebugElements() {
            // 创建十字准星容器
            this.crosshair = document.createElement('div');
            this.crosshair.style.cssText = `
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                display: none;
            `;

            // 水平线
            const hLine = document.createElement('div');
            hLine.style.cssText = `
                position: absolute;
                width: 40px;
                height: 2px;
                background: #ff0000;
                left: -20px;
                top: -1px;
            `;

            // 垂直线
            const vLine = document.createElement('div');
            vLine.style.cssText = `
                position: absolute;
                width: 2px;
                height: 40px;
                background: #ff0000;
                left: -1px;
                top: -20px;
            `;

            // 坐标文本
            this.coordsText = document.createElement('div');
            this.coordsText.style.cssText = `
                position: absolute;
                color: #ff0000;
                font-size: 12px;
                white-space: nowrap;
                left: 25px;
                top: 25px;
            `;

            this.crosshair.appendChild(hLine);
            this.crosshair.appendChild(vLine);
            this.crosshair.appendChild(this.coordsText);
            document.body.appendChild(this.crosshair);
        }

        showCrosshair(x, y) {
            this.crosshair.style.display = 'block';
            this.crosshair.style.left = x + 'px';
            this.crosshair.style.top = y + 'px';
            this.coordsText.textContent = `(${Math.round(x)}, ${Math.round(y)})`;

            setTimeout(() => {
                this.crosshair.style.display = 'none';
            }, 2000);
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
                max-height: 300px;
                overflow-y: auto;
                font-size: 12px;
                z-index: 10000;
                width: 250px;
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
                const angleScore = Math.abs(relativeY) / (Math.abs(relativeX) + 1);
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
                
                // 计算实际点击位置
                const touchX = target.x;
                const touchY = target.y + GameArg.boxTop;
                
                // 显示点击位置
                this.showCrosshair(touchX, touchY);
                
                // 创建触摸点对象
                const touch = {
                    identifier: Date.now(),
                    target: canvas,
                    clientX: touchX,
                    clientY: touchY,
                    pageX: touchX,
                    pageY: touchY,
                    screenX: touchX,
                    screenY: touchY
                };

                // 创建触摸事件对象
                const touchEvent = {
                    targetTouches: [touch],
                    preventDefault: () => {},
                    stopPropagation: () => {}
                };

                // 调用游戏的触摸处理函数
                if (typeof a === 'function') {
                    a(touchEvent);
                    this.log(`触发点击: (${touchX}, ${touchY})`, 'success');
                    return true;
                } else {
                    throw new Error('找不到触摸处理函数');
                }
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
                const delay = Math.max(800, 1200 - (this.clickCount * 20));
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
})();
