from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    sentiment = serializers.ReadOnlyField()  
    class Meta:
        model = Review
        fields = ['id', 'movie_title', 'review_content', 'sentiment', 'created_at']
