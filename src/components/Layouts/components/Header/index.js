// Library css
import classNames from 'classnames/bind';

import styles from './Header.module.scss';

//Use library to make classnames css
const cx = classNames.bind(styles);

function Header() {
    return (
        <h1 className={cx('wrapper')}>
            <div className={cx('inner')}>{/* contents */}</div>
        </h1>
    );
}

export default Header;
