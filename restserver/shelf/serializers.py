from rest_framework import serializers
from .models import Book,Analytic

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class LikesViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analytic
        fields = '__all__'