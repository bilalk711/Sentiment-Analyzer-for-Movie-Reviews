from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReviewViewSet, ReviewStatisticsView

router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('', include(router.urls)),
    path('statistics/', ReviewStatisticsView.as_view(), name='review-statistics'),  
]
