# frozen_string_literal: true
require 'rails_helper'

RSpec.describe UserInvitationsController, type: :request do

  before(:each) do
    @user =  FactoryBot.create(:user)
    referred_from = UserInvitation.create(referred_from: @user.id, email: 'test@gmail.com')
  end

  describe 'GET #index' do
    it 'returns a successful response' do
      token = authentication_token(@user)
      get user_invitations_path, headers: { Authorization: token }
      expect(response).to have_http_status(:ok)
    end

    it 'create request' do
      params = { email: 'test@gmail.com'}
        token = authentication_token(@user)
        post user_invitations_path, params: { user_invitation: params }, headers: { Authorization: token }
      expect(response).to have_http_status(204)
    end
  end
end
