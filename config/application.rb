require_relative 'boot'

require "rails"

require "action_controller/railtie"
require "action_mailer/railtie"
require "action_cable/engine"
require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

module BattereApp
  class Application < Rails::Application
    config.api_only = true
  end
end
