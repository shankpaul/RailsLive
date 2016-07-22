class User < ActiveRecord::Base
	has_many :notifications
	after_create {|user| user.message 'create' }
	def message action
    msg = { resource: 'users',
            action: action,
            id: self.id,
            obj: self }

    $redis.publish 'rt-change', msg.to_json
  end
end
