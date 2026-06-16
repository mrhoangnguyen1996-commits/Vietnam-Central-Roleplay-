const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

let vcrStorage = {
    citizens: [],
    logs: [`[HỆ THỐNG] Khởi tạo máy chủ phân hiệu VCR Roblox Portal thành công. Chờ lệnh liên thông.`]
};

app.get('/api/vcr/db', (req, res) => res.json(vcrStorage));
app.post('/api/vcr/register', (req, res) => {
    const citizen = req.body;
    vcrStorage.citizens.unshift(citizen);
    vcrStorage.logs.unshift(`[${citizen.time}] Đơn xin nhập tịch của cư dân @${citizen.name} đã được nộp lên hàng đợi.`);
    res.json({ success: true });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, '0.0.0.0', () => console.log(`[VCR ROBLOX] Máy chủ chạy ổn định tại cổng ${PORT}`));
