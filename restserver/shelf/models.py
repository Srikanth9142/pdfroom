from django.db import models

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
    
class Analytic(models.Model):
    bookid = models.ForeignKey(Book,on_delete=models.CASCADE)
    email = models.EmailField()

class Reader(models.Model):
    #readerid = models.AutoField()
    name = models.CharField(max_length=250)
    email = models.EmailField(primary_key=True)
    photoid = models.CharField(max_length=250)

    def __str__(self):
        return str(self.name)
