import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Text } from '../../atoms/Text/Text';
import { TextLink } from '../../atoms/TextLink/TextLink';
import { IconButton } from '../../atoms/IconButton/IconButton';
import styles from './NotificationBar.module.scss';

export interface NotificationBarProps extends ComponentPropsWithoutRef<'div'> {
  onClose?: () => void;
}

export const NotificationBar = ({
  onClose,
  className,
  ...rest
}: NotificationBarProps) => {

  return (
    <div className={styles['notification-bar']} {...rest}>
      <div className={clsx(styles['notification-bar__container'], 'container')}>
        <Text as="p" className={styles['notification-bar__text']}>
          Sign up and get 20% off to your first order.
          <TextLink href="#" className={styles['notification-bar__link']}>
            Sign Up Now
          </TextLink>
        </Text>
        <IconButton
          svgName="icn-close"
          ariaLabel="Close notification"
          className={styles['notification-bar__close']}
          onClick={onClose}
          variant="ghost"
        />
      </div>
    </div>
  );
};
