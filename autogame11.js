// 简化版元素检查工具 - 点击即可查看元素信息
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
    
    // 创建开关按钮
    const toggleButton = document.createElement('button');
    toggleButton.id = 'inspector-toggle';
    toggleButton.style.cssText = `
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
        border: none;
        cursor: pointer;
    `;
    toggleButton.textContent = '启用元素检查';
    document.body.appendChild(toggleButton);
    
    // 检查状态
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
        
        // 计算元素位置
        const rect = element.getBoundingClientRect();
        const position = `位置: 左${Math.round(rect.left)}px, 上${Math.round(rect.top)}px, 宽${Math.round(rect.width)}px, 高${Math.round(rect.height)}px`;
        
        // 构建HTML代码
        let htmlCode = `<${tagName} ${id} ${className} ${src} ${href}>`;
        
        // 构建信息面板内容
        let infoContent = `
            <h3>元素信息</h3>
            <p><strong>标签:</strong> ${tagName}</p>
            ${id ? `<p><strong>ID:</strong> ${element.id}</p>` : ''}
            ${className ? `<p><strong>类名:</strong> ${element.className}</p>` : ''}
            ${src ? `<p><strong>图片源:</strong> ${element.src}</p>` : ''}
            ${href ? `<p><strong>链接:</strong> ${element.href}</p>` : ''}
            <p><strong>${position}</strong></p>
            
            <h3>HTML代码</h3>
            <pre>${htmlCode}</pre>
            
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
        
        // 在控制台也输出信息
        console.log('元素信息:', {
            tagName,
            id: element.id,
            className: element.className,
            src: element.src,
            position: {
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height
            },
            element
        });
    }
    
    // 切换检查模式
    function toggleInspector() {
        isInspecting = !isInspecting;
        toggleButton.textContent = isInspecting ? '停用元素检查' : '启用元素检查';
        toggleButton.style.background = isInspecting ? '#f44336' : '#4CAF50';
        
        if (isInspecting) {
            document.body.style.cursor = 'crosshair';
        } else {
            document.body.style.cursor = '';
        }
    }
    
    // 点击开关按钮
    toggleButton.addEventListener('click', toggleInspector);
    
    // 点击事件处理
    document.addEventListener('click', function(e) {
        if (!isInspecting) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        showElementInfo(e.target);
    }, true);
    
    // 添加键盘快捷键 (Esc键关闭面板和检查模式)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (infoPanel.style.display === 'block') {
                infoPanel.style.display = 'none';
            }
            if (isInspecting) {
                toggleInspector();
            }
        }
    });
    
    console.log('元素检查工具已加载，点击"启用元素检查"按钮开始使用');
})();
