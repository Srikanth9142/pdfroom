from django.shortcuts import render,redirect,reverse
from django.http import HttpResponse
from django.db.models import Q
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

from .models import Book,Analytic,Reader,ShelfBook,Comment,ReadList, Note
from .serializers import (BookSerializer,LikesViewSerializer,SaveUserSerializer,
                            UserProfileSerializer,ShelfViewSerializer,CommentViewSerializer,
                            BookDetailsSerializer, ReadListViewSerializer,ViewCommentsOfUserSerializer,
                            ViewNotesSerializer)
from django_filters.rest_framework import DjangoFilterBackend
from .checkserver import RetrieveUserInfo,RetrieveEmail
from .exceptions import TokenExpiredException
from .constants import SESSION_EXPIRED_MESSAGE, EXISTING_BOOK_READLIST_MESSAGE

def home(request):
    return HttpResponse("Home page works")

class BookList(generics.ListCreateAPIView):
    #permission_classes = [permissions.IsAdminUser]

    queryset = Book.objects.all()
    serializer_class = BookSerializer

class SaveLike(APIView):
    def post(self,request):
        #print("got data ",email,bookid)
        #print(request.body)
        book_temp = Book.objects.get(bookid=request.data.get('bookid'))
        # book_temp.likes = book_temp.likes+1
        #book_temp.save()
        try:
            user_email = RetrieveEmail(request.data.get('id_token'))
            if(Analytic.objects.filter(email=user_email,bookid=book_temp)):
                print("Duplicate record")
                return Response("Already liked", status=501)
            else:
                analyticObj = Analytic(bookid=book_temp,email=user_email)
                analyticObj.save()
                print("saved like")
                return Response("good")
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)

class SaveToShelf(APIView):
    def post(self,request):
        book_obj = Book.objects.get(bookid=request.data.get('bookid'))
        try:
            user_email = RetrieveEmail(request.data.get('id_token'))
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)
        if(ShelfBook.objects.filter(email=user_email,bookid = book_obj)):
           return Response("Book already in shelf", status=501)
        else:
            shelfobj = ShelfBook(bookid = book_obj,email = user_email)
            shelfobj.save()
            print("added to shelf")
            return Response("saved")

class ViewPersonLike(generics.ListAPIView):
    serializer_class = LikesViewSerializer

    def get_queryset(self):
        try:
            user_email = RetrieveEmail(self.kwargs['token'])
            return Analytic.objects.filter(email = user_email)
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)


class ViewPersonShelf(generics.ListAPIView):
    serializer_class = ShelfViewSerializer

    def get_queryset(self):
        try:
            user_email = RetrieveEmail(self.kwargs['token'])
            return ShelfBook.objects.filter(email = user_email)
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)

class DeleteBookFromShelf(APIView):
    """
    View to delete the book from Shelf
    """
    def post(self, request):
        try:
            user_email = RetrieveEmail(request.data.get('id_token'));
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)
        book_instance = Book.objects.get(bookid=request.data.get("book_id"))
        shelf_instance = ShelfBook.objects.get(bookid=book_instance,email=user_email)
        shelf_instance.delete()
        return Response("Deleted book from shelf", status=200)


class SaveUser(APIView):
    serializer_class = SaveUserSerializer

    def post(self,request):
        readerinstance = Reader()
        try:
            useremail,name,photoid = RetrieveUserInfo(request.data.get('id_token'))
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)
        if(Reader.objects.filter(email=useremail).exists()):
            print("user exist")
            return Response("user exist")
        else:
            Readerobj = Reader(email=useremail,name=name,photoid=photoid)
            Readerobj.save()
            #print(Readerobj)
            print("user saved")
            return Response("user saved")

class GetUserProfile(generics.ListAPIView):
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        try:
            user_email = RetrieveEmail(self.kwargs['token'])
            return Reader.objects.filter(email=user_email)
        except TokenExpiredException as e:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)


#working fine checked with postman
class CheckSession(APIView):
    def get(self,request,token):
        if(RetrieveEmail(token)=="Token expired"):
            return Response({"result":"session expired"},status=200)
            #return Response("session expired")
        else:
        #return Response({"result":"Active session"},status=200)
            return Response({"result":"active session"},status=200)
        return HttpResponse("ok")

# Adding comments view
class ViewComments(generics.ListAPIView):
     serializer_class = CommentViewSerializer

     def get_queryset(self):
         book_id = self.kwargs['book_id']
         return Comment.objects.filter(bookid=book_id)


class AddComment(APIView):
    def post(self,request):
        
        book_id = request.data.get('bookid')
        message = request.data.get('message')
        comment_id = request.data.get('comment_id')
        print("message: ",message)
        print("commentId: ",comment_id)
        try:
            user_email =  RetrieveEmail(request.data.get('id_token'))
        except TokenExpiredException:
            print("TokenExipedException")
            return Response(SESSION_EXPIRED_MESSAGE, status=401)
        print(user_email)
        user_obj = Reader.objects.get(email=user_email)
        user_name = user_obj.name
        book_instance = Book.objects.get(bookid=book_id)
        comment_obj = Comment(comment_id=comment_id,bookid=book_instance,email=user_email,user_name=user_name,message=message)
        comment_obj.save()
        return Response("Comment added")


class ViewCommentsOfUser(generics.ListAPIView):
    """
    View to fetch all comments made by user
    """
    serializer_class = ViewCommentsOfUserSerializer
    def get_queryset(self):
        try:
            user_email = RetrieveEmail(self.kwargs['token'])
        except:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)
        return Comment.objects.filter(email=user_email)


