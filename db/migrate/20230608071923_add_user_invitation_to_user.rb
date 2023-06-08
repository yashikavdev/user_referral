class AddUserInvitationToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :referral_token, :string
    add_column :users, :referrer_id, :integer
  end
end
