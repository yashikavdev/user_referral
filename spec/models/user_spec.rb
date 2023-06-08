# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should belong_to(:referrer).class_name('User').optional(true) }
    it { should have_many(:user_invitations) }
  end

  describe 'before_create callback' do
    it 'generates a referral token before creating a user' do
      user = FactoryBot.create(:user)
      user.save
      expect(user.referral_token).to be_present
    end

    it 'generates a referral' do
      user = FactoryBot.create(:user)
      user.referral_token = nil
      expect(user.referral_token).to be_nil
      user.save
    end
  end
end
