const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Bộ nhớ đệm RAM lưu trữ động cho các phiên làm việc và đăng ký
let vcrStorage = {
    citizens: [],
    logs: [`[${new Date().toLocaleTimeString()} 16/06/2026] Khởi tạo máy chủ phân hiệu VCR Portal thành công.`]
};

app.get('/api/vcr/db', (req, res) => res.json(vcrStorage));
app.post('/api/vcr/register', (req, res) => {
    const citizen = req.body;
    vcrStorage.citizens.unshift(citizen);
    vcrStorage.logs.unshift(`[16/06/2026] Công dân mới @${citizen.name} đã nộp hồ sơ định danh vào hệ thống.`);
    res.json({ success: true });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, '0.0.0.0', () => console.log(`[VCR] Máy chủ đang On-Air tại cổng ${PORT}`));
