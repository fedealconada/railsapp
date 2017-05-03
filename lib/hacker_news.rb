class HackerNews
  include HTTParty
  base_uri 'https://hacker-news.firebaseio.com/v0'

  def initialize(service, page)
    @options = { query: { site: service, page: page } }
  end

  def newstories
    self.class.get("/newstories.json")
  end

  def find(id = :id)
    self.class.get("/item/#{id}.json")
  end

  def updates
    self.class.get("/updates.json")
  end

end
