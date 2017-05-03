class StoriesController < ApplicationController
  require 'hacker_news'

  def formatted_stories
    hackernews = HackerNews.new("hackernews", 1)
    stories = hackernews.newstories
    stories_details = []
    stories.take(20).each do |item|
      s = hackernews.find(item)
      story = {
        :title => s["title"],
        :points => s["score"],
        :author => s["by"],
        :comments  => s["kids"] ? s["kids"].length : 0,
        :created_at  => Time.at(s["time"]).strftime("%d/%m/%Y %H:%M"),
        :lifetime  => ((Time.now - Time.at(s["time"]))/1.hour).round
      }
      stories_details << story
    end
    return stories_details
  end

  # GET /newcomers/topten
  def topten
    results = formatted_stories
    ordered = results.sort_by {
     |item| -(item[:points] / (item[:lifetime] > 0 ? item[:lifetime] : 1))
    }
    json_response(ordered.take(10))
  end

  # GET /newcomers
  def newcomers
    stories = formatted_stories
    json_response(stories)
  end

  # GET /updates
  def notify
    hackernews = HackerNews.new("hackernews", 1)
    updates = hackernews.updates
    if updates.length > 0
      message = {'event_broadcasted': true, 'timestamp'=>Time.now.to_i, 'updated_stories'=>updates['items'].length, 'action'=>'newStory'}
      ActionCable.server.broadcast "events_channel", message
      json_response(message)
    else
      message = {'event_broadcasted': false, 'timestamp'=>Time.now.to_i, 'updated_stories'=>updates['items'].length, 'action'=>'newStory'}
      json_response(message)
    end
  end

end
