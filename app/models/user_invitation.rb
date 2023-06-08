class UserInvitation < ApplicationRecord
  enum status: {
    pending: 'pending',
    accepted: 'accepted'
  }, _default: 'pending'

  validates :email, presence: true, uniqueness: true

  belongs_to :referrer, class_name: 'User', foreign_key: :referred_from
end
