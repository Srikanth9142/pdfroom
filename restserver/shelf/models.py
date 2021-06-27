from django.db import models
from django.utils.timezone import now
import uuid


# Create your models here.
class Book(models.Model):
    bookid =  models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    fileUrl = models.CharField(max_length=100)
    coverphoto = models.ImageField(upload_to='media/')
    author = models.CharField(max_length=150)
    category = models.CharField(max_length=50,null=True)

    def __str__(self):
        return str(self.name)
    
    def number_of_likes_per_book(self):
        return Analytic.objects.filter(bookid=self.bookid).count()
    
class Analytic(models.Model):
    bookid = models.ForeignKey(Book,on_delete=models.CASCADE)
    email = models.EmailField()

class Reader(models.Model):
    #readerid = models.AutoField()
    name = models.CharField(max_length=250)
    email = models.EmailField(primary_key=True)
    photoid = models.CharField(max_length=250)
    points = models.IntegerField(default=0,null=False)

    def __str__(self):
        return str(self.name)

class ShelfBook(models.Model):
    bookid = models.ForeignKey(Book,on_delete=models.CASCADE)
    email = models.EmailField()

class Comment(models.Model):
    comment_id = models.CharField(primary_key=True, max_length=100,db_column="Comment Id")
    bookid = models.ForeignKey(Book, on_delete=models.CASCADE)
    email = models.EmailField()
    user_name = models.CharField(max_length=250,db_column="User Name")
    message = models.CharField(max_length=250, db_column="Message")
    upvotes = models.IntegerField(default=0, db_column="Upvotes")


class ReadList(models.Model):
    bookid = models.ForeignKey(Book, on_delete=models.CASCADE)
    email = models.EmailField()
    readlist_name = models.CharField(max_length=50, default="Watchlist", db_column="ReadList name")
    def get_cover_photo(self):
        return Book.objects.get(bookid=self.bookid.bookid).coverphoto


class Note(models.Model):
    bookid = models.ForeignKey(Book, on_delete=models.CASCADE)
    email = models.EmailField()
    body = models.CharField(max_length=700)


class Follower(models.Model):
    follower = models.ForeignKey(Reader, on_delete=models.CASCADE, related_name="follower_user_object")
    following = models.ForeignKey(Reader, on_delete=models.CASCADE, related_name="following_user_object")
    time = models.DateTimeField(default=now, blank=True)

    def get_following_person_profile_picture(self):
        return Reader.objects.get(email=self.following.email).photoid
    
    def get_following_person_name(self):
        return Reader.objects.get(email=self.following.email).name
    
    def get_following_person_points(self):
        return Reader.objects.get(email=self.following.email).points