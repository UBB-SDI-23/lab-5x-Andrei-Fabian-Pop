from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Email)
admin.site.register(Event)
admin.site.register(Subscription)
admin.site.register(EmailToEvent)
