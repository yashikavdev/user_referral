# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :authenticate_request, except: :create
  protect_from_forgery with: :null_session

    def create
    user = User.new(sign_up_params)
    if user.save
      render json: { email: user.email,
                      message: 'Sign Up Successful' }, status: :ok
    else
      render json: { errors: user.errors.full_messages, status: :unprocessable_entity }
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
