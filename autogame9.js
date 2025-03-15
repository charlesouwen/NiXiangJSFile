// 简化版自动游戏脚本
(function() {
    // 创建简单控制面板
    function createSimplePanel() {
        const panel = document.createElement('div');
        panel.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(0,0,0,0.7);padding:10px;border-radius:5px;display:flex;flex-direction:column;width:250px;';
        
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display:flex;justify-content:space-around;width:100%;';
        
        const startButton = document.createElement('button');
        startButton.textContent = '开始游戏';
        startButton.style.cssText = 'padding:8px 15px;background:#4CAF50;color:white;border:none;border-radius:4px;cursor:pointer;';
        startButton.onclick = startGame;
        
        const stopButton = document.createElement('button');
        stopButton.textContent = '结束游戏';
        stopButton.style.cssText = 'padding:8px 15px;background:#f44336;color:white;border:none;border-radius:4px;cursor:pointer;';
        stopButton.onclick = stopGame;
        
        const logDiv = document.createElement('div');
        logDiv.id = 'game-log';
        logDiv.style.cssText = 'margin-top:10px;background:white;color:black;padding:5px;border-radius:4px;height:100px;overflow-y:auto;font-size:12px;';
        
        buttonContainer.appendChild(startButton);
        buttonContainer.appendChild(stopButton);
        panel.appendChild(buttonContainer);
        panel.appendChild(logDiv);
        document.body.appendChild(panel);
        
        return logDiv;
    }
    
    // 简单日志功能
    function log(message) {
        const logDiv = document.getElementById('game-log');
        if (logDiv) {
            const entry = document.createElement('div');
            entry.textContent = message;
            logDiv.appendChild(entry);
            logDiv.scrollTop = logDiv.scrollHeight;
        }
        console.log(message); // 同时在控制台输出
    }
    
    // 简单点击功能
    function clickElement(element) {
        if (!element) return false;
        
        try {
            element.click();
            return true;
        } catch (e) {
            log('点击失败: ' + e.message);
            return false;
        }
    }
    
    // 游戏状态
    let gameRunning = false;
    let gameInterval = null;
    
    // 开始游戏
    function startGame() {
        if (gameRunning) {
            log('游戏已在运行中');
            return;
        }
        
        log('开始自动游戏');
        gameRunning = true;
        
        // 简单的游戏循环
        gameInterval = setInterval(function() {
            if (!gameRunning) {
                clearInterval(gameInterval);
                return;
            }
            
            // 查找页面上部的可点击元素
            const elements = Array.from(document.querySelectorAll('*')).filter(el => {
                const rect = el.getBoundingClientRect();
                return rect.top > 0 && 
                       rect.top < window.innerHeight * 0.5 && 
                       rect.width > 20 && 
                       rect.height > 20;
            });
            
            if (elements.length > 0) {
                log(`找到 ${elements.length} 个可能的目标`);
                // 随机选择一个元素点击
                const randomIndex = Math.floor(Math.random() * elements.length);
                const target = elements[randomIndex];
                
                log(`点击元素 #${randomIndex}`);
                clickElement(target);
                
                // 随机暂停一段时间
                const pauseTime = 1000 + Math.random() * 1000;
                setTimeout(function() {
                    log('准备下一次点击');
                }, pauseTime);
            } else {
                log('未找到可点击的目标');
            }
        }, 2000); // 每2秒尝试一次
    }
    
    // 停止游戏
    function stopGame() {
        if (!gameRunning) {
            log('游戏未在运行');
            return;
        }
        
        log('停止自动游戏');
        gameRunning = false;
        
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = null;
        }
    }
    
    // 初始化
    const logDiv = createSimplePanel();
    log('简化版自动游戏脚本已加载');
})();
