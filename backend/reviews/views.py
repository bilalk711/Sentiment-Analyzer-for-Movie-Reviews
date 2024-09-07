from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import generics
from .models import Review
from .serializers import ReviewSerializer
from .sentiment_analysis import analyze_sentiment
from .permissions import IsOwner
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count

class ReviewPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size'
    max_page_size = 100

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [IsOwner, IsAuthenticated]
    pagination_class = ReviewPagination 

    def get_queryset(self):
        user = self.request.user
        return Review.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        review = serializer.save(user=user)
        sentiment = analyze_sentiment(review.review_content)
        review.sentiment = sentiment
        review.save()

    def perform_update(self, serializer):
        user = self.request.user
        review = serializer.save()
        sentiment = analyze_sentiment(review.review_content)
        review.sentiment = sentiment
        review.save()

    def perform_destroy(self, instance):
        user = self.request.user
        instance.delete()

class ReviewStatisticsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        reviews = Review.objects.filter(user=user)

        sentiment_counts = reviews.values('sentiment').annotate(count=Count('id')).order_by('sentiment')

        movie_counts = reviews.values('movie_title').annotate(count=Count('id')).order_by('-count')[:5]

        statistics = {
            'sentiment_counts': list(sentiment_counts),
            'most_reviewed_movies': list(movie_counts),
        }

        return Response(statistics)