# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserInvitation, type: :model do
  describe 'for enum status' do
    it { should belong_to(:referrer).class_name('User') }
  end

  describe 'after_validation callback' do
    let(:user) { FactoryBot.create(:user) }
    let(:user_invitation) { FactoryBot.create(:user_invitation, referred_from: user.id) }

    it 'sends an user_invitation email if the record is valid' do
      expect(user_invitation.status).to eq('sent')
      user_invitation.valid?
    end
  end

  describe 'status enum' do
    it 'defines the correct enum values' do
      expect(UserInvitation.statuses).to eq({ 'pending' => 0, 'sent' => 1, 'accepted' => 2 })
    end

    it "has a default status of 'pending'" do
      user_invitation = UserInvitation.new
      expect(user_invitation.status).to eq('pending')
    end
  end

  describe 'validations' do
    it 'requires presence of email' do
      user_invitation = UserInvitation.new
      expect(user_invitation).to_not be_valid
      expect(user_invitation.errors[:email]).to include("can't be blank")
    end

    it 'requires uniqueness of email' do
      user_invitation = UserInvitation.new(email: 'test@example.com')
      expect(user_invitation).to_not be_valid
      expect(user_invitation.errors[:email]).to eq([])
    end
  end
end
