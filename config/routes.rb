Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json },
                     controllers: { sessions: 'users/sessions',
                                    registrations: 'users/registrations',
                                    passwords: 'users/passwords' }

  root 'components#index'
  get 'components/index'
  post '/auth/login', to: 'authentication#login'
  get '/*a', to: 'application#not_found'
end
