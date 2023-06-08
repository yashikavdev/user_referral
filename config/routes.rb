Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json },
                     controllers: { sessions: 'users/sessions',
                                    registrations: 'users/registrations',
                                    passwords: 'users/passwords' }

  resources :user_invitations
  root 'components#index'
  get 'components/index'
  get '*path', to: 'components#index', via: :all
end
