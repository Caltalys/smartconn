module.exports = {
  apps: [
    {
      name: "smartcom", // Tên ứng dụng của bạn trong pm2
      script: "npm", // Lệnh để chạy
      args: "run start", // Tham số truyền cho lệnh `script` (tương đương `yarn start`)
      interpreter: "bash", // Chỉ định rõ trình thông dịch là bash
      exec_mode: "fork", // Chế độ thực thi phù hợp cho yarn/npm
      env: {
        NODE_ENV: "production",
        // PORT: 3000, // Bạn có thể chỉ định port ở đây nếu cần
      },
    },
  ],
};
