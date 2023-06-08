class CreateUserInvitations < ActiveRecord::Migration[7.0]
  def change
    create_table :user_invitations do |t|
      t.integer :referred_from
      t.string :email
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
