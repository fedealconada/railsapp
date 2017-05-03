desc "This task is called by the Heroku scheduler add-on"
task :send_notification => :environment do
  puts "Sending notification..."
  session = ActionDispatch::Integration::Session.new(Rails.application)
  session.get "/api/stories/updates"
  # HTTParty.get("/api/stories/updates")
  puts "done."
end
