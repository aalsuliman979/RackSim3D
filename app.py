from flask import Flask, render_template

# إنشاء تطبيق بايثون
app = Flask(__name__)

# الصفحة الرئيسية للمشروع
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    print("جاري تشغيل مشروع RackSim 3D...")
    app.run(debug=True)