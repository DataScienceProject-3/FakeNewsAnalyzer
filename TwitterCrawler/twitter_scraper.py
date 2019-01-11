import tweepy
import csv
import json
from config import (consumer_key, consumer_secret,
                    access_token, access_token_secret)
import wget

# Setup Tweepy API Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)


def get_all_tweets(screen_name):

    # Twitter allows access to only 3240 tweets via this method

    # Authorization and initialization
    print(consumer_key)

    # initialization of a list to hold all Tweets

    all_the_tweets = []

    # We will get the tweets with multiple requests of 200 tweets each

    new_tweets = api.user_timeline(screen_name=screen_name, count=200)

    print(new_tweets)

    # saving the most recent tweets

    all_the_tweets.extend(new_tweets)

    # save id of 1 less than the oldest tweet

    oldest_tweet = all_the_tweets[-1].id - 1

    # grabbing tweets till none are left

    while len(new_tweets) > 0:
        # The max_id param will be used subsequently to prevent duplicates
        new_tweets = api.user_timeline(screen_name=screen_name,
                count=200, max_id=oldest_tweet)

        # save most recent tweets

        all_the_tweets.extend(new_tweets)

        # id is updated to oldest tweet - 1 to keep track

        oldest_tweet = all_the_tweets[-1].id - 1
        print ('...%s tweets have been downloaded so far' % len(all_the_tweets))

    # transforming the tweets into a 2D array that will be used to populate the csv

    outtweets = [[tweet.id_str, tweet.created_at,
                 tweet.text.encode('utf-8')] for tweet in all_the_tweets]

    # writing to the csv file

    with open(screen_name + '_tweets.csv', 'w', encoding='utf8') as f:
        writer = csv.writer(f)
        writer.writerow(['id', 'created_at', 'text'])
        writer.writerows(outtweets)

    image_files = set()
    
    for status in all_the_tweets:
        media = status.entities.get('media', [])
        if len(media) > 0:
            image_files.add(media[0]['media_url'])

    print ('Downloading ' + str(len(image_files)) + ' images.....')
    for image_file in image_files:
        wget.download(image_file)

def get_tweets_by_country(country_name):
    places = api.geo_search(query="USA", granularity="country")
    print(places)
    place_id = places[0].id
    tweets = api.search(q="place:%s" % place_id)
    #print(tweets)   
    for tweet in tweets:
        print(tweet.text +'---->'+tweet.place.full_name)

def get_tweets_by_id(id):
    tweet = api.get_status(id)
    print(tweet.text)
    print(tweet.user.location)
    print(tweet)

if __name__ == '__main__':

    # Enter the twitter handle of the person concerned
    #get_tweets_by_country(input("Enter Country Name"))

    get_tweets_by_id(input("Enter tweetid"))


    #get_all_tweets(input("Enter the twitter handle of the person whose tweets you want to download:- "))