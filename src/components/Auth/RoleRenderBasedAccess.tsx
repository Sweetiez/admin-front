import React from 'react';
import { Role } from '../../hooks/auth/access/Roles';
import { isAuthorized } from '../../hooks/auth/access/access';

interface RoleRenderBasedAccessProps {
  role: Role;
  children: React.ReactNode;
}

const RoleRenderBasedAccess: React.FC<RoleRenderBasedAccessProps> = ({
  role,
  children,
}) => {
  const isAuthorize = isAuthorized(role);

  if (isAuthorize) {
    return <>{children}</>;
  }
  return <></>;
};

export default RoleRenderBasedAccess;
