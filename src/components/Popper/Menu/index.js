import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                        }
                    }}
                />
            );
        });
    };

    const handleOnBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    return (
        <Tippy
            interactive
            placement="bottom-end"
            delay={[0, 700]}
            render={(attrs) => (
                <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title="Language" onBack={handleOnBack} />}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;

// Note:
// Menu problem idea:
// - Create an array to store menu items
// - Always render the last element of the array
// - Use useState to add menu items to the array every time you click on an item parent
// - When pressing the back button, the last menu item in the array will be deleted and re-rendered
