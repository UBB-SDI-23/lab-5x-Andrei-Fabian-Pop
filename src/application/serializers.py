from rest_framework import serializers
from .models import *
import re


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = '__all__'

    def validator(self, data):
        if not re.match('.*@.*', data.get('address')):
            raise serializers.ValidationError


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'

    def validator(self, data):
        if data.get('price') <= 0:
            raise serializers.ValidationError

        if data.get('period') <= 0:
            raise serializers.ValidationError


class EmailToEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailToEvent
        fields = '__all__'
