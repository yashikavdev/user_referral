class UserInvitation < ApplicationRecord
  enum status: {
    pending: 'pending',
    accepted: 'accepted'
  }, _default: 'pending'

  validates :email, presence: true, uniqueness: true

end
