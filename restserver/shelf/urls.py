from django.urls import path
from . import views
urlpatterns=[
    path('home',views.home,name="home"), #shelf/home
    path('list',views.BookList.as_view(),name="list_books"), #shelf/list
    path('like',views.SaveLike.as_view(),name="save like"), 
]