from rest_framework import serializers
from .models import Book,Analytic,Reader,ShelfBook,Comment, ReadList, Note
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class LikesViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analytic
        fields = '__all__'

class SaveUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reader
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reader
        fields = '__all__'

class ShelfViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShelfBook
        fields = '__all__'

class CommentViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class BookDetailsSerializer(serializers.ModelSerializer):
    likes_per_book = serializers.IntegerField(source='number_of_likes_per_book',read_only=True)
    class Meta:
        model = Book
        fields = ('bookid','name','fileUrl','coverphoto','author','category','likes_per_book')


class ReadListViewSerializer(serializers.ModelSerializer):
    book_coverphoto = serializers.CharField(source='get_cover_photo', read_only=True)
    class Meta:
        model = ReadList
        fields = ('bookid', 'readlist_name', 'book_coverphoto')


class ViewCommentsOfUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class ViewNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'