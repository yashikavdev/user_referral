# frozen_string_literal: true

# app/models/user.rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  belongs_to :referrer, class_name: 'User', foreign_key: 'referrer_id', optional: true
  has_many :user_invitations, class_name: 'UserInvitation', foreign_key: 'referred_from'

  before_create :set_referral_token
  after_create :update_user_status

  private

  def set_referral_token
    self.referral_token = SecureRandom.hex(5)
  end

  def update_user_status
    UserInvitation.find_by_email(email).update(status: :accepted) if referrer_id
  end
end
