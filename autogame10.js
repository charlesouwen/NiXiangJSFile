// 元素检查工具
(function() {
    // 创建信息显示面板
    const infoPanel = document.createElement('div');
    infoPanel.id = 'element-inspector-panel';
    infoPanel.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        max-width: 80%;
        max-height: 40%;
        overflow-y: auto;
        z-index: 10000;
        display: none;
    `;
    document.body.appendChild(infoPanel);
    
    // 创建状态指示器
    const statusIndicator = document.createElement('div');
    statusIndicator.id = 'inspector-status';
    statusIndicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #4CAF50;
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        font-family: sans-serif;
        font-size: 12px;
        z-index: 10000;
    `;
    statusIndicator.textContent = '元素检查工具已启用 (长按元素查看信息)';
    document.body.appendChild(statusIndicator);
    
    // 长按计时器
    let pressTimer = null;
    let isInspecting = false;
    
    // 显示元素信息
    function showElementInfo(element) {
        if (!element) return;
        
        // 收集元素信息
        const tagName = element.tagName.toLowerCase();
        const id = element.id ? `id="${element.id}"` : '';
        const className = element.className ? `class="${element.className}"` : '';
        const src = element.src ? `src="${element.src}"` : '';
        const href = element.href ? `href="${element.href}"` : '';
        const alt = element.alt ? `alt="${element.alt}"` : '';
        const style = element.getAttribute('style') ? `style="${element.getAttribute('style')}"` : '';
        
        // 计算元素位置
        const rect = element.getBoundingClientRect();
        const position = `位置: 左${Math.round(rect.left)}px, 上${Math.round(rect.top)}px, 宽${Math.round(rect.width)}px, 高${Math.round(rect.height)}px`;
        
        // 获取计算样式
        const computedStyle = window.getComputedStyle(element);
        const importantStyles = {
            display: computedStyle.display,
            position: computedStyle.position,
            visibility: computedStyle.visibility,
            zIndex: computedStyle.zIndex,
            opacity: computedStyle.opacity,
            backgroundColor: computedStyle.backgroundColor,
            cursor: computedStyle.cursor
        };
        
        // 构建HTML代码
        let htmlCode = `<${tagName} ${id} ${className} ${src} ${href} ${alt} ${style}></${tagName}>`;
        
        // 构建信息面板内容
        let infoContent = `
            <h3>元素信息</h3>
            <p><strong>标签:</strong> ${tagName}</p>
            ${id ? `<p><strong>ID:</strong> ${element.id}</p>` : ''}
            ${className ? `<p><strong>类名:</strong> ${element.className}</p>` : ''}
            ${src ? `<p><strong>图片源:</strong> ${element.src}</p>` : ''}
            ${href ? `<p><strong>链接:</strong> ${element.href}</p>` : ''}
            <p><strong>${position}</strong></p>
            
            <h3>重要样式</h3>
            <ul>
                ${Object.entries(importantStyles).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
            </ul>
            
            <h3>HTML代码</h3>
            <pre>${htmlCode}</pre>
            
            <h3>内部文本</h3>
            <pre>${element.innerText || '(无文本内容)'}</pre>
            
            <h3>子元素数量</h3>
            <p>${element.children.length} 个子元素</p>
            
            <button id="copy-element-info">复制信息</button>
            <button id="close-info-panel">关闭</button>
        `;
        
        // 更新并显示信息面板
        infoPanel.innerHTML = infoContent;
        infoPanel.style.display = 'block';
        
        // 添加复制按钮功能
        document.getElementById('copy-element-info').addEventListener('click', function() {
            const infoText = `
元素信息:
标签: ${tagName}
${id ? `ID: ${element.id}` : ''}
${className ? `类名: ${element.className}` : ''}
${src ? `图片源: ${element.src}` : ''}
${position}

HTML代码:
${htmlCode}
            `;
            
            navigator.clipboard.writeText(infoText).then(() => {
                alert('元素信息已复制到剪贴板');
            }).catch(err => {
                console.error('复制失败:', err);
            });
        });
        
        // 添加关闭按钮功能
        document.getElementById('close-info-panel').addEventListener('click', function() {
            infoPanel.style.display = 'none';
        });
        
        // 高亮显示选中的元素
        const originalOutline = element.style.outline;
        element.style.outline = '2px solid red';
        
        // 5秒后取消高亮
        setTimeout(() => {
            element.style.outline = originalOutline;
        }, 5000);
    }
    
    // 鼠标按下事件
    document.addEventListener('mousedown', function(e) {
        if (isInspecting) return;
        
        pressTimer = setTimeout(function() {
            isInspecting = true;
            showElementInfo(e.target);
            
            // 2秒后重置检查状态
            setTimeout(() => {
                isInspecting = false;
            }, 2000);
        }, 500); // 长按500毫秒触发
    });
    
    // 鼠标松开事件
    document.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    // 鼠标移出事件
    document.addEventListener('mouseout', function() {
        clearTimeout(pressTimer);
    });
    
    // 添加键盘快捷键 (Esc键关闭面板)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && infoPanel.style.display === 'block') {
            infoPanel.style.display = 'none';
        }
    });
    
    console.log('元素检查工具已加载，长按页面元素查看详细信息');
})();
