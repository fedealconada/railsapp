Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  scope '/api' do
    scope '/newcomers' do
      get '/' => 'stories#newcomers'
      get '/topten' => 'stories#topten'
    end
    scope '/notify' do
      get '/' => 'stories#notify'
    end
  end
end
