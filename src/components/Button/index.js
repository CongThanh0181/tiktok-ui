import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

// Note: We will make 3 type buttons: Lagrange, medium, small. Default is medium
// ...passProps is: target='_blank', ...
function Button({
    to,
    href,
    primary,
    outline,
    rounded,
    small,
    large,
    text,
    disabled,
    children,
    className,
    iconLeft,
    onClick,
    ...passProps
}) {
    let Component = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    //Check type button
    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    // handle when exist class disabled. delete all events of button
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    // Check class exist. if value === true, it will add to class
    const classes = cx('wrapper', {
        [className]: className, //custom class. because className is object so we must call key of object
        primary,
        outline,
        small,
        rounded,
        large,
        text,
        disabled,
    });

    return (
        <Component className={classes} {...props}>
            {iconLeft && <span className={cx('icon')}>{iconLeft}</span>}
            <span>{children}</span>
        </Component>
    );
}

export default Button;
