# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :authenticate_request, except: :create
  protect_from_forgery with: :null_session
  before_action :set_referral

    def create
    user = User.new(sign_up_params)
    user.referrer = @referrer
    if user.save
      render json: { email: user.email,
                      token: JsonWebToken.encode(user_id: user.id),
                      message: 'Sign Up Successful' }, status: :ok
    else
      render json: { errors: user.errors.full_messages, status: :unprocessable_entity }
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def set_referral
    @referrer = User.find_by(referral_token: params[:user_invitation_token]) if params[:user_invitation_token].present?
  end
end
