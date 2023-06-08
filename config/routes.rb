# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json },
                     controllers: { sessions: 'users/sessions',
                                    registrations: 'users/registrations',
                                    passwords: 'users/passwords' }

  resources :user_invitations

  root 'components#index'
  get '*path', to: 'components#index', via: :all
end
