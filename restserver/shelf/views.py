from django.shortcuts import render,redirect,reverse
from django.http import HttpResponse
from rest_framework import generics
from .models import Book
from .serializers import BookSerializer
# Create your views here.

def home(request):
    return HttpResponse("neeku ardamavutundaa")

class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


