```python
# استيراد المكتبات اللازمة
from random import choice

# قائمة الردود
responses = ["مرحبا! كيف يمكنني مساعدتك اليوم؟", "أهلاً! ماذا تحتاج مني؟", "مرحبًا! هل تحتاج إلى مساعدة؟"]

# دالة لرد البوت
def bot_response():
    return choice(responses)

# التفاعل مع المستخدم
while True:
    user_input = input(" أنت:هو ")
    if user_input.lower() == 'إنهاء':
        print("البوت: شكرًا للتحدث معي. إلى اللقاء!")
        break
    else:
        print("البوت:", bot_response())
``
