from django.db import models
# Create your models here.


class Email(models.Model):
    AVAILABLE_COUNTRIES = (
        ('RO', 'ROMANIA'),
        ('I', 'IRELAND'),
        ('PT', 'PORTUGAL')
    )

    LANGUAGE_CHOICES = (
        ['RO', 'Romanian'],
        ['EN', 'English'],
        ['PT', 'Portuguese']
    )

    address = models.CharField(max_length=100, blank=False, default="")
    corporate_email = models.BooleanField(default=False)
    user_full_name = models.CharField(blank=True, default="", max_length=100)
    language = models.CharField(choices=LANGUAGE_CHOICES, default="python", max_length=100)
    country = models.CharField(choices=AVAILABLE_COUNTRIES, max_length=100)

    def __str__(self):
        return self.address


class Event(models.Model):
    name = models.CharField(max_length=100, blank=False, default="unknown event")
    description = models.CharField(max_length=300, blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    recurring = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class EmailToEvent(models.Model):
    name = models.CharField(max_length=100, blank=True)
    details = models.CharField(max_length=100, blank=True)
    email = models.ForeignKey(Email, on_delete=models.DO_NOTHING)
    event = models.ForeignKey(Event, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name


class Subscription(models.Model):
    SUBSCRIPTION_PERIODS = [
        ['WE', 'WEEKLY'],
        ['MO', 'MONTHLY'],
        ['YE', 'YEARLY']
    ]

    name = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=300, blank=True)
    price = models.IntegerField(blank=False)
    period = models.CharField(max_length=100, choices=SUBSCRIPTION_PERIODS)
    period_paid = models.IntegerField()
    mail = models.ForeignKey(Email, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name
