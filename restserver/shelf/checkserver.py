#import google_oauth
from google.oauth2 import id_token
from google.auth.transport import requests
from .exceptions import TokenExpiredException


# token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2MmZhNjM3YWY5NTM1OTBkYjhiYjhhNjM2YmYxMWQ0MzYwYWJjOTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDEzMDUxMjYwNzM3LWxuMGZhNGM2djJnOXQyZnMwZzd2Y2oxMDU1NTUwbGZlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDEzMDUxMjYwNzM3LWxuMGZhNGM2djJnOXQyZnMwZzd2Y2oxMDU1NTUwbGZlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0NzM3NDY3OTg0OTY5Mjg4NzYxIiwiaGQiOiJ2aXNobnUuZWR1LmluIiwiZW1haWwiOiIxN3BhMWEwNWcxQHZpc2hudS5lZHUuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il92V0xGdEM1czlUV3kxaEhMamQ4aXciLCJuYW1lIjoiVHVtcHVkaSBNdXJhbGkgU2FpIEthbWFsIFNyaWthbnRoIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BQXVFN21CaG5JTU1YRUU4RnhObkVzS2ZNaUdDeVZnSzdybkI3QU5FM3RfX2d3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlR1bXB1ZGkiLCJmYW1pbHlfbmFtZSI6Ik11cmFsaSBTYWkgS2FtYWwgU3Jpa2FudGgiLCJsb2NhbGUiOiJlbi1HQiIsImlhdCI6MTU4MjI5NjQ3NCwiZXhwIjoxNTgyMzAwMDc0LCJqdGkiOiIwYTU3OWRkM2I0OThkNWJhYTVlOTZlNTU5NmI3NjJkMmRhYjMyZjQ0In0.HUAF9ZkMqMAqqwqJs4RMDjFBAaSH9RIPcbypXTuF-VEt-n3og3rqE5kTeihufferRGekRHvEUOFPIVC6Q1lbbju6dh9saA3BV4i7Y4lwB2KlOQ1LvTNBPGnbc1F5jB8Gge-p5RmMohYSZd-R3l5NtxjpmPkRrwYMOnzDUmDZ2y-RtqlNDwdVa0B7YI8ZsQx7Z6onj2jlg1FgOqqZSXvbkfScYFNT6u1IinSb1S0FadTbWVJ12iiSywHFj0OhFgicMnkQElsEzciaJfmoHTQD-JkJxoXhlCyaS3I2kzVUOTdE6Zcs83vABKUIi6-DIxFcoXSAxIvxr6hbiAKvRk5wYA"
CLIENT_ID= "343804261630-fs9851ibnqmp3js4hp90v4vis8khjkt3.apps.googleusercontent.com"
# userinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
# print(userinfo.get('email'))
def RetrieveUserInfo(token):
    userinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
    try:
        return userinfo.get('email'),userinfo.get('name'),userinfo.get('picture')
    except ValueError:
        raise TokenExpiredException("Token expiredddddd")

def RetrieveEmail(token):
    try:
        userinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        email = userinfo.get('email')
        return email
    except ValueError:
        raise TokenExpiredException("Expired token!!!")
    # except Exception as e:
    #     print(e)
    #     print("================custom exception")
    #     raise TokenExpiredException("Token expriedddddd")