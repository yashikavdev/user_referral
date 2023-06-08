# frozen_string_literal: true

FactoryBot.define do
  factory :user_invitation, class: UserInvitation do
    referred_from { 1 }
    email { Faker::Internet.email }
  end
end
