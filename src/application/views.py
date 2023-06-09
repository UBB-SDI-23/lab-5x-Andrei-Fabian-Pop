from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework import status, generics


# Create your views here.


class EmailList(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.__offset = 100
        self.__queryset = Email.objects.all()
        self.__serializer_class = EmailSerializer

    @property
    def queryset(self):
        return self.__queryset

    @property
    def serializer_class(self):
        return self.__serializer_class

    def get(self, request, page=None):
        if page is None:
            page = 0

        id = request.query_params.get('id', None)
        if id is not None:
            entity = self.__queryset.get(id=id)
            serializer = self.__serializer_class(entity)

            return Response({"status": "success", "data": serializer.data, "totalRows": self.__queryset.count()}, status=status.HTTP_200_OK)

        items = self.__queryset.order_by('id')[page * self.__offset:(page + 1) * self.__offset]
        serializer = self.__serializer_class(items, many=True)
        return Response({"status": "success", "data": serializer.data, "totalRows": self.__queryset.count()}, status=status.HTTP_200_OK)

    def post(self, request, more=False):
        if more:
            data = request.data
            datastr = data['data']
            datastr = datastr.split(",")
            for datas in datastr:
                cast = int(datas)
                if Subscription.objects.get(id=cast):
                    serializer = Subscription.objects.all()
                    Subscription.objects.create(name=serializer.get(id=cast).name,
                                                description=serializer.get(id=cast).description,
                                                price=serializer.get(id=cast).price,
                                                period=serializer.get(id=cast).period,
                                                period_paid=serializer.get(id=cast).period_paid,
                                                mail=serializer.get(id=cast).mail,
                                                mail_id=more)
            return Response({"status": "success", "serializer": ""},
                            status=status.HTTP_201_CREATED)

        serializer = self.__serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def patch(self, request):
        id = request.query_params.get('id', None)
        if id:
            item = self.__queryset.get(id=id)
            serializer = self.__serializer_class(item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"status": "error", "data": "no id specified"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        id = request.query_params.get('id', None)
        if not id:
            return Response({"status": "error", "data": "No id specified, no action was performed"})
        item = self.__queryset.get(id=id)
        item.delete()
        return Response({"status": "success", "data": "Item Deleted"})


class EmailAddresses(generics.ListCreateAPIView):
    serializer_class = EmailSerializer

    def get_queryset(self):
        email_name = self.kwargs.get("email_name")
        queryset = Email.objects.all()
        if email_name is not None:
            queryset = queryset.filter(address__icontains=email_name)
        # print(queryset.explain())
        # print(t_name)
        return queryset[:10]


class EventList(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.__offset = 100
        self.__queryset = Event.objects.all()
        self.__serializer_class = EventSerializer

    @property
    def queryset(self):
        return self.__queryset

    @property
    def serializer_class(self):
        return self.__serializer_class

    def get(self, request, page=None):
        if page is None:
            page = 0
        id = request.query_params.get('id', None)
        if id:
            entity = self.__queryset.get(id=id)
            serializer = self.__serializer_class(entity)
            return Response({"status": "success", "data": serializer.data, "totalRows": self.__queryset.count()}, status=status.HTTP_200_OK)

        items = self.__queryset.order_by('id')[page * self.__offset:(page + 1) * self.__offset]
        serializer = self.__serializer_class(items, many=True)
        return Response({"status": "success", "data": serializer.data, "totalRows": self.__queryset.count()}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.__serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        id = request.query_params.get('id', None)
        if id:
            item = self.__queryset.get(id=id)
            serializer = self.__serializer_class(item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response({"status": "error", "data": "no id specified"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request):
        id = request.query_params.get('id', None)
        if not id:
            return Response({"status": "error", "data": "No id specified, no action was performed"},
                            status=status.HTTP_400_BAD_REQUEST)
        item = self.__queryset.get(id=id)
        item.delete()
        return Response({"status": "success", "data": "Item Deleted"}, status=status.HTTP_200_OK)


class EventAddresses(generics.ListCreateAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        event_name = self.kwargs.get("event_name")
        queryset = Event.objects.all()
        if event_name is not None:
            queryset = queryset.filter(name__icontains=event_name)

        return queryset[:10]


class SubscriptionList(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.__offset = 100
        self.__model = Subscription
        self.__queryset = self.__model.objects.all()
        self.__serializer_class = SubscriptionSerializer
        self.__filter_fields = (
            'id',
            'price',
        )

    @property
    def queryset(self):
        return self.__queryset

    @property
    def serializer_class(self):
        return self.__serializer_class

    @property
    def filter_fields(self):
        return self.__filter_fields

    def get(self, request, gtvalue=None, page=None):
        if page is None:
            page = 0
        id = request.query_params.get('id', None)
        if id:
            entity = self.__queryset.get(id=id)
            serializer = self.__serializer_class(entity)
            return Response({"status": "success", "data": serializer.data, "totalRows": self.__queryset.count()}, status=status.HTTP_200_OK)

        if gtvalue:
            entities = self.__queryset.filter(price__gt=gtvalue)
            serializer = self.__serializer_class(entities, many=True)
            return Response({"status": "success", "data": serializer.data, "totalRows": self.__queryset.count()}, status=status.HTTP_200_OK)

        items = self.__queryset.order_by('id')[page * self.__offset:(page + 1) * self.__offset]
        serializer = self.__serializer_class(items, many=True)
        return Response({"status": "success", "data": serializer.data, "totalRows": self.__queryset.count()}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.__serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def patch(self, request, page=None):
        id = request.query_params.get('id', None)
        if id is not None:
            item = self.__queryset.get(id=id)
            serializer = self.__serializer_class(item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"status": "error", "data": "no id specified"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request):
        id = request.query_params.get('id', None)
        if not id:
            return Response({"status": "error", "data": "No id specified, no action was performed"},
                            status=status.HTTP_400_BAD_REQUEST)
        item = self.__queryset.get(id=id)
        item.delete()
        return Response({"status": "success", "data": "Item Deleted"}, status=status.HTTP_200_OK)


class StatisticsView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__offset = 100
        self.stats = {
            "yearly_pay": self.__yearly_pay,
            "countries": self.__countries,
        }

    @staticmethod
    def __countries(request) -> Response:
        response = {}
        for item in Email.AVAILABLE_COUNTRIES:
            response[item[0]] = Email.objects.filter(country=item[0]).count()

        return Response(response.items(), status=status.HTTP_200_OK)

    @staticmethod
    def __yearly_pay(request) -> Response:
        response = {}

        emails = Email.objects.all()[:1000]
        for email in emails:
            subscriptions = Subscription.objects.all().filter(mail=email.id)
            pay = 0
            for subscription in subscriptions:
                price = subscription.price
                mult = 12 if subscription.period[0] == 'MO' else 52 if subscription.period == 'WE' else 1
                pay += price * mult
                response[email.address] = pay

        return Response(sorted(response.items(), key=lambda item: item[1], reverse=True), status=status.HTTP_200_OK)

    def get(self, request, statname=None):
        if statname is None:
            return Response({"available statistics": self.stats.keys()}, status=status.HTTP_200_OK)
        else:
            if statname in self.stats:
                return self.stats[statname](request)
            else:
                Response({"status": "error", "data": "no such statistic was found"}, status=status.HTTP_404_NOT_FOUND)


class EmailToEventList(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.__offset = 100
        self.__model = EmailToEvent
        self.__queryset = self.__model.objects.all()
        self.__serializer_class = EmailToEventSerializer

    @property
    def queryset(self):
        return self.__queryset

    @property
    def serializer_class(self):
        return self.__serializer_class

    def get(self, request, email_id=None, event_id=None, page=None):
        if page is None:
            page = 0
        id = request.query_params.get('id', None)
        items = self.__queryset.order_by('id')[page * self.__offset:(page + 1) * self.__offset]

        if id:
            items = items.filter(id=id)
            serializer = EmailToEventSerializer(items, many=True)
            return Response({"status": "success", "data": serializer.data, "totalRows": self.__queryset.count()}, status=status.HTTP_200_OK)

        if email_id:
            items = items.filter(email=email_id)
            if event_id:
                items = items.filter(event=event_id)
            entities = []
            for item in items:
                entities.append(Event.objects.get(id=item.event.id))
            serializer = EventSerializer(entities, many=True)
        elif event_id:
            items = items.filter(event=event_id)
            if email_id:
                items = items.filter(email_id=email_id)
            entities = []
            for item in items:
                entities.append(Event.objects.get(id=item.event.id))
            serializer = EventSerializer(entities, many=True)
        else:
            serializer = self.__serializer_class(items, many=True)

        return Response({"status": "success", "data": serializer.data, "totalRows": self.__queryset.count()}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.__serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def patch(self, request):
        id = request.query_params.get('id', None)

        if id:
            data = request.data

            return Response({"data": data})

        item = self.__queryset.get(id=id)
        serializer = self.__serializer_class(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        id = request.query_params.get('id', None)

        if not id:
            return Response({"status": "error", "data": "No id specified, no action was performed"},
                            status=status.HTTP_400_BAD_REQUEST)
        item = self.__queryset.get(id=id)
        item.delete()
        return Response({"status": "success", "data": "Item Deleted"}, status=status.HTTP_200_OK)
