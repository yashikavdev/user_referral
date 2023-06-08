class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  belongs_to :referrer, class_name: 'User', foreign_key: 'referrer_id', optional: true
  has_many :user_invitations, class_name: 'UserInvitation', foreign_key: 'referred_from'
end
