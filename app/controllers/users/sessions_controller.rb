# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    protect_from_forgery with: :null_session
    before_action :authenticate_request, except: :create

    def create
      user = User.find_by_email(params[:user][:email])
      if user&.valid_password?(params[:user][:password])
        token = JsonWebToken.encode(user_id: user.id)
        render json: { token: token }, status: :ok
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  end
end