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
    
    // 查找游戏中的目标元素 - 改进版
    function findGameElements() {
        // 查找所有图片元素
        const allImages = Array.from(document.querySelectorAll('img'));
        log(`找到 ${allImages.length} 个图片元素`);
        
        // 记录所有图片的URL，帮助调试
        allImages.forEach((img, index) => {
            if (img.src) {
                log(`图片 #${index+1}: ${img.src.substring(0, 50)}...`);
            }
        });
        
        // 尝试多种方式查找目标图片
        let targetImages = [];
        
        // 1. 通过URL部分匹配
        targetImages = allImages.filter(img => {
            const src = img.src || '';
            return src.includes('160x160') || 
                   src.includes('ACgIABAEGAAgi') || 
                   src.includes('.png.webp');
        });
        
        // 2. 如果没找到，尝试通过尺寸查找
        if (targetImages.length === 0) {
            targetImages = allImages.filter(img => {
                const width = img.width || img.clientWidth;
                const height = img.height || img.clientHeight;
                return (width >= 50 && width <= 200) && (height >= 50 && height <= 200);
            });
        }
        
        // 3. 如果还没找到，尝试通过位置查找（通常目标在上半部分）
        if (targetImages.length === 0) {
            targetImages = allImages.filter(img => {
                const rect = img.getBoundingClientRect();
                return rect.top < window.innerHeight / 2;
            });
        }
        
        // 4. 尝试查找游戏区域内的所有可点击元素
        if (targetImages.length === 0) {
            const gameArea = document.querySelector('.game-container') || document.body;
            const clickableElements = Array.from(gameArea.querySelectorAll('*')).filter(el => {
                const style = window.getComputedStyle(el);
                return style.cursor === 'pointer' || el.onclick || el.addEventListener;
            });
            log(`找到 ${clickableElements.length} 个可点击元素`);
            targetImages = clickableElements;
        }
        
        // 查找小人物元素
        const characterImage = allImages.find(img => {
            const src = img.src || '';
            return src.includes('200x200') || 
                   src.includes('ACgIABAEGAAgk') || 
                   src.includes('小人');
        });
        
        log(`找到 ${targetImages.length} 个可能的目标元素`);
        if (characterImage) {
            log('找到小人物元素');
        } else {
            log('未找到小人物元素，将尝试查找页面底部的元素');
        }
        
        return {
            targets: targetImages,
            character: characterImage
        };
    }
    
    // 添加一个函数来分析页面上的所有元素
    function analyzePageElements() {
        log('开始分析页面元素...');
        
        // 分析所有图片
        const allImages = document.querySelectorAll('img');
        log(`页面上共有 ${allImages.length} 个图片元素`);
        
        // 分析所有可能的游戏容器
        const possibleContainers = document.querySelectorAll('.game-container, .game, #game, [id*="game"], [class*="game"]');
        log(`找到 ${possibleContainers.length} 个可能的游戏容器`);
        
        // 分析所有canvas元素（游戏常用）
        const canvasElements = document.querySelectorAll('canvas');
        log(`找到 ${canvasElements.length} 个Canvas元素`);
        
        // 查找可能的钓鱼游戏特定元素
        const hookElements = document.querySelectorAll('[id*="hook"], [class*="hook"], [id*="fish"], [class*="fish"]');
        log(`找到 ${hookElements.length} 个可能与钓鱼相关的元素`);
        
        // 查找页面底部的元素（可能是小人）
        const bottomElements = Array.from(document.querySelectorAll('*')).filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.bottom > window.innerHeight * 0.7 && rect.width > 20 && rect.height > 20;
        });
        log(`找到 ${bottomElements.length} 个位于页面底部的元素`);
        
        return {
            images: allImages,
            containers: possibleContainers,
            canvases: canvasElements,
            hookRelated: hookElements,
            bottomElements: bottomElements
        };
    }
    
    // 模拟点击元素
    function simulateClick(element) {
        // ... 模拟点击代码保持不变 ...
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
        
        // 先分析页面元素
        const pageAnalysis = analyzePageElements();
        
        // 查找游戏元素
        const gameElements = findGameElements();
        if (!gameElements.targets.length) {
            log('未找到目标元素，尝试使用页面分析结果');
            
            // 尝试使用页面底部元素作为目标
            if (pageAnalysis.bottomElements.length > 0) {
                gameElements.targets = Array.from(document.querySelectorAll('*')).filter(el => {
                    const rect = el.getBoundingClientRect();
                    return rect.top < window.innerHeight * 0.7 && rect.width > 20 && rect.height > 20;
                });
                log(`使用页面上部元素作为目标，找到 ${gameElements.targets.length} 个元素`);
            }
            
            if (!gameElements.targets.length) {
                log('仍然未找到目标元素，无法开始游戏');
                gameState.isPlaying = false;
                return;
            }
        }
        
        // 设置游戏循环
        gameState.interval = setInterval(() => {
            if (!gameState.isPlaying) {
                clearInterval(gameState.interval);
                return;
            }
            
            // 重新查找元素（因为DOM可能会变化）
            const currentElements = findGameElements();
            let targets = currentElements.targets;
            
            // 如果没找到目标，使用页面上部的元素
            if (!targets.length) {
                targets = Array.from(document.querySelectorAll('*')).filter(el => {
                    const rect = el.getBoundingClientRect();
                    return rect.top < window.innerHeight * 0.5 && 
                           rect.width > 20 && rect.height > 20 &&
                           rect.width < 200 && rect.height < 200;
                });
                log(`使用备选方法找到 ${targets.length} 个可能的目标元素`);
            }
            
            if (!targets.length) {
                log('目标元素已消失，等待新元素出现');
                return;
            }
            
            // 获取当前时间
            const now = Date.now();
            
            // 根据钩子状态决定操作
            if (gameState.hookState === 'ready') {
                // 钩子准备好，可以点击目标
                const targetIndex = Math.floor(Math.random() * targets.length);
                const target = targets[targetIndex];
                
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
