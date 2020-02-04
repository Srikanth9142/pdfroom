from django.db import models

# Create your models here.
class Book(models.Model):
    bookid =  models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to='media/')
    coverphoto = models.ImageField(upload_to='media/')
    author = models.CharField(max_length=150)
    category = models.CharField(max_length=50,null=True)
    
    




