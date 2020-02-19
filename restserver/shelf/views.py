from django.shortcuts import render,redirect,reverse
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Book,Analytic
from .serializers import BookSerializer,LikesViewSerializer
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

def home(request):
    return HttpResponse("neeku ardamavutundaa")

class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class SaveLike(APIView):
    def post(self,request):
        #print("got data ",email,bookid)
        #print(request.body)
        book_temp = Book.objects.get(bookid=request.data.get('bookid'))
        analyticObj = Analytic(bookid=book_temp,email=request.data.get('email'))
        analyticObj.save()
        print("saved like")
        return Response("good")

class ViewPersonLike(generics.ListAPIView):
    serializer_class = LikesViewSerializer

    def get_queryset(self):
        email = self.kwargs['email']
        return Analytic.objects.filter(email = email)
