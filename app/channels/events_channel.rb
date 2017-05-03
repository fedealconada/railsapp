class EventsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "events_channel"
  end

  def newStory(data)
    ActionCable.server.broadcast "events_channel", data
  end

  def unsubscribed
  end
end
