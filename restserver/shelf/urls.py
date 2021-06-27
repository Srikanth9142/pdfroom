from django.urls import path
from . import views
urlpatterns=[
    path('home',views.home,name="home"), #shelf/home
    path('list',views.BookList.as_view(),name="list_books"), #shelf/list
    path('like',views.SaveLike.as_view(),name="save like"),
    path('saveuser',views.SaveUser.as_view(),name="save user"), 
    path('savetoshelf',views.SaveToShelf.as_view(),name="save to shelf"),
    path('getlike/<str:token>',views.ViewPersonLike.as_view(),name="get likes"),
    path('getshelf/<str:token>',views.ViewPersonShelf.as_view(),name="get shelf books"),
    path('deleteBookFromShelf',views.DeleteBookFromShelf.as_view(), name=" Delete book from shelf"),
    path('getuser/<str:token>',views.GetUserProfile.as_view(),name="get userprofile"),
    path('checksession/<str:token>',views.CheckSession.as_view(),name="user session"),
    path('viewcomments/<str:book_id>',views.ViewComments.as_view(),name="view comments"),
    path('addcomment',views.AddComment.as_view(),name="Add comment"),
    path('viewCommentsByUser/<str:token>', views.ViewCommentsOfUser.as_view(), name="View comments made by user"),
    path('viewbook/<str:book_id>',views.GetDetailsOfBook.as_view(),name="Book Details"),
    path('addupvote',views.UpvoteReview.as_view(),name="Add upvote"),
    path('saveToReadList', views.AddtoReadList.as_view(), name="Save to Readlist"),
    path('getReadList/<str:token>', views.ViewReadList.as_view(), name="Get ReadList"),
    path('readListBookDelete', views.ReadListBookDelete.as_view(), name="Delete book from Readlist"),
    path('viewNotes/<str:token>/<int:book_id>', views.ViewNotes.as_view(), name="View to fetch notes"),
    path('saveNotes', views.SaveNotes.as_view(), name="Save notes view"),
    path('deleteNotes', views.DeleteNotes.as_view(), name=" Delte notes view"),
    path('filterprofiles/<str:user_name>', views.FilterUserProfiles.as_view(), name="Filter readers"),
    path('filterbooks/<str:book_name>', views.FilterBooks.as_view(), name="Filter Books"),
    path('getprofile/<str:user_name>', views.GetUserProfileByUserName.as_view(), name="Get user profile"),
    path('getcomments/<str:user_name>', views.ViewCommentsOfAnotherUser.as_view(), name="Get other user comments"),
    path('userlikedbooks/<str:user_name>', views.GetLikedBooksOfUser.as_view(), name=" Get liked books of user"),
    path('follow',views.FollowSomeOne.as_view(), name="Start following"),
    path('viewfollowing/<str:token>',views.viewFollowersList.as_view(), name="View followers"),
    path('unfollow', views.UnfollowSomeOne.as_view(), name="Unfollow user")
]