**วิธีทดสอบบนเซิร์ฟจริง**
1. สามารถทดสอบ frontend ได้ผ่าน url
    - https://nattapoldev.shop หรือเข้าด้วย IP vps https://160.236.128.77

    1.1 สามารถ login user เริ่มต้น ด้วย
        username: admin
        password: admin123

2. สามารถทดสอบ backend ได้ผ่าน url
    - https://nattapoldev.shop/api หรือเข้าด้วย IP vps https://160.236.128.77/api


วิธีติดตั้งโปรเจกต์ 
**แบบธรรมดา**

1. clone project จาก git hub ด้วยคำสั่ง 
    - git clone https://github.com/NattapolSurinkeaw/testdigix.git

2. ติดตั้งส่วนของ api (backend) stack ที่ผมเลือกใช้เป็น node และ express
  2.1 cd เข้าไปใน folder backend 
  2.2 และใช้คำสั่ง npm install ใน terminal 
  2.3 เปลี่ยนชื่อ .env.example เป็น .env และเปลี่ยนค่า JWT_SECRET เช่น 6aOiuLVaSLnH7SVltsV4DetuwuKCYbftXACVJzJT0
  2.4 ตั้งค่าฐานข้อมูล ในที่นี้ผมใช้เป็น mysql ให้นำไฟล์ book_library.sql ใน folder DB ไป import เข้าใน phpMyAdmin
  2.5 run server api ด้วยคำสั่ง 
     - npm run dev
  2.6 api จะ run ที่ port 8000 ตามการตั้งค่า PORT ใน .env สามารถเรียกใช้งานผ่าน 
  http://localhost:8000


3. ติดตั้งส่วนของ frontend stack ที่ผมเลือกใช้เป็น react
    3.1 cd เข้าไปใน folder frontend 
    3.2 และใช้คำสั่ง npm install ใน terminal
    2.3 เปลี่ยนชื่อ .env.example เป็น .env และเปลี่ยนค่า JWT_SECRET เช่น 6aOiuLVaSLnH7SVltsV4DetuwuKCYbftXACVJzJT0
    2.4 run server frontend ด้วย
     - npm run dev
    2.5 สามารถใช้งานส่วนของ frontend ด้วย url http://localhost:5173 

4. สามารถ login เข้า frontend ด้วย default username จากไฟล์ฐานข้อมูลเดิมคือ
    username : admin123
    password : admin123


**ติดตั้งโปรเจคแบบใช้ docker**
**ในการทดสอบบนเครื่องผมใช้ docker desktop ครับ**
1. clone project จาก github จาก branch training ด้วยคำสั่ง
    - git clone -b training --single-branch https://github.com/NattapolSurinkeaw/testdigix.git

2. หลังจากนั้นเปิด terminal 
    2.1 cd เข้าไปที่ folder testdigix
    2.2 ใช้คำสั่ง docker compose up --build เพื่อติดตั้ง docker ได้เลย

