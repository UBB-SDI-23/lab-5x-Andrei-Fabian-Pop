from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path("emails/", EmailList.as_view()),
    path("emails/<str:email_name>", EmailAddresses.as_view(), name="email_name"),
    path("emails/<int:page>/", EmailList.as_view()),
    path("emails/more/<int:more>", EmailList.as_view()),

    path("events/", EventList.as_view()),
    path("events/<int:page>/", EventList.as_view()),
    path("events/<str:event_name>", EventAddresses.as_view(), name="event_name"),

    path("emails/<int:email_id>/events/", EmailToEventList.as_view()),
    path("emails/<int:email_id>/events/<int:event_id>/", EmailToEventList.as_view()),
    path("events/<int:event_id>/emails/", EmailToEventList.as_view()),
    path("events/<int:event_id>/emails/<int:email_id>/", EmailToEventList.as_view()),


    path("subscriptions/", SubscriptionList.as_view()),
    path("subscriptions/<int:page>/", SubscriptionList.as_view()),
    path("subscriptions/filter/<int:gtvalue>/", SubscriptionList.as_view()),

    path("emailtoevent/", EmailToEventList.as_view()),
    path("emailtoevent/<int:page>/", EmailToEventList.as_view()),

    path("statistics/", StatisticsView.as_view()),
    path("statistics/<str:statname>/", StatisticsView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
