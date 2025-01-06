# customers/urls.py
from django.urls import path
from .views import SignUpView
from .views import CustomerSignInView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signin/', CustomerSignInView.as_view(), name="signin")
]
