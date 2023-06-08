# frozen_string_literal: true

class UserInvitationsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_request

  def index
    render json: UserInvitation.all.as_json, status: :ok
  end

  def create
    user_invitation = UserInvitation.create(user_invitation_params)
    render json: user_invitation.as_json, status: :ok if user_invitation
  end

  private

  def user_invitation_params
    params.require(:user_invitation).permit(:email,:referred_from,:status)
  end
end
