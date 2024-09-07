from textblob import TextBlob

def analyze_sentiment(review_text):
    blob = TextBlob(review_text)
    sentiment_score = blob.sentiment.polarity
    if sentiment_score > 0:
        return 'positive'
    elif sentiment_score == 0:
        return 'neutral'
    else:
        return 'negative'