class GetDetailsOfBook(generics.ListAPIView):
    serializer_class = BookDetailsSerializer

    def get_queryset(self):
        book_id = self.kwargs['book_id']
        return Book.objects.filter(bookid=book_id)

class UpvoteReview(APIView):
    def post(self,request):
        print("upvote called")
        comment_obj = Comment.objects.get(comment_id=request.data.get('comment_id'))
        try:
            upvoter_email = RetrieveEmail(request.data.get('id_token'))
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)
        if(upvoter_email == comment_obj.email):
            # self-voting case
            print("Self-voting")
            return Response("Self-voting is not possible", status=501)
        else:
            reader_obj = Reader.objects.get(email=comment_obj.email)
            reader_obj.points +=1
            comment_obj.upvotes += 1
            comment_obj.save()
            reader_obj.save()
            return Response("Upvote added", status=200)


class AddtoReadList(APIView):
    """
    View to add book into a readlist
    """
    def post(self, request):
        try:
            user_email = RetrieveEmail(request.data.get("id_token"))
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)
        book_instance = Book.objects.get(bookid=request.data.get("book_id"))
        if(ReadList.objects.filter(bookid=book_instance, email=user_email)):
            return Response(EXISTING_BOOK_READLIST_MESSAGE, status=501)
        readlist_instance = ReadList(bookid=book_instance, email=user_email)
        readlist_instance.save()
        return Response("Added to your Readlist", status=200)


class ViewReadList(generics.ListAPIView):
    """
    View to view all the books in the Readlist of particular books.
    """

    serializer_class = ReadListViewSerializer

    def get_queryset(self):
        try:
            user_email = RetrieveEmail(self.kwargs['token'])
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)
        return ReadList.objects.filter(email=user_email)


class ReadListBookDelete(APIView):
    """
    View to delte particular book from Readlist
    """
    def post(self, request):
        try:
            user_email = RetrieveEmail(request.data.get("id_token"))
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)
        book_instance = Book.objects.get(bookid=request.data.get("book_id"))
        readlist_instance = ReadList.objects.get(bookid=book_instance, email=user_email)
        readlist_instance.delete()
        return Response("Book delted from ReadList", status=200)


class SaveNotes(APIView):
    """
    View to save user Notes for a book
    """
    def post(self, request):
        try:
            user_email = RetrieveEmail(request.data.get("id_token"))
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)
        book_instance = Book.objects.get(bookid=request.data.get("book_id"))
        notes_body = request.data.get("body")
        if(Note.objects.filter(bookid=book_instance, email=user_email)):
            # update existing notes
            notes_instance = Note.objects.get(bookid=book_instance, email=user_email)
            notes_instance.body = notes_body
            notes_instance.save()
        else:
            # create new instance of Notes  
            notes_instance = Note(bookid=book_instance, email=user_email,body=notes_body)
            notes_instance.save()
        return Response("Notes saved successfully",status=200)


class ViewNotes(generics.ListAPIView):
    """
    View to get Notes made by the user for a book
    """
    serializer_class = ViewNotesSerializer

    def get_queryset(self):
        try:
            user_email = RetrieveEmail(self.kwargs['token'])
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)
        book_instance = Book.objects.get(bookid=self.kwargs["book_id"])
        notes_query_set = Note.objects.filter(bookid=book_instance, email=user_email)
        if(notes_query_set.exists()):
            return notes_query_set
        else:
            print("not found")
            # return Response("No notes found", status=501)


class DeleteNotes(APIView):
    """
    View to delete notes for a book by created by user
    """
    def post(self, request):
        try:
            user_email = RetrieveEmail(request.data.get("id_token"))
        except TokenExpiredException:
            return Response(SESSION_EXPIRED_MESSAGE, status=401)
        book_instance = Book.objects.get(bookid=request.data.get("book_id"))
        notes_instance = Note.objects.get(bookid=book_instance, email=user_email)
        notes_instance.delete()
        return Response("Notes Deleted Successfully", status=200)
    

class FilterUserProfiles(generics.ListAPIView):
    """
    View to return list of reader's usernames match with searchKey in input field
    """
    serializer_class = UserProfileSerializer
    def get_queryset(self):
        user_name = self.kwargs['user_name']
        print("=== search for:",user_name)
        return Reader.objects.filter(Q(name__startswith=user_name))


class GetUserProfileByUserName(generics.ListAPIView):
    """
    View to provide profile of particular reader
    """
    serializer_class = UserProfileSerializer
    def get_queryset(self):
        user_name = _process_space_from_username(self.kwargs['user_name'])
        return Reader.objects.filter(name=user_name)


def _process_space_from_username(user_name: str):
    """
    Replace '%20' from usernames and replace with space
    """
    modified_user_name = user_name.replace("%20", "")
    return modified_user_name


class ViewCommentsOfAnotherUser(generics.ListAPIView):
    serializer_class = ViewCommentsOfUserSerializer

    def get_queryset(self):
        user_email = get_email_with_username(self.kwargs['user_name'])
        return Comment.objects.filter(email=user_email)



def get_email_with_username(user_name: str):
    return Reader.objects.get(name=user_name).email


class GetLikedBooksOfUser(generics.ListAPIView):
    serializer_class = LikesViewSerializer

    def get_queryset(self):
        user_name = _process_space_from_username(self.kwargs['user_name'])
        user_email = get_email_with_username(user_name)
        return Analytic.objects.filter(email = user_email)
