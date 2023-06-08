# frozen_string_literal: true

# app/models/user_invitation.rb
class UserInvitation < ApplicationRecord
  enum status: %i[pending sent accepted], _default: :pending

  validates :email, presence: true, uniqueness: true

  belongs_to :referrer, class_name: 'User', foreign_key: :referred_from

  after_create :invite_user, :update_status

  private

  def invite_user
    UserInvitationMailer.mailer(id).deliver_now
  end

  def update_status
    update(status: :sent)
  end
end
