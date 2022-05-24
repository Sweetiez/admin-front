import { Role } from '../../hooks/auth/access/Roles';
import { isAuthorized, logout } from '../../hooks/auth/access/access';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface AccessRoleControllerProps {
  redirect: string;
  role: Role;
}

const AccessRoleController: React.FC<AccessRoleControllerProps> = ({
  redirect,
  role,
}) => {
  const { t } = useTranslation();
  const isAuthorize = isAuthorized(role);
  const navigate = useNavigate();
  const { addToast } = useToasts();

  useEffect(() => {
    if (!isAuthorize) {
      logout();
      addToast(`${t('auth.unauthorized')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      navigate(redirect);
    }
  }, [redirect, isAuthorize, navigate, addToast, t]);

  return <></>;
};

export default AccessRoleController;
