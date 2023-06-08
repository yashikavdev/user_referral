# frozen_string_literal: true

class UserInvitationsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_request

  def index
    render json: UserInvitation.all.as_json, status: :ok
  end

  def create
    user_invitation = UserInvitation.new(user_invitation_params)
    user_invitation.referred_from = current_user.id
    render json: user_invitation.as_json, status: :ok if user_invitation.save
  end

  private

  def user_invitation_params
    params.require(:user_invitation).permit(:email)
  end
end
