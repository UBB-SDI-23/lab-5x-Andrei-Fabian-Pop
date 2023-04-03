from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Email, Event, EmailToEvent, Subscription


class StatisticsViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.email1 = Email.objects.create(
            address="test1@example.com",
            corporate_email=True,
            user_full_name="Test User 1",
            language="EN",
            country="RO",
        )
        self.email2 = Email.objects.create(
            address="test2@example.com",
            corporate_email=False,
            user_full_name="Test User 2",
            language="RO",
            country="I",
        )
        self.event1 = Event.objects.create(
            name="Test Event 1",
            description="This is a test event",
            start_date="2023-04-01T09:00:00Z",
            end_date="2023-04-01T17:00:00Z",
            recurring=False,
        )
        self.event2 = Event.objects.create(
            name="Test Event 2",
            description="This is another test event",
            start_date="2023-04-02T10:00:00Z",
            end_date="2023-04-02T18:00:00Z",
            recurring=False,
        )
        self.email_event1 = EmailToEvent.objects.create(
            name="Test Email to Event 1",
            details="Details for test email to event 1",
            email=self.email1,
            event=self.event1,
        )
        self.email_event2 = EmailToEvent.objects.create(
            name="Test Email to Event 2",
            details="Details for test email to event 2",
            email=self.email2,
            event=self.event2,
        )
        self.subscription1 = Subscription.objects.create(
            name="Test Subscription 1",
            description="This is a test subscription",
            price=10,
            period="MO",
            period_paid=12,
            mail=self.email1,
        )
        self.subscription2 = Subscription.objects.create(
            name="Test Subscription 2",
            description="This is another test subscription",
            price=20,
            period="WE",
            period_paid=52,
            mail=self.email1,
        )

    def test_available_statistics(self):
        url = "/statistics/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"available statistics": {"yearly_pay", "countries"}})

    def test_yearly_pay_statistics(self):
        url = "/statistics/yearly_pay/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0][0], "test1@example.com")
        self.assertEqual(response.data[0][1], 1050)

    def test_countries_statistics(self):
        url = "/statistics/countries/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data, {('RO', 1), ('I', 1), ('PT', 0)})
