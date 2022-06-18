const rules = {
  admin: [
    'basicMessages:create',
    'basicMessages:read',
    'contacts:create',
    'contacts:read',
    'contacts:update',
    'contacts:delete',
    'credentials:issue',
    'credentials:read',
    'credentials:reissue',
    'credentials:revoke',
    'travelers:create',
    'travelers:read',
    'travelers:update',
    'travelers:delete',
    'invitations:create',
    'invitations:accept',
    'invitations:read',
    'invitations:delete',
    'presentations:read',
    'roles:read',
    'settings:read',
    'settings:update',
    'users:create',
    'users:read',
    'users:update',
    'users:delete',
    'users:updatePassword',
    'users:updateRoles',
  ],
  moderator: [
    'basicMessages:create',
    'basicMessages:read',
    'contacts:create',
    'contacts:read',
    'contacts:update',
    'credentials:issue',
    'credentials:read',
    'credentials:reissue',
    'credentials:revoke',
    'travelers:create',
    'travelers:read',
    'travelers:update',
    'invitations:create',
    'invitations:accept',
    'invitations:read',
    'presentations:read',
  ],
}

export default rules
