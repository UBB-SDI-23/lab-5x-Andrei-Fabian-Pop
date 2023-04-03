from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path("emails/", EmailList.as_view()),
    path("emails/<int:id>/", EmailList.as_view()),
    path("emails/more/<int:more>", EmailList.as_view()),

    path("events/", EventList.as_view()),
    path("events/<int:id>/", EventList.as_view()),


    path("emails/<int:email_id>/events/", EmailToEventList.as_view()),
    path("emails/<int:email_id>/events/<int:event_id>/", EmailToEventList.as_view()),
    path("events/<int:event_id>/emails/", EmailToEventList.as_view()),
    path("events/<int:event_id>/emails/<int:email_id>/", EmailToEventList.as_view()),


    path("subscriptions/", SubscriptionList.as_view()),
    path("subscriptions/<int:id>/", SubscriptionList.as_view()),
    path("subscriptions/filter/<int:gtvalue>/", SubscriptionList.as_view()),

    path("emailtoevent/", EmailToEventList.as_view()),
    path("emailtoevent/<int:id>/", EmailToEventList.as_view()),

    path("statistics/", StatisticsView.as_view()),
    path("statistics/<str:statname>/", StatisticsView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
