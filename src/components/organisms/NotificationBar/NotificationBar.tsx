import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Text } from '../../atoms/Text/Text';
import { TextLink } from '../../atoms/TextLink/TextLink';
import { IconButton } from '../../atoms/IconButton/IconButton';
import './NotificationBar.scss';

export type NotificationBarProps = ComponentPropsWithoutRef<'div'> & {
  onClose?: () => void;
};

export const NotificationBar = ({
  onClose,
  className,
  ...rest
}: NotificationBarProps) => {

  return (
    <div className="notification-bar" {...rest}>
      <div className={clsx('notification-bar__container', 'container')}>
        <Text as="p" className="notification-bar__text">
          Sign up and get 20% off to your first order.
          <TextLink href="#" className="notification-bar__link">
            Sign Up Now
          </TextLink>
        </Text>
        <IconButton
          svgName="icn-close"
          aria-label="Close notification"
          className="notification-bar__close"
          onClick={onClose}
          variant="ghost"
        />
      </div>
    </div>
  );
};
