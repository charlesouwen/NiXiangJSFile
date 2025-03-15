// 自动游戏脚本 - 钓鱼游戏自动操作
(function() {
    // 创建控制面板
    function createControlPanel() {
        const panel = document.createElement('div');
        panel.id = 'auto-game-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 10px;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 300px;
        `;
        
        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            display: flex;
            justify-content: space-around;
            width: 100%;
        `;
        
        // 创建开始按钮
        const startButton = document.createElement('button');
        startButton.textContent = '开始游戏';
        startButton.style.cssText = `
            padding: 8px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        `;
        startButton.onclick = startAutoPlay;
        
        // 创建结束按钮
        const stopButton = document.createElement('button');
        stopButton.textContent = '结束游戏';
        stopButton.style.cssText = `
            padding: 8px 15px;
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        `;
        stopButton.onclick = stopAutoPlay;
        
        // 创建日志区域
        const logArea = document.createElement('div');
        logArea.id = 'auto-game-log';
        logArea.style.cssText = `
            background-color: rgba(255, 255, 255, 0.9);
            color: #333;
            padding: 10px;
            border-radius: 4px;
            max-height: 150px;
            overflow-y: auto;
            font-family: monospace;
            font-size: 14px;
        `;
        
        // 组装面板
        buttonContainer.appendChild(startButton);
        buttonContainer.appendChild(stopButton);
        panel.appendChild(buttonContainer);
        panel.appendChild(logArea);
        document.body.appendChild(panel);
        
        return {
            panel,
            logArea,
            startButton,
            stopButton
        };
    }
    
    // 添加日志
    function log(message) {
        const logArea = document.getElementById('auto-game-log');
        if (logArea) {
            const time = new Date().toLocaleTimeString();
            const logEntry = document.createElement('div');
            logEntry.textContent = `[${time}] ${message}`;
            logArea.appendChild(logEntry);
            logArea.scrollTop = logArea.scrollHeight;
        }
    }
    
    // 查找游戏中的目标元素
    function findGameElements() {
        // 查找所有图片元素
        const allImages = Array.from(document.querySelectorAll('img'));
        
        // 查找目标图片 (钓鱼目标)
        const targetImages = allImages.filter(img => {
            const src = img.src || '';
            return src.includes('ACgIABAEGAAgi-irvgYogt_0AzDMAzjLAw') || 
                   src.includes('160x160.png.webp');
        });
        
        // 查找小人物元素
        const characterImage = allImages.find(img => {
            const src = img.src || '';
            return src.includes('ACgIABAEGAAgk-irvgYopuOg1wIw1AM4zwY') || 
                   src.includes('200x200.png.webp');
        });
        
        log(`找到 ${targetImages.length} 个目标元素`);
        if (characterImage) {
            log('找到小人物元素');
        }
        
        return {
            targets: targetImages,
            character: characterImage
        };
    }
    
    // 模拟点击元素
    function simulateClick(element) {
        if (!element) {
            log('未找到要点击的元素');
            return false;
        }
        
        // 创建点击事件
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        
        // 触发点击事件
        const clicked = element.dispatchEvent(clickEvent);
        
        if (clicked) {
            // 在元素位置显示点击效果
            const rect = element.getBoundingClientRect();
            const clickEffect = document.createElement('div');
            clickEffect.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background-color: rgba(255, 0, 0, 0.5);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                top: ${rect.top + rect.height/2 - 10}px;
                left: ${rect.left + rect.width/2 - 10}px;
                animation: clickEffect 0.5s forwards;
            `;
            
            // 添加动画样式
            if (!document.getElementById('click-effect-style')) {
                const style = document.createElement('style');
                style.id = 'click-effect-style';
                style.textContent = `
                    @keyframes clickEffect {
                        0% { transform: scale(0.5); opacity: 1; }
                        100% { transform: scale(2); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(clickEffect);
            setTimeout(() => {
                clickEffect.remove();
            }, 500);
        }
        
        return clicked;
    }
    
    // 获取随机延迟时间
    function getRandomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // 游戏状态
    let gameState = {
        isPlaying: false,
        interval: null,
        hookState: 'ready', // ready, extending, retracting
        lastClickTime: 0
    };
    
    // 开始自动游戏
    function startAutoPlay() {
        if (gameState.isPlaying) {
            log('游戏已经在运行中');
            return;
        }
        
        log('开始自动游戏');
        gameState.isPlaying = true;
        
        // 查找游戏元素
        const gameElements = findGameElements();
        if (!gameElements.targets.length) {
            log('未找到目标元素，无法开始游戏');
            gameState.isPlaying = false;
            return;
        }
        
        // 设置游戏循环
        gameState.interval = setInterval(() => {
            if (!gameState.isPlaying) {
                clearInterval(gameState.interval);
                return;
            }
            
            // 重新查找元素（因为DOM可能会变化）
            const currentElements = findGameElements();
            if (!currentElements.targets.length) {
                log('目标元素已消失，等待新元素出现');
                return;
            }
            
            // 获取当前时间
            const now = Date.now();
            
            // 根据钩子状态决定操作
            if (gameState.hookState === 'ready') {
                // 钩子准备好，可以点击目标
                const targetIndex = Math.floor(Math.random() * currentElements.targets.length);
                const target = currentElements.targets[targetIndex];
                
                log(`点击目标 #${targetIndex+1}`);
                if (simulateClick(target)) {
                    gameState.hookState = 'extending';
                    gameState.lastClickTime = now;
                    log('钩子发射中...');
                }
            } else if (gameState.hookState === 'extending') {
                // 钩子正在延伸，等待一段时间后切换到收缩状态
                if (now - gameState.lastClickTime > getRandomDelay(800, 1200)) {
                    gameState.hookState = 'retracting';
                    log('钩子收缩中...');
                }
            } else if (gameState.hookState === 'retracting') {
                // 钩子正在收缩，等待一段时间后准备下一次点击
                if (now - gameState.lastClickTime > getRandomDelay(1500, 2500)) {
                    gameState.hookState = 'ready';
                    log('钩子准备就绪');
                }
            }
        }, 300);
    }
    
    // 停止自动游戏
    function stopAutoPlay() {
        if (!gameState.isPlaying) {
            log('游戏未在运行');
            return;
        }
        
        log('停止自动游戏');
        gameState.isPlaying = false;
        
        if (gameState.interval) {
            clearInterval(gameState.interval);
            gameState.interval = null;
        }
    }
    
    // 初始化
    function init() {
        log('自动游戏脚本已加载');
        createControlPanel();
    }
    
    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
